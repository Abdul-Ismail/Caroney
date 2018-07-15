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


const a = {
    make: 'bmwm',
    ad: 'asd'
}

for (const b in a){
    console.log(b)
}


