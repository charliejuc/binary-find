'use strict'

const {binaryFindSort, insertOrdered} = require('./OrderedArray')

const genRandomInt = (max) => Math.floor(Math.random() * max)
const genNumberArray = (arrayLength, cb) => Array.from(Array(arrayLength), cb)
const size = 4_000_000

console.time('Fill Array')
const randomInteger = (num) => Math.floor(Math.random() * num)
const data = genNumberArray(size, () => randomInteger(size))
console.timeEnd('Fill Array')

console.time('Order array')
const orderedData = binaryFindSort(data)
console.timeEnd('Order array')

const searchCondFactory = (valueToSearch) => (value) => valueToSearch - value
let randomValue = null

console.time('Insert To Ordered Array')
randomValue = genRandomInt(size)
insertOrdered(orderedData, randomValue, searchCondFactory)
console.timeEnd('Insert To Ordered Array')
