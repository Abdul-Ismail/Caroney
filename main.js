var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

const getEntropy = (P, N) => {
    const PP = P/(P+N) //probability of positive
    const PN = N/(P+N) //probability of negative

    if (PP === 0 || PN === 0) return 0
    return - (PP * Math.log2(PP)) - (PN * Math.log2(PN))
}

/**
 *
 * @param P - Total of positive for root node
 * @param N - Total of negative fo root node
 * @param sub - Array of arrays containing P and N for each sub attribute
 */
const getInformationGain = (P, N, subAtrributes) => {
    const entropyBefore = getEntropy(P, N)
    let entropyAfter = 0

    for (const sub of subAtrributes){

        //get entropy of sub
        const entropy = getEntropy(sub[0], sub[1])

        //combine each entropy using the number of instances down each branch as the weight factor
        entropyAfter += (sub[0]+sub[1])/(P+N) * entropy
    }

    return entropyBefore - entropyAfter
}


/**
 *
 * @param attributesFilterOption - takes in {make: 'bmw'} - highest stating wether attribute is expected to be higher than tree label thingy
 * @param splitValue - the value we are checkign again for example if a car price is greater then or less than 25k
 * @returns {*[]} - filtered data
 */
function filterItems(data, attributesFilterOption) {
    return data.filter(function (val) {
        for (const att in attributesFilterOption){
            if (val.features[att] !== attributesFilterOption[att]) return false;
        }

        return true;
    })
}

const splitBestAttribute = (data, attributesFilterOption, splitValue, print) => {
    const attibutesInformationGain = {}

    const possibleAttributes = Object.keys(data[0].features)

    const filteredData = filterItems(data, attributesFilterOption)
    const dissmissAtrributes = Object.keys(attributesFilterOption)

    //for each possible attribute calculate the information gain
    //
    for (const attr of possibleAttributes){
        //if the current attribute has previously been extended then do not extend it again
        if (dissmissAtrributes.includes(attr)) continue
        let totalPositive = 0;
        let totalNegative = 0;

        //split data into sub attributes for a given attribute based on current point of attribute (split sub of bmw make onle if true, other side will be  only if left)
        //aggregate to what we need e.g we need bmw that are not true (have value below 25 in this case)

        const subAttributes = {}


        /**
         * For each attribute that we want to split we, we will separate the sub attributes
         * e.g if we are currently on attr model we want sub attributes to contain {BMW: [{features}], MERC: [{features}]}
         */
        if (filteredData.length > 0){
            for (const d of filteredData){
                attibutesInformationGain[attr] = {
                    subAttributeProbabilities: {}
                }

                if (!subAttributes[d.features[attr]]){
                    subAttributes[d.features[attr]] = []
                    subAttributes[d.features[attr]].push(d)
                }else subAttributes[d.features[attr]].push(d)
            }
        } else continue //sub attributes will be empty so skip if it is

        //probability for sub attributes
        const subAttributesProbability = []
        for (const sub in subAttributes){

            //check if label is desired output for each value in the sub section
            let subPositives = 0;
            let subNegatives = 0;

            for (const subValue of subAttributes[sub]){
                if (subValue.label > splitValue){
                    subPositives+= 1;
                    totalPositive+= 1;
                }else {
                    subNegatives+= 1;
                    totalNegative+= 1;
                }
            }

            subAttributesProbability.push([subPositives, subNegatives])
            attibutesInformationGain[attr].subAttributeProbabilities[sub] = {
                probability: subPositives / (subPositives+subNegatives),
                positives: subPositives,
                negatives: subNegatives,
                pure: (subPositives === 0 || subNegatives === 0)
            }
        }

        attibutesInformationGain[attr].attribute = {
            name: attr,
            informationGain: getInformationGain(totalPositive, totalNegative, subAttributesProbability)
        }
    }

    //get highest information gain,
    //set it to first one by default
    let highest
    let highestAttribute

    if (!Object.keys(attibutesInformationGain)[0]) {
        if(print)console.log("SOMETHING IE NULLLLL")
        return null
    }
    highest = attibutesInformationGain[Object.keys(attibutesInformationGain)[0]].attribute.informationGain
    highestAttribute = Object.keys(attibutesInformationGain)[0]

    for (const i in attibutesInformationGain){
        if (attibutesInformationGain[i].attribute.informationGain > highest){
            highest = attibutesInformationGain[i].attribute.informationGain
            highestAttribute = i
        }
    }

    return attibutesInformationGain[highestAttribute]
}

/**
 * return a branch for decision tree for a given attribute
 * @param data - the data we are teaching our classifier with
 * @param dissmissAttributes - list of attributes that were already used so do not extend
 * @param filter - e.g if currently extending an attribute such as make BMW and model i5
 * @returns {*} - return sub attributes for extended attribute
 */
const generateDecisionTree = (data, filter, splitValue) => {
    let decisionTree = splitBestAttribute(data, filter, splitValue)
    if (!decisionTree) return

    const maxExtension = Object.keys(data[0].features).length

    for (const subAttribute in decisionTree.subAttributeProbabilities){
        // console.log(subAttribute)
        const sub = decisionTree.subAttributeProbabilities[subAttribute]
        filter[decisionTree.attribute.name] = subAttribute

        if (!sub.pure){
            //TODO: maybe skipping last one or too much check blabla
            if (Object.keys(filter).length - 1   !== maxExtension) {
                sub.extended = generateDecisionTree(data, filter, splitValue)
            }
            else {
                console.log('quiting')
                delete filter[Object.keys(filter)[Object.keys(filter).length - 1]]
                return false
            }
        }

        delete filter[Object.keys(filter)[Object.keys(filter).length - 1]]

    }
    // console.log(JSON.stringify(decisionTree,{}, 2000), null, 1)

    return decisionTree
}

// generateDecisionTree(data, {}, 1399)
// console.log(JSON.stringify(generateDecisionTree(data,{}, 2000), null, 2))


//will take decision tree and and check where the given data lies, e.g if decision tree is to check if car is over 20k. will return true if given car is over 20k
const predict = (input, decisionTree) => {
    let extendedAvailable = true

    //The sub attribute that our input data falls into on the first level
    let currentBranch = decisionTree.subAttributeProbabilities[input[decisionTree.attribute.name]]

    if (!currentBranch){
        //TODO:: work on this
        console.log('The decisoon tree does not contain the field ' + decisionTree.attribute.name + ' the equald to ' + input[decisionTree.attribute.name])
        //currentBranch = decisionTree.subAttributeProbabilities['--'] each field
        return
    }



    while (extendedAvailable){
        /**
         * Check that the attribute value that we have actually exists in our decision tree
         * For example we could have a list of sub attributes make: { BMW:{P}, Merc: {P}}
         * If someone stats that there make is audi and we dont have that we need to deal with it
         * If that is the case we will return the probability of the given attribute (probably shouldnt do this)
         */

        //if its pure then just return
        if (currentBranch.pure){
            return (currentBranch.positives >= currentBranch.negatives)
        }

        const availableSubAttributes = Object.keys(currentBranch.extended.subAttributeProbabilities)
        if (availableSubAttributes.includes(input[currentBranch.extended.attribute.name])){
            currentBranch = currentBranch.extended.subAttributeProbabilities[input[currentBranch.extended.attribute.name]]
        }else return (currentBranch.positives > currentBranch.negatives)

        if (!currentBranch.extended) extendedAvailable = false
    }
    return (currentBranch.positives >= currentBranch.negatives)
};

// generateDecisionTree(data, [], {}, 10000);



const dummyPrediction = (input, value) => {
    if (input > value){
        return true
    }else return false
}

const delay = (() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
})
const predictPrice = async (data) => {


    let end = 100000;
    let start = 0

    while (end - start > 500){

        //half the difference between start and end to get the middle point
        const middlePoint = start + ((end - start) / 2)
        const a = dummyPrediction(10, middlePoint)
        console.log('middle point: ' + middlePoint)
        console.log(a)


        if  (a){
            //set middle as start if input is higher
            start = middlePoint
        }else {
            //set the end to the middle if point is lower
            end = middlePoint
        }

        console.log('start: ' + start)
        console.log('end: ' + end)
        console.log('')
        await delay()

    }
}

// predictPrice()

const a = async (input) => {
    /**
     * we will start from a certain value and check if the3 value is greater than the decision tree value it is being compared to
     * Once we found one iteration with a postive valuye (out input data being greater then the lighthouse data) we will then pick the price range
     * e.g
     * 500 ... is our input data greater than this ? if so increment
     * 1000 ... "" ""
     * 1500 ... no it is not greater than this
     * that means our value for the car is 1000 - 1500
     */

    const decisionTree = {
        //0 - 100k
        25000:  generateDecisionTree(data, {}, 25000),
        50000:  generateDecisionTree(data, {}, 50000),
        75000:  generateDecisionTree(data, {}, 75000),
        100000:  generateDecisionTree(data, {}, 100000),

        //0 - 25k
        6250: generateDecisionTree(data, {}, 6250),
        12500: generateDecisionTree(data, {}, 12500),
        18750: generateDecisionTree(data, {}, 18750),
        18750: generateDecisionTree(data, {}, 18750),
        25000: generateDecisionTree(data, {}, 25000),



        //0 - 6250
            500: generateDecisionTree(data, {}, 500),
            1000: generateDecisionTree(data, {}, 1000),
            1500: generateDecisionTree(data, {}, 1500),
            2000: generateDecisionTree(data, {}, 2000),
            2500: generateDecisionTree(data, {}, 2500),
            3000: generateDecisionTree(data, {}, 3000),
            3500: generateDecisionTree(data, {}, 3500),
            4000: generateDecisionTree(data, {}, 4000),
            4500: generateDecisionTree(data, {}, 4500),
            5000: generateDecisionTree(data, {}, 5000),
            5500: generateDecisionTree(data, {}, 5500),
            6000: generateDecisionTree(data, {}, 6000),
            6500: generateDecisionTree(data, {}, 6500),

        /*

            //6250 - 12500
            6250: generateDecisionTree(data, {}, 6250),
            6750: generateDecisionTree(data, {}, 6750),
            7250: generateDecisionTree(data, {}, 7250),
            7500: generateDecisionTree(data, {}, 7500),
            8000: generateDecisionTree(data, {}, 8000),
            8500: generateDecisionTree(data, {}, 8500),
            9000: generateDecisionTree(data, {}, 9000),
            9500: generateDecisionTree(data, {}, 9500),
            10000: generateDecisionTree(data, {}, 10000),
            10500: generateDecisionTree(data, {}, 10500),
            11000: generateDecisionTree(data, {}, 11000),
            11500: generateDecisionTree(data, {}, 11500),
            12000: generateDecisionTree(data, {}, 12000),
            12500: generateDecisionTree(data, {}, 12500),


            //12500 - 18750
            12500: generateDecisionTree(data, {}, 12500),
            13000: generateDecisionTree(data, {}, 13000),
            13500: generateDecisionTree(data, {}, 13500),
            14000: generateDecisionTree(data, {}, 14000),
            14500: generateDecisionTree(data, {}, 14500),
            15500: generateDecisionTree(data, {}, 15500),
            16500: generateDecisionTree(data, {}, 16500),
            17500: generateDecisionTree(data, {}, 17500),
            18000: generateDecisionTree(data, {}, 18000),
            18500: generateDecisionTree(data, {}, 18500),
            19000: generateDecisionTree(data, {}, 19000),



        //25k - 50k
        31250: generateDecisionTree(data, {}, 31250),
        37500: generateDecisionTree(data, {}, 37500),
        43750: generateDecisionTree(data, {}, 43750),
        50000: generateDecisionTree(data, {}, 50000),


        //50k - 75k
        56250: generateDecisionTree(data, {}, 56250),
        62500: generateDecisionTree(data, {}, 62500),
        68750: generateDecisionTree(data, {}, 68750),
        75000: generateDecisionTree(data, {}, 75000),

        //75k - 100k
        81250: generateDecisionTree(data, {}, 81250),
        87500: generateDecisionTree(data, {}, 87500),
        93750: generateDecisionTree(data, {}, 93750),
        100000: generateDecisionTree(data, {}, 100000),

        */
    }

    //find wether it lays in 0-25 or 25-50 or 50-75 or 75-100 and then start from there



    let valueOne = 0
    let valueOneFound = false


    while (valueOneFound === false){
        valueOne += 25000

        const greater = predict(input, decisionTree[valueOne])
        // console.log('tree: ' + valueOne + '   ' + 'prediction: ' + greater)
        if (!greater){
            console.log('price is: ' + (valueOne - 25000) + ' - ' + valueOne)
            valueOneFound = true
        }
    }

    //split value one into 4 parts too
    //so if we got 25 - 50 we should check where range it falls into 25000 - 31250 or 31250 - 37500 or 37500 - 43750 or 43750 - 50000


    let valueTwo = valueOne - 25000
    let valueTwoFound = false

    while (valueTwoFound === false){
        valueTwo += 6250
        const greater = predict(input, decisionTree[valueTwo])
        console.log('tree 2: ' + valueTwo + '   ' + 'prediction: ' + greater)


        if (!greater){
            console.log('price is: ' + (valueTwo - 6250) + ' - ' + valueTwo)
            valueTwoFound = true
        }
    }

    let valueThree = valueTwo - 6250
    let priceFound = false

    console.log('')
    console.log('')
    console.log('')
    console.log('')

    while (priceFound === false){
        valueThree += 500
        // console.log('tree 3: ' + valueThree + '   ')

        const greater = predict(input, decisionTree[valueThree])


        if (!greater){
            console.log('price is: ' + (valueThree - 500) + ' - ' + valueThree)
            priceFound = true
        }

    }

}

// a({make: "3Series", model: "3Series", year: "2005", body: "Convertible"})
a({
    "make": "Audi",
    "model": "A4",
    "year": "2005",
    "body": "Saloon"
})



// const b =  generateDecisionTree(data, {}, 5000)
// console.log(JSON.stringify(b, null, 2))
// console.log(JSON.stringify(predict({
//     "make": "Skoda",
//     "model": "Octavia",
//     "year": "2009",
//     "body": "Hatchback"
// }, generateDecisionTree(data, {}, 6750)), null, 2))
//




