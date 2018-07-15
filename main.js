const data = require('./trainingData')

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

const splitBestAttribute = (data, dissmissAtrributes, attributesFilterOption, splitValue) => {
    const attibutesInformationGain = {}
    const possibleAttributes = Object.keys(data[0].features)

    const filteredData = filterItems(data, attributesFilterOption)

    //for each possible attribute calculate the information gain

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
        for (const d of filteredData){
            attibutesInformationGain[attr] = {
                subAttributeProbabilities: {}
            }

            if (!subAttributes[d.features[attr]]){
                subAttributes[d.features[attr]] = []
                subAttributes[d.features[attr]].push(d)
            }else subAttributes[d.features[attr]].push(d)
        }


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

    // console.log(JSON.stringify(attibutesInformationGain, null, 2))


    //get highest information gain,
    //set it to first one by default
    let highest
    let highestAttribute

    if (! Object.keys(attibutesInformationGain)[0]) {
        console.log("SOMETHING IE NULLLLL")
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


const generateDecisionTree = (data, dissmissAttributes, filter) => {

    let decisionTree = splitBestAttribute(data, dissmissAttributes, filter, 20)
    if (!decisionTree) return
    const maxExtension = Object.keys(data[0].features).length


    for (const subAttribute in decisionTree.subAttributeProbabilities){
        const sub = decisionTree.subAttributeProbabilities[subAttribute]
        if (!sub.pure){
            filter[decisionTree.attribute.name] = subAttribute
            // console.log(filter)
            const dissmissAttributesNew = dissmissAttributes.slice(0);;
            dissmissAttributesNew.push(decisionTree.attribute.name)
            // console.log(dissmissAttributesNew)

            if (dissmissAttributesNew !== maxExtension)
                sub.extended = generateDecisionTree(data, dissmissAttributesNew, filter, 20)
        }
    }

    return decisionTree

}


const predict = (input) => {
    const decisionTree20 = generateDecisionTree(data, [], {}, 20)
    // console.log(JSON.stringify(decisionTree20, null, 2))

    let extendedAvailable = true


    //The sub attribute that our input data falls into on the first level
    let currentBranch = decisionTree20.subAttributeProbabilities[input[decisionTree20.attribute.name]]

    while (extendedAvailable){
        /**
         * Check that the attribute value that we have actually exists in our decision tree
         * For example we could have a list of sub attributes make: { BMW:{P}, Merc: {P}}
         * If someone stats that there make is audi and we dont have that we need to deal with it
         * If that is the case we will return the probability of the given attribute (probably shouldnt do this)
         */


        // console.log(currentBranch.extended)

        const availableSubAttributes = Object.keys(currentBranch.extended.subAttributeProbabilities)
        if (availableSubAttributes.includes(input[currentBranch.extended.attribute.name])){
            currentBranch = currentBranch.extended.subAttributeProbabilities[input[currentBranch.extended.attribute.name]]
        }else return (currentBranch.positives > currentBranch.negatives)


        if (!currentBranch.extended) extendedAvailable = false

    }

    return (currentBranch.positives > currentBranch.negatives)
}


// console.log(JSON.stringify(generateDecisionTree(data, [], {}), null, 2))

// console.log(JSON.stringify(predict({make: 'BMW', model: 'i5', petrol: 'diesel', transmission: 'manual'}), null, 2))
// console.log(JSON.stringify(predict({make: 'BMW', model: 'i5', petrol: 'diesel', transmission: 'auto'}), null, 2))
console.log(JSON.stringify(predict({make: 'BMW', model: 'i5', petrol: 'diesel', transmission: 'msanudal'}), null, 2))




