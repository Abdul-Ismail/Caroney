var fs = require('fs');
var data = JSON.parse(fs.readFileSync('../data/file.json', 'utf8'));
var tree = require('./decisionTree.js')


// tree.generate(data, {}, 1399)
// console.log(JSON.stringify(tree.generate(data,{}, 2000), null, 2)


const predictPrice = async (input) => {
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
        25000:  tree.generate(data, {}, 25000),
        50000:  tree.generate(data, {}, 50000),
        75000:  tree.generate(data, {}, 75000),
        100000:  tree.generate(data, {}, 100000),

        //0 - 25k
        6250: tree.generate(data, {}, 6250),
        12500: tree.generate(data, {}, 12500),
        18750: tree.generate(data, {}, 18750),
        18750: tree.generate(data, {}, 18750),
        25000: tree.generate(data, {}, 25000),



        //0 - 6250
            500: tree.generate(data, {}, 500),
            1000: tree.generate(data, {}, 1000),
            1500: tree.generate(data, {}, 1500),
            2000: tree.generate(data, {}, 2000),
            2500: tree.generate(data, {}, 2500),
            3000: tree.generate(data, {}, 3000),
            3500: tree.generate(data, {}, 3500),
            4000: tree.generate(data, {}, 4000),
            4500: tree.generate(data, {}, 4500),
            5000: tree.generate(data, {}, 5000),
            5500: tree.generate(data, {}, 5500),
            6000: tree.generate(data, {}, 6000),
            6500: tree.generate(data, {}, 6500),

        /*

            //6250 - 12500
            6250: tree.generate(data, {}, 6250),
            6750: tree.generate(data, {}, 6750),
            7250: tree.generate(data, {}, 7250),
            7500: tree.generate(data, {}, 7500),
            8000: tree.generate(data, {}, 8000),
            8500: tree.generate(data, {}, 8500),
            9000: tree.generate(data, {}, 9000),
            9500: tree.generate(data, {}, 9500),
            10000: tree.generate(data, {}, 10000),
            10500: tree.generate(data, {}, 10500),
            11000: tree.generate(data, {}, 11000),
            11500: tree.generate(data, {}, 11500),
            12000: tree.generate(data, {}, 12000),
            12500: tree.generate(data, {}, 12500),


            //12500 - 18750
            12500: tree.generate(data, {}, 12500),
            13000: tree.generate(data, {}, 13000),
            13500: tree.generate(data, {}, 13500),
            14000: tree.generate(data, {}, 14000),
            14500: tree.generate(data, {}, 14500),
            15500: tree.generate(data, {}, 15500),
            16500: tree.generate(data, {}, 16500),
            17500: tree.generate(data, {}, 17500),
            18000: tree.generate(data, {}, 18000),
            18500: tree.generate(data, {}, 18500),
            19000: tree.generate(data, {}, 19000),



        //25k - 50k
        31250: tree.generate(data, {}, 31250),
        37500: tree.generate(data, {}, 37500),
        43750: tree.generate(data, {}, 43750),
        50000: tree.generate(data, {}, 50000),


        //50k - 75k
        56250: tree.generate(data, {}, 56250),
        62500: tree.generate(data, {}, 62500),
        68750: tree.generate(data, {}, 68750),
        75000: tree.generate(data, {}, 75000),

        //75k - 100k
        81250: tree.generate(data, {}, 81250),
        87500: tree.generate(data, {}, 87500),
        93750: tree.generate(data, {}, 93750),
        100000: tree.generate(data, {}, 100000),

        */
    }

    //find wether it lays in 0-25 or 25-50 or 50-75 or 75-100 and then start from there


    let valueOne = 0
    let valueOneFound = false


    while (valueOneFound === false){
        valueOne += 25000

        const greater = tree.check(input, decisionTree[valueOne])
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
        const greater = tree.check(input, decisionTree[valueTwo])
        console.log('tree 2: ' + valueTwo + '   ' + 'prediction: ' + greater)


        if (!greater){
            console.log('price is: ' + (valueTwo - 6250) + ' - ' + valueTwo)
            valueTwoFound = true
        }
    }

    let valueThree = valueTwo - 6250
    let priceFound = false

    console.log('')

    while (priceFound === false){
        valueThree += 500
        // console.log('tree 3: ' + valueThree + '   ')

        const greater = tree.check(input, decisionTree[valueThree])


        if (!greater){
            console.log('price is: ' + (valueThree - 500) + ' - ' + valueThree)
            priceFound = true
        }
    }
}

// a({make: "3Series", model: "3Series", year: "2005", body: "Convertible"})
predictPrice({
    "make": "Audi",
    "model": "A4",
    "year": "2005",
    "body": "Saloon"
})




