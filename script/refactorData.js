const fs = require('fs')

// var data = JSON.parse(fs.readFileSync('/Users/abdulazizismail/Desktop/Caroney/data/adverts-open.json', 'utf8'));

const a = []

console.log(typeof 1.4)

const filter = () => {
    for (d of data){
        if (!d){
            console.log('its null')
            continue
        }
        if (typeof d.label !== 'number') continue

        a.push(
            { features:
                    { make: d.features.make,
                        model: d.features.model,
                        age: (typeof d.features.age === 'number') ? d.features.age.toString() : '--',
                        mileage: (typeof d.features.mileage === 'number') ? d.features.mileage.toString() : '--',
                        transmission: d.features.transmission,
                        engine: (typeof d.features.engine === 'number') ? d.features.engine.toString() : '--',
                        fuel: d.features.fuel,
                        body: d.features.body,
                        color: d.features.color,
                        doors: d.features.doors },
                label:  d.label }
        )
    }

// console.log(a)

    fs.writeFile('./adverts-open-formatted' +'.json', JSON.stringify(a, null, "\t"), 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The file was saved!");
    });

}

// filter()

const combineObj = () => {
    const objs = [
        JSON.parse(fs.readFileSync('../data/adverts-withdrawn-formatted.json', 'utf8')),
        JSON.parse(fs.readFileSync('../data/adverts-sold-formatted.json', 'utf8')),
        JSON.parse(fs.readFileSync('../data/adverts-open-formatted.json', 'utf8')),
        JSON.parse(fs.readFileSync('../data/donedeal.json', 'utf8'))
    ]

    let i = 0

    const newData = []
    const testData = []


    for (const obj of objs){
        for (const o of obj){
            i++

            if (i % 20 === 0){
                i = 0
                testData.push(o)
            }else newData.push(o)
        }
    }

    console.log(newData.length)

    fs.writeFile('./data4' +'.json', JSON.stringify(newData, null, "\t"), 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The file was saved!");
    });


    fs.writeFile('./testData' +'.json', JSON.stringify(testData, null, "\t"), 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The file was saved!");
    });
}

// combineObj()


const filterFeatures = () => {
    var data = JSON.parse(fs.readFileSync('../data/data4.json', 'utf8'));

    const obj = []

    for (const a of data){
        delete a.features.doors
        obj.push(a)
    }

    fs.writeFile('./data4-filtered-doors' +'.json', JSON.stringify(obj, null, "\t"), 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The file was saved!");
    });
}
filterFeatures()

// let num = 15
// const c = {
//     a: 15
// }
// console.log((c.a).toString())