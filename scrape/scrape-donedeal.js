const puppeteer = require('puppeteer')
const helper = require('./helper')

//https://www.adverts.ie/car/volvo/s40/stunning-volvo-s40-2008-f-s-h/15305983

let page;

const checkl = (str) => {
    if (str === '---'){
        return '--'
    }else return str
}

const scrapeCarDetails = async () => {
    try{

        await page.waitForSelector('body > main > div > div:nth-child(1) > div > div.main-content.page-row.ng-scope > nav')

        const priceIndex = await page.evaluate(() => {
            if (document.querySelector('body > main > div > div:nth-child(1) > div > div.main-content.page-row.ng-scope > div.cad-column-1 > div:nth-child(4) > div.cad-header > div > div.cad-top-bottom-container > div > div.left-options > div > span')) {
                return 4
            } else{

            } return 3
        })

        const PRICE_SELECTOR = 'body > main > div > div:nth-child(1) > div > div.main-content.page-row.ng-scope > div.cad-column-1 > div:nth-child('+ priceIndex+') > div.cad-header > div > div.cad-top-bottom-container > div > div.left-options > div > span'

        await page.waitForSelector(PRICE_SELECTOR)


        const j = await page.evaluate(() => {
            if (document.querySelector('body > main > div > div:nth-child(1) > div > div.main-content.page-row.ng-scope > div.cad-column-1 > div:nth-child(4) > div.cad-details.cad-details-spacing')) {
                return 4
            } else{

            } return 5
        })

        const obj = await page.evaluate((j) => {
            const obj = {}
            for (let i = 1; i < document.querySelector('body > main > div > div:nth-child(1) > div > div.main-content.page-row.ng-scope > div.cad-column-1 > div:nth-child('+j+') > div.cad-details.cad-details-spacing > div.cad-content.divider > ul').children.length + 1; i++){
                const key = document.querySelector('body > main > div > div:nth-child(1) > div > div.main-content.page-row.ng-scope > div.cad-column-1 > div:nth-child('+j+') > div.cad-details.cad-details-spacing > div.cad-content.divider > ul > li:nth-child('+ i +')').childNodes[1].innerText

                const value = document.querySelector('body > main > div > div:nth-child(1) > div > div.main-content.page-row.ng-scope > div.cad-column-1 > div:nth-child('+j+') > div.cad-details.cad-details-spacing > div.cad-content.divider > ul > li:nth-child('+ i +')').childNodes[3].innerText

                obj[key] = value
            }

            return obj
        },j)


        const p = await helper.getInnerText(page, PRICE_SELECTOR)
        console.log(p)
        const price = helper.getPrice(p)
        if (!price) return false

        return {
            features: {
                make: checkl(obj.Make.replace(/\s/g, "").toLowerCase()),
                model: checkl(obj.Model.replace(/\s/g, "").toLowerCase()),
                age: checkl((2018 - parseInt(obj.Year)).toString()),
                mileage: helper.getMileag(obj.Mileage, obj.Mileage.includes('mi')),
                transmission: checkl(obj.Transmission.replace(/\s/g, "").toLowerCase()),
                engine: checkl(((obj['Engine Size']).split(' ')[0]).replace(/\s/g, "").toLowerCase()),
                fuel: checkl((obj['Fuel Type']).replace(/\s/g, "").toLowerCase()),
                body: checkl(obj['Body Type'].replace(/\s/g, "").toLowerCase()),
                color: checkl(obj.Colour.replace(/\s/g, "").toLowerCase()),
                doors: checkl(obj.Doors.replace(/\s/g, "").toLowerCase()),
            },
            label: price
        }

    }catch(err){
        console.log(err)
        console.log('caught error while scrapping')
        return false
    }
};


//
// (async () => {
//     const broswer = await puppeteer.launch({headless: true})
//     page = await broswer.newPage()
//     await page.setViewport({width: 1280, height: 800});
//     // page.goto('https://www.donedeal.ie/cars-for-sale/2006-bmw-7-series-750-li-4-8-367bhp-nct-2019/17859211?campaign=3')
//     page.goto('https://www.donedeal.ie/cars-for-sale/cash-for-vehicles/19341313?campaign=3')
//
//         try {
//         console.log(await scrapeCarDetails())
//         }catch(err){
//             console.log(err)
//         }
// })();
//


const searchLink = 'https://www.donedeal.ie/cars?start=PAGE_NUMBER';


(async () => {
    const broswer = await puppeteer.launch({headless: false})
    page = await broswer.newPage()
    await page.setViewport({width: 1280, height: 800});
    const data = []

    const totalPages = 1

    for (let pageNumber = 1; pageNumber < totalPages + 1; pageNumber++){

        try {
            page.goto(searchLink.replace('PAGE_NUMBER', pageNumber))
            await page.waitFor('#searchResultsPanel > ul > li:nth-child(1) > a')


            const links = await page.evaluate(() => {
                const links = []

                for (let i = 1; i < 33; i++){
                    if (i === 5 || i === 10) continue
                    links.push(document.querySelector('#searchResultsPanel > ul > li:nth-child(' + i + ') > a').href)

                }

                return links
            })

            for (const link of links){
                console.log(link)
                page.goto(link)
                const scrapedData = await scrapeCarDetails()
                if (scrapedData) data.push(scrapedData)
            }
        }catch(err){
            console.log(err)
        }

    }


    var fs = require('fs');

    fs.writeFile('./donedeal-data' +'.json', JSON.stringify(data, null, "\t"), 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The file was saved!");
    });

    console.log(data.length)
})().catch(err => {
    console.log('error caught')
    console.log(err)
})





