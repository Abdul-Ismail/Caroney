var fs = require('fs');
// var data = JSON.parse(fs.readFileSync('../data/adverts.json', 'utf8'));
var tree = require('./decisionTree.js')
const regNumber = require('../scrape/reg-number')
const path = require('path');
const helper = require('../helper')

// console.log(typeof data[0].features.age)
// tree.generate(data, {}, 1399)
// console.log(JSON.stringify(tree.generate(data,{}, 2000), null, 2))

const folder = '4'

const predictPrice = async (input) => {
    input.model = (input.model).toString().replace(/\s/g, "").toLowerCase()
    input.make = (input.make).toString().replace(/\s/g, "").toLowerCase()
    input.engine = (input.engine).toString().replace(/\s/g, "").toLowerCase()
    input.doors = (input.doors).toString().replace(/\s/g, "").toLowerCase()
    input.body = (input.body).toString().replace(/\s/g, "").toLowerCase()
    input.color = (input.color).toString().replace(/\s/g, "").toLowerCase()
    input.age = (input.age).toString().replace(/\s/g, "").toLowerCase()
    input.transmission = (input.transmission).toString().replace(/\s/g, "").toLowerCase()
    input.fuel = (input.fuel).toString().replace(/\s/g, "").toLowerCase()
    input.mileage = helper.getMileage(input.mileage)

    // console.log(input)


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
            const data = await JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'generatedTrees', folder, 'tree_' + valueOne + '.json')))
            const greater = tree.check(input, data)
            // console.log('tree: ' + valueOne + '   ' + 'prediction: ' + greater)

            if (!greater){
                // console.log('price is: ' + (valueOne - 25000) + ' - ' + valueOne)
                valueOneFound = true
            }

            if (valueOne >=100000){
                resolve({start: 100000 - 500, end: 9999999999999})
                // console.log('price of car is greater than 100k')
            }
        }

        //split value one into 4 parts too
        //so if we got 25 - 50 we should check where range it falls into 25000 - 31250 or 31250 - 37500 or 37500 - 43750 or 43750 - 50000
        let valueTwo = valueOne - 25000
        let valueTwoFound = false

        while (valueTwoFound === false){
            valueTwo += 6250

            // console.log(valueTwo)
            const data = await JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'generatedTrees', folder, 'tree_' + valueTwo + '.json')))
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
            const data = await JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'generatedTrees', folder, 'tree_' + valueThree + '.json')))
            const greater = tree.check(input, data)

            // console.log(valueThree, greater)

            if (!greater){
                // console.log(valueThree)
                // console.log('price is: ' + (valueThree - 500) + ' - ' + valueThree)
                // resolve('price is: ' + (valueThree - 500) + ' - ' + valueThree)
                resolve({start: valueThree - 500, end: valueThree})
                priceFound = true
            }
        }
    })


}

// a({make: "3Series", model: "3Series", year: "2005", body: "Convertible"})
// predictPrice({ make: 'volkswagen',
//     model: 'golf',
//     engine: '1.4',
//     doors: '5',
//     body: 'Hatchback',
//     color: 'Gold',
//     fuel: 'Petrol',
//     transmission: 'manual',
//     mileage: '3000000',
//     age: '15'
// })

module.exports = predictPrice

//
// (async () => {
//     const data = await regNumber('03ke1835')
//     console.log(data)
//     predictPrice(data)
// })()
//
//
//
//
