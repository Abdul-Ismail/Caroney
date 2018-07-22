const puppeteer = require('puppeteer')
const helper = require('../helper')

const scrapeCarDetails = async (page) => {
    await page.waitFor('#main')
    const i = await page.evaluate(() => {
        if (document.querySelector('#container_wrapper > div.main-holder > div.grid-row > div.cols-8.padded.left-side > div:nth-child(5) > div > div > div:nth-child(6)')) {
            return 5
        } else return 6
    })

    const ROW_SELECTOR = '#container_wrapper > div.main-holder > div.grid-row > div.cols-8.padded.left-side > div:nth-child('+ i +') > div > div > div:nth-child(INDEX)'

    try{
        const GRID_SELECTOR = '#container_wrapper > div.main-holder > div.grid-row > div.cols-8.padded.left-side > div:nth-child(('+ i +'))'
        const MAKE_SELECTOR = ROW_SELECTOR.replace('INDEX', 1)
        const MODEL_SELECTOR = ROW_SELECTOR.replace('INDEX', 2)
        const YEAR_SELECTOR = ROW_SELECTOR.replace('INDEX', 3)
        const MILEAGE_SELECTOR = ROW_SELECTOR.replace('INDEX', 4)
        const TRANSMISSION_SELECTOR = ROW_SELECTOR.replace('INDEX', 5)
        const ENGINE_AND_ENGINE = ROW_SELECTOR.replace('INDEX', 6)
        const BODY_TYPE_SELECTOR = ROW_SELECTOR.replace('INDEX', 7)
        const NCT_SELECTOR = ROW_SELECTOR.replace('INDEX', 8)
        const COLOR_SELECTOR = ROW_SELECTOR.replace('INDEX', 9)
        const DOORS_SELECTOR = ROW_SELECTOR.replace('INDEX', 10)
        const TAX_EXPIRY_SELECTOR = ROW_SELECTOR.replace('INDEX', 11)

        const engineAndfuel = await helper.getInnerText(page, ENGINE_AND_ENGINE)

        const price = helper.getPrice(await helper.getInnerText(page, '#price'))
        if (!price) return false
        return {
            features: {
                make: (await helper.getInnerText(page, MAKE_SELECTOR)).replace(/\s/g, "").toLowerCase(),
                model: (await helper.getInnerText(page, MODEL_SELECTOR)).replace(/\s/g, "").toLowerCase(),
                age: ((2018 - parseInt(await helper.getInnerText(page, YEAR_SELECTOR))).toString()),
                mileage: helper.getMileage(await helper.getInnerText(page, MILEAGE_SELECTOR)),
                transmission: (await helper.getInnerText(page, TRANSMISSION_SELECTOR)).replace(/\s/g, "").toLowerCase(),
                engine: (parseFloat(engineAndfuel)).toString(),
                fuel: ((engineAndfuel).split(' ')[engineAndfuel.split(' ').length - 1]).replace(/\s/g, "").toLowerCase(),
                body: (await helper.getInnerText(page, BODY_TYPE_SELECTOR)).replace(/\s/g, "").toLowerCase(),
                color: (await helper.getInnerText(page, COLOR_SELECTOR)).toLowerCase(),
                doors: await helper.getInnerText(page, DOORS_SELECTOR),
            },
            label: price
        }
    }catch(err) { console.log(err) }
}
/*
(async () => {
    const broswer = await puppeteer.launch({headless: true})
    page = await broswer.newPage()
    await page.setViewport({width: 1280, height: 800});
    await page.goto('https://www.adverts.ie/car/ford/transit-connect/2015-ford-transit-connect/15623019')

        try {
        console.log(await scrapeCarDetails())
            await scrapeCarDetails()
        }catch(err){
            console.log(err)
        }
})();
*/

const searchLinkActive = 'https://www.adverts.ie/for-sale/cars-motorbikes-boats/cars/2/enginesize_*-*/page-PAGE_NUMBER';
const searchLinkWithdrawn = 'https://www.adverts.ie/for-sale/cars-motorbikes-boats/cars/2/status_withdrawn/enginesize_*-*/page-PAGE_NUMBER';
const searchLinkSold = 'https://www.adverts.ie/for-sale/cars-motorbikes-boats/cars/2/status_sold/enginesize_*-*/page-PAGE_NUMBER';

const scrape = async(searchLink, totalPages, file) => {
    const broswer = await puppeteer.launch({headless: false})
    const page = await broswer.newPage()
    await page.setViewport({width: 1280, height: 800});
    const data = []
    
    for (let pageNumber = 1; pageNumber < totalPages + 1; pageNumber++){
        console.log(pageNumber)

        try {
            await page.goto(searchLink.replace('PAGE_NUMBER', pageNumber))
            await page.waitFor('#search_content > div.posts.grid > div:nth-child(1) > a')

            const links = await page.evaluate(() => {
                const table = document.querySelector('#search_content > div.posts.grid')
                const links = []

                for (let i = 0; i < table.children.length; i++){
                    if (i === 6 || i === 13) continue
                    links.push(table.children[i].childNodes[3].href)
                }
                return links
            })
            
            for (const link of links){
                await page.goto(link)
                // page.goto(link)
                const scrapedData = await scrapeCarDetails(page)
                if (scrapedData) data.push(scrapedData)
            }
        }catch(err){
            console.log(err)
        }
    }
    
    var fs = require('fs');

    fs.writeFile('./'+ file +'.json', JSON.stringify(data, null, "\t"), 'utf8', function (err) {
        if (err) return console.log(err);
        console.log("The file was saved!");
    });
    console.log(data.length)
}

scrape(searchLinkActive, 1, 'adverts-active')
scrape(searchLinkWithdrawn, 1, 'adverts-withdrawn')
scrape(searchLinkSold, 1, 'adverts-sold')


