const tree = require('./decisionTree')
const data = require('../data/adverts-sold-formatted')


//0 - 100k
for (let i = 25000; i < 100000 + 25000; i+= 25000) tree.generate(data, {}, i)


    //0 - 25k
    for (let i = 6250; i < 25000; i+= 6250) tree.generate(data, {}, i)

        //0 - 6250
        for (let i = 0 + 500; i < 6250 + 500; i+= 500) tree.generate(data, {}, i)

        //6250 - 12500
        for (let i = 6250; i < 12500 + 500; i+= 500) tree.generate(data, {}, i)

        //12500 - 18750
        for (let i = 12500; i < 18750 + 500; i+= 500) tree.generate(data, {}, i)

        //18750 - 25k
        for (let i = 18750; i < 25000 + 500; i+= 500) tree.generate(data, {}, i)


    //25k - 50k
    for (let i = 25000 + 6250; i < 50000; i+= 6250) tree.generate(data, {}, i)

        //25k - 31250
        for (let i = 25000 + 500; i < 31250 + 500; i+= 500) tree.generate(data, {}, i)

        //31250 - 37500
        for (let i = 31250; i < 37500 + 500; i+= 500) tree.generate(data, {}, i)

        //37500 - 43750
        for (let i = 37500; i < 43750 + 500; i+= 500) tree.generate(data, {}, i)

        //43750 - 50000
        for (let i = 43750; i < 50000 + 500; i+= 500) tree.generate(data, {}, i)


    //50k - 75k
    for (let i = 50000 + 6250; i < 75000; i+= 6250) tree.generate(data, {}, i)

        //50k - 56250
        for (let i = 50000 + 500; i < 56250 + 500; i+= 500) tree.generate(data, {}, i)

        //56250 - 62500
        for (let i = 56250; i < 62500 + 500; i+= 500) tree.generate(data, {}, i)

        //62500 - 68750
        for (let i = 62500; i < 68750 + 500; i+= 500) tree.generate(data, {}, i)

        //68750 - 75k
        for (let i = 68750; i < 75000 + 500; i+= 500) tree.generate(data, {}, i)


    //75k - 100k
    // for (let i = 75000; i < 100000; i+= 6250) console.log(i)

        //75k - 81250
        for (let i = 75000 + 500; i < 81250 + 500; i+= 500) tree.generate(data, {}, i)

        //81250 - 87500
        for (let i = 81250; i < 87500 + 500; i+= 500) tree.generate(data, {}, i)

        //87500 - 93750
        for (let i = 87500; i < 93750 + 500; i+= 500) tree.generate(data, {}, i)

        //93750 - 100kk
        for (let i = 93750; i < 100000 + 500; i+= 500) tree.generate(data, {}, i)
