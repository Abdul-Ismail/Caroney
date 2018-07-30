const data = require('./testData')
const predictPrice = require('./main');
const _cliProgress = require('cli-progress');
const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
bar1.start(data.length, 0);
const colors = require('colors');

(async() => {
    console.log('testing with no doors')
    let correct = 0
    let less = 0
    let higher = 0

    let counter = 0;

    for (const obj of data) {
        counter += 1

        delete obj.features.doors
        delete obj.features.color


        if (counter === 1){
            console.log(obj)
        }

        const prediction = await predictPrice(obj.features)
        // bar1.update(counter);


        if (obj.label <= prediction.end && obj.label >= prediction.start) {
            correct += 1
        } else {

            console.log(colors.red(obj))

            if (obj.label <= prediction.end) {
                less += 1
                console.log(colors.blue('predection: start:', prediction.start, ' end: ', prediction.end))
                console.log(colors.white(prediction.start - obj.label))


            } else {
                higher += 1
                console.log(colors.yellow('predection: start:', prediction.start, ' end: ', prediction.end))
                console.log(colors.white(obj.label -prediction.end))


            }

            console.log('')

        }

        if (counter === 50) break

    }

    console.log('')
    console.log('')
    console.log('correct:', correct)
    console.log('less:', less)
    console.log('higher', higher)

})()
