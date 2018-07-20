var data = [
    { type: 'wood', size: 10 },
    { type: 'wood', size: 8 },
    { type: 'metal', size: 8 }
]

/**
 *
 * @param attributesFilterOption - takes in [{attribute: 'size', higher: false}] - highest stating wether attribute is expected to be higher than tree label thingy
 * @param splitValue - the value we are checkign again for example if a car price is greater then or less than 25k
 * @returns {*[]} - filtered data
 */
function filterItems(attributesFilterOption, splitValue) {
    return data.filter(function(val) {
        for(const att of attributesFilterOption){
            if (att.higher)
                if(val[att.attribute] < splitValue) return false; //if label is true e are expecting it to be grater than so return false

            if (!att.higher)
                if(val[att.attribute] >= splitValue) return false;
        }

        return true;
    })
}
// console.log(filterItems([{attribute: 'size', higher: false}], 8))

let str = '207,605 kms / 129,000 miles'
str = str.replace(',', '')

const getMileage = (str) => {
    const mileage = parseInt(str.replace(',', ''))

    console.log(mileage)

    if (mileage <= 10000) return 10000
    else if (mileage <= 20000) return 20000
    else if (mileage <= 30000) return 30000
    else if (mileage <= 40000) return 400000
    else if (mileage <= 50000) return 50000
    else if (mileage <= 100000) return 100000
    else if (mileage <= 150000) return 150000
    else if (mileage <= 200000) return 200000
    else if (mileage <= 250000) return 250000
    else return 300000
}

// console.log(getMileage('197,605 kms / 129,000 miles'))

// parseInt((await getInnerText('#price')).replace(/\s/g, "").replace(',', ''))

const getPrice = (price) => {
    price = price.replace(/\s/g, "").replace(',', '')
    price = price.substring(1, price.length)


    return price

}


// console.log(getPrice('#342,233'))

console.log(parseFloat('1.6L Diesel'))


// console.log( Math.round(parseInt(str)/50000)*50000)

// console.log(270456/50000 * 50000)