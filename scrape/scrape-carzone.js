const puppeteer = require('puppeteer')
const helper = require('../helper')

//https://www.adverts.ie/car/volvo/s40/stunning-volvo-s40-2008-f-s-h/15305983

let page;

const scrapeCarDetails = async () => {
    try{
        await page.waitForSelector('#fpa-details > div.row-fluid > div.facts-wrap.span9 > dl > dd:nth-child(14)')
        const obj = await page.evaluate(() => {
            const obj = {}

            for (let i = 0; i < document.getElementsByTagName('dt').length; i++){
                const title = document.getElementsByTagName('dt')[i].innerText
                const value = document.getElementsByTagName('dd')[i].innerText
                obj[title] = value
            }

            return obj
        })


        //TODO:: REMOVE THIS
        let mileage  =  obj.MILEAGE.slice(obj.MILEAGE.indexOf('('), obj.MILEAGE.length)
        if (helper.checkIfEmpty(mileage) !== '--'){
            mileage = helper.getMileage(mileage)
        }else mileage = '--'

        const price = helper.getPrice(obj.PRICE)
        if (!price) return false

        return {
            features: {
                make: helper.checkIfEmpty(obj.MAKE.replace(/\s/g, "").toLowerCase()),
                model: helper.checkIfEmpty(obj.MODEL.replace(/\s/g, "").toLowerCase()),
                age: helper.checkIfEmpty((2018 - parseInt(obj.YEAR)).toString()),
                mileage: mileage,
                transmission: helper.checkIfEmpty(obj.TRANSMISSION.replace(/\s/g, "").toLowerCase()),
                engine: helper.checkIfEmpty(((obj.ENGINE).split(' ')[0]).replace(/\s/g, "").toLowerCase()),
                fuel: helper.checkIfEmpty(((obj.ENGINE).split(' ')[1]).replace(/\s/g, "").toLowerCase()),
                body: helper.checkIfEmpty(obj['BODY TYPE'].replace(/\s/g, "").toLowerCase()),
                color: helper.checkIfEmpty(obj.COLOUR.replace(/\s/g, "").toLowerCase()),
                doors: helper.checkIfEmpty(obj.DOORS.replace(/\s/g, "").toLowerCase()),
            },
            label: price
        }

    }catch(err){
        console.log('caught error while scrapping')
        return false
    }
};

/*

(async () => {
    const broswer = await puppeteer.launch({headless: true})
    page = await broswer.newPage()
    await page.setViewport({width: 1280, height: 800});
    page.goto('https://www.carzone.ie/used-cars/alfa-romeo/giulietta/used-2011-alfa-romeo-giulietta-fi-cork-fpa-125230800619076')

    console.log('adasd')


        try {
        console.log(await scrapeCarDetails())
        }catch(err){
            console.log(err)
        }
})();
*/


const searchLink = 'http://carzone.ie/search/result/cars/page/PAGE_NUMBER/limit/30';

(async () => {
    const broswer = await puppeteer.launch({headless: false})
    page = await broswer.newPage()
    await page.setViewport({width: 1280, height: 800});
    const data = []

    const totalPages = 3

    for (let pageNumber = 1; pageNumber < totalPages + 1; pageNumber++){

        try {
            page.goto(searchLink.replace('PAGE_NUMBER', pageNumber))
            await page.waitFor('#search-results-list > li:nth-child(3) > div > div.vehicle-description > div.vehicle-make-model > h3 > a')


            const links = await page.evaluate(() => {
                const links = []

                console.log('in here')

                for (let i = 3; i < 35; i++){
                    if (i === 6 || i === 10) continue
                    links.push(document.querySelector('#search-results-list > li:nth-child('+ i +') > div > div.vehicle-description > div.vehicle-make-model > h3 > a').href)
                }

                return links
            })

            for (const link of links){
                page.goto(link)
                const scrapedData = await scrapeCarDetails()
                if (scrapedData) data.push(scrapedData)
            }
        }catch(err){
            console.log(err)
        }

    }


    var fs = require('fs');

    fs.writeFile('./testing' +'.json', JSON.stringify(data, null, "\t"), 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The file was saved!");
    });

    console.log(data.length)
})().catch(err => {
    console.log('error caught')
    console.log(err)
})




