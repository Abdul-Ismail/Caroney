
const checkIfEmpty = (str) => {
    if (str.length === 0 || !str){
        return '--'
    }else return str
}

const delay = (time => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
})

module.exports = {
    getInnerText: async (page, sel) => {
        await page.waitFor(sel)
        return await page.evaluate((sel) => {
            return (document.querySelector(sel).innerText).trim()
        }, sel)
    },

    getMileag: (str) => {

        if (str === '') return undefined
        const mileage = parseInt(str.replace(',', ''))

        if (mileage <= 10000) return '10000'
        else if (mileage <= 20000) return '20000'
        else if (mileage <= 30000) return '30000'
        else if (mileage <= 40000) return '40000'
        else if (mileage <= 50000) return '50000'
        else if (mileage <= 80000) return '80000'
        else if (mileage <= 100000) return '100000'
        else if (mileage <= 150000) return '150000'
        else if (mileage <= 200000) return '200000'
        else if (mileage <= 250000) return '250000'
        else if (mileage <= 300000) return '300000'
        else return '350000'
    },

    getPrice: (price) => {
        price = price.replace(/\s/g, "").replace(',', '')
        price = price.substring(1, price.length)
        if (checkIfEmpty(price) === '--') return false
        else return parseInt(price)
    },

    checkIfEmpty,
    delay
}