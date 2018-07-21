const fs = require('fs')

var data = JSON.parse(fs.readFileSync('../data/adverts-sold.json', 'utf8'));

const a = []

console.log(typeof 1.4)

for (d of data){
    if (typeof d.features.age !== 'number') console.log(d.features.age = '--')
    console.log(d.features.age.toString())
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

fs.writeFile('./adverts-sold-formatted' +'.json', JSON.stringify(a, null, "\t"), 'utf8', function (err) {
    if (err) return console.log(err);
    console.log("The file was saved!");
});


// let num = 15
// const c = {
//     a: 15
// }
// console.log((c.a).toString())