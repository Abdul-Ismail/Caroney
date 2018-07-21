var fs = require('fs');
// var data = JSON.parse(fs.readFileSync('../data/adverts-sold-formatted.json', 'utf8'));
var tree = require('./decisionTree.js')
const regNumber = require('../scrape/reg-number')
const path = require('path')

// console.log(typeof data[0].features.age)
// tree.generate(data, {}, 1399)
// console.log(JSON.stringify(tree.generate(data,{}, 2000), null, 2))

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

    return new Promise(async resolve => {
        //find wether it lays in 0-25 or 25-50 or 50-75 or 75-100 and then start from there
        let valueOne = 0
        let valueOneFound = false

        while (valueOneFound === false){
            valueOne += 25000
            const data = await JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'generatedTrees', 'tree_' + valueOne + '.json')))
            const greater = tree.check(input, data)
            console.log('tree: ' + valueOne + '   ' + 'prediction: ' + greater)

            if (!greater){
                console.log('price is: ' + (valueOne - 25000) + ' - ' + valueOne)
                valueOneFound = true
            }

            if (valueOne >=100000){
                console.log('price of car is greater than 100k')
            }
        }

        //split value one into 4 parts too
        //so if we got 25 - 50 we should check where range it falls into 25000 - 31250 or 31250 - 37500 or 37500 - 43750 or 43750 - 50000
        let valueTwo = valueOne - 25000
        let valueTwoFound = false

        while (valueTwoFound === false){
            valueTwo += 6250

            console.log(valueTwo)
            const data = await JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'generatedTrees', 'tree_' + valueTwo + '.json')))
            const greater = tree.check(input, data)
            // console.log('tree 2: ' + valueTwo + '   ' + 'prediction: ' + greater)

            if (!greater){
                // console.log('price is: ' + (valueTwo - 6250) + ' - ' + valueTwo)
                valueTwoFound = true
            }
        }


        let valueThree = valueTwo - 6250
        let priceFound = false

        while (priceFound === false){
            valueThree += 500
            // console.log('tree 3: ' + valueThree + '   ')
            const data = await JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'generatedTrees', 'tree_' + valueThree + '.json')))
            const greater = tree.check(input, data)

            console.log(valueThree, greater)

            if (!greater){
                console.log(valueThree)
                console.log('price is: ' + (valueThree - 500) + ' - ' + valueThree)
                resolve('price is: ' + (valueThree - 500) + ' - ' + valueThree)
                priceFound = true
            }
        }
    })


}

// a({make: "3Series", model: "3Series", year: "2005", body: "Convertible"})
// predictPrice({
//     "make": "golf",
//     "model": "golf",
//     "age": "14",
//     "mileage": "350000",
//     "transmission": "manual",
//     "engine": "1.9",
//     "fuel": "diesel",
//     "body": "hatchback",
//     "color": "black",
//     "doors": "5"
// })

module.exports = predictPrice


// (async () => {
//     const data = await regNumber('03ke1835')
//     console.log(data)
//     predictPrice(data)
// })()




