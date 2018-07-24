const data = require('./testData')
const predictPrice = require('./main');
const _cliProgress = require('cli-progress');
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
bar1.start(data.length, 0);




(async() => {
    let correct = 0
    let less = 0
    let higher = 0

    let counter = 0;

    for (const obj of data){
        const prediction = await predictPrice(obj.features)
        counter += 1
        bar1.update(counter);



        if (obj.label <= prediction.end && obj.label >= prediction.start){
            correct += 1
        }else if (obj.label <= prediction.end) {
            less += 1
        }else {
            higher += 1
        }

        if (counter === 500) break
    }

    console.log('correct:', correct)
    console.log('less:', less)
    console.log('higher', higher)



})()
