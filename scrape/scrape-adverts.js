const puppeteer = require('puppeteer')

//https://www.adverts.ie/car/volvo/s40/stunning-volvo-s40-2008-f-s-h/15305983

let page;

const getInnerText = async (sel) => {
    await page.waitFor(sel)
    return await page.evaluate((sel) => {
        return (document.querySelector(sel).innerText).trim()
    }, sel)
}

const getMileage = (str) => {

    if (str === '') return undefined
    const mileage = parseInt(str.replace(',', ''))

    if (mileage <= 10000) return 10000
    else if (mileage <= 20000) return 20000
    else if (mileage <= 30000) return 30000
    else if (mileage <= 40000) return 40000
    else if (mileage <= 50000) return 50000
    else if (mileage <= 80000) return 80000
    else if (mileage <= 100000) return 100000
    else if (mileage <= 150000) return 150000
    else if (mileage <= 200000) return 200000
    else if (mileage <= 250000) return 250000
    else if (mileage <= 300000) return 300000
    else return 350000
}

const getPrice = (price) => {
    price = price.replace(/\s/g, "").replace(',', '')
    price = price.substring(1, price.length)
    return parseInt(price)
}

const scrapeCarDetails = async () => {

    await page.waitFor('#main')
    const i = await page.evaluate(() => {
        if (document.querySelector('#container_wrapper > div.main-holder > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(3)')) {
            return 6
        } else{

        } return 5
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

        const engineAndfuel = await getInnerText(ENGINE_AND_ENGINE)


        return {
            features: {
                make: (await getInnerText(MAKE_SELECTOR)).replace(/\s/g, "").toLowerCase(),
                model: (await getInnerText(MODEL_SELECTOR)).replace(/\s/g, "").toLowerCase(),
                age: (2018 - parseInt(await getInnerText(YEAR_SELECTOR))),
                mileage: getMileage(await getInnerText(MILEAGE_SELECTOR)),
                transmission: (await getInnerText(TRANSMISSION_SELECTOR)).replace(/\s/g, "").toLowerCase(),
                engine: parseFloat(engineAndfuel),
                fuel: ((engineAndfuel).split(' ')[engineAndfuel.split(' ').length - 1]).replace(/\s/g, "").toLowerCase(),
                body: (await getInnerText(BODY_TYPE_SELECTOR)).replace(/\s/g, "").toLowerCase(),
                // NCT: await getInnerText(NCT_SELECTOR),
                color: (await getInnerText(COLOR_SELECTOR)).toLowerCase(),
                doors: await getInnerText(DOORS_SELECTOR),
                // tax: await getInnerText(TAX_EXPIRY_SELECTOR)
            },
            label: getPrice(await getInnerText('#price'))
        }

    }catch(err){
        console.log(err)
    }

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

// const searchLink = 'https://www.adverts.ie/for-sale/cars-motorbikes-boats/cars/2/status_sold/enginesize_*-*/page-PAGE_NUMBER';
// const searchLink = 'https://www.adverts.ie/for-sale/cars-motorbikes-boats/cars/2/enginesize_*-*/page-PAGE_NUMBER';
const searchLink = 'https://www.adverts.ie/for-sale/cars-motorbikes-boats/cars/2/status_withdrawn/enginesize_*-*/page-PAGE_NUMBER';


//all https://www.adverts.ie/for-sale/cars-motorbikes-boats/cars/2/enginesize_*-*/page-PAGE_NUMBER 1300
//widthran https://www.adverts.ie/for-sale/cars-motorbikes-boats/cars/2/status_withdrawn/enginesize_*-*/page-PAGE_NUMBER - 1100

(async () => {
    const broswer = await puppeteer.launch({headless: false})
    page = await broswer.newPage()
    await page.setViewport({width: 1280, height: 800});
    const data = []

    const totalPages = 1100

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
                data.push(await scrapeCarDetails())
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
})();




