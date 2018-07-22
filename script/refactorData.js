const fs = require('fs')

var data = JSON.parse(fs.readFileSync('/Users/abdulazizismail/Desktop/Caroney/data/adverts-open.json', 'utf8'));

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
        JSON.parse(fs.readFileSync('../data/adverts-open-formatted.json', 'utf8'))

    ]

    const newData = []

    for (const obj of objs){
        for (const o of obj){
            newData.push(o)
        }
    }


    console.log(newData.length)

    fs.writeFile('./data3' +'.json', JSON.stringify(newData, null, "\t"), 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The file was saved!");
    });



}

// combineObj()


// let num = 15
// const c = {
//     a: 15
// }
// console.log((c.a).toString())