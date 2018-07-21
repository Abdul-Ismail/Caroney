const puppeteer = require('puppeteer')

const getInnerText = async (page, sel) => {
    await page.waitFor(sel)
    return await page.evaluate((sel) => {
        return (document.querySelector(sel).innerText).trim()
    }, sel)
}


const getRegDetails = async (reg) => {
    return new Promise(async resolve => {
        var start = new Date().getTime();
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        const obj ={}

        await page.goto('https://www.cartell.ie/ssl/servlet/beginStarLookup?registration=' + reg)
        obj.make = (await getInnerText(page, '#selection_vehicle > table > tbody > tr:nth-child(2) > td')).replace(/\s/g, "").toLowerCase()
        obj.model = (await getInnerText(page, '#selection_vehicle > table > tbody > tr:nth-child(3) > td')).replace(/\s/g, "").toLowerCase()
        obj.engine = ((await getInnerText(page, '#selection_vehicle > table > tbody > tr:nth-child(4) > td')).split(" ")[0]).replace(/\s/g, "").toLowerCase()


        await page.goto('https://www.motorcheck.ie/free-car-check/' + reg)

        let bodyTpe = await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > ul:nth-child(2) > li:nth-child(1)')
        bodyTpe = bodyTpe.split(" ")


        obj.doors = bodyTpe[2]
        obj.body = bodyTpe[bodyTpe.length - 1]

        obj.color = (await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > ul:nth-child(3) > li:nth-child(1)')).split(" ")[1]
        obj.fuel = (await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > ul:nth-child(2) > li:nth-child(2)')).split(" ")[2]
        obj.transmission = ((await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > ul:nth-child(3) > li:nth-child(2)')).split(" ")[1]).replace(/\s/g, "").toLowerCase()
        obj.age = (2018 - parseInt((await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > h1')).split(" ")[0])).toString()


        console.log(new Date().getTime() - start);



        browser.close()
        resolve(obj)
    })
};

module.exports = getRegDetails

// (async () => {
//     console.log(await getRegDetails('03ke1835'))
//
// })()
