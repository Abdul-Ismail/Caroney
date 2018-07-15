const puppeteer = require('puppeteer')

//https://www.adverts.ie/car/volvo/s40/stunning-volvo-s40-2008-f-s-h/15305983

const getInnerText = async (page, sel) => {
    await page.waitFor(sel)
    return await page.evaluate((sel) => {
        return (document.querySelector(sel).innerText).trim()
    }, sel)
}

const scrapeCarDetails = async (link) => {

    const broswer = await puppeteer.launch({headless: false})
    const page = await broswer.newPage()
    await page.setViewport({width: 1280, height: 800});
    await page.goto(link)
    const carDetails = {}

    const GRID_SELECTOR = '#container_wrapper > div.main-holder > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6)'
    const MAKE_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(1)'
    const MODEL_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(2)'
    const YEAR_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(3)'
    const MILEAGE_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(4)'
    const TRANSMISSION_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(5)'
    const ENGINE = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(6)'
    const BODY_TYPE_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(7)'
    const NCT_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(8)'
    const COLOR_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(9)'
    const DOORS_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(10)'
    const TAX_EXPIRY_SELECTOR = '#container_wrapper > div.main-holder.smi_description.has_phone_number.is_car > div.grid-row > div.cols-8.padded.left-side > div:nth-child(6) > div > div > div:nth-child(11)'

    const a = {
        make: (await getInnerText(page, MAKE_SELECTOR)).replace(/\s/g, ""),
        model: await getInnerText(page, MODEL_SELECTOR),
        year: await getInnerText(page, YEAR_SELECTOR),
        mileage: await getInnerText(page, MILEAGE_SELECTOR),
        transmission: await getInnerText(page, TRANSMISSION_SELECTOR),
        ENGINE: await getInnerText(page, ENGINE),
        body: await getInnerText(page, BODY_TYPE_SELECTOR),
        NCT: await getInnerText(page, NCT_SELECTOR),
        color: await getInnerText(page, COLOR_SELECTOR),
        doors: await getInnerText(page, DOORS_SELECTOR),
        tax: await getInnerText(page, TAX_EXPIRY_SELECTOR)


    }

    console.log(a)




}

(async () => {
    await scrapeCarDetails('https://www.adverts.ie/car/volvo/s40/stunning-volvo-s40-2008-f-s-h/15305983')
})()
