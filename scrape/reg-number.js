const puppeteer = require('puppeteer')

const getInnerText = async (page, sel) => {
    await page.waitFor(sel)
    return await page.evaluate((sel) => {
        return (document.querySelector(sel).innerText).trim()
    }, sel)
}


const getRegDetails = async (reg) => {

    var start = new Date().getTime();


    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()

    const obj ={}

    await page.goto('https://www.cartell.ie/ssl/servlet/beginStarLookup?registration=' + reg)
    obj.make = await getInnerText(page, '#selection_vehicle > table > tbody > tr:nth-child(2) > td')
    obj.model = await getInnerText(page, '#selection_vehicle > table > tbody > tr:nth-child(3) > td')
    obj.engine = (await getInnerText(page, '#selection_vehicle > table > tbody > tr:nth-child(4) > td')).split(" ")[0]


    await page.goto('https://www.motorcheck.ie/free-car-check/' + reg)

    let bodyTpe = await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > ul:nth-child(2) > li:nth-child(1)')
    bodyTpe = bodyTpe.split(" ")


    obj.doors = bodyTpe[2]
    obj.body = bodyTpe[bodyTpe.length - 1]

    obj.color = (await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > ul:nth-child(3) > li:nth-child(1)')).split(" ")[1]
    obj.fuel = (await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > ul:nth-child(2) > li:nth-child(2)')).split(" ")[2]
    obj.transmission = (await getInnerText(page, '#motorcheck_price_table > div:nth-child(1) > div > div > div > table > tbody > tr > td.car_info > ul:nth-child(3) > li:nth-child(2)')).split(" ")[1]


    // await page.goto('http://www.mywheels.ie/')
    // await page.waitForSelector('#input_1_1')
    // await page.click('#input_1_1')
    // await page.keyboard.type(reg)
    // await page.click('#gform_submit_button_1')
    console.log(obj)
    console.log(new Date().getTime() - start);

}

var str = "How are you doing today?";
console.log(str.split(" ")[0])
getRegDetails('03ke1835')