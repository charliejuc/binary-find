'use strict'

const {binaryFindSort, insertOrdered, binaryFindIndex, binaryFindIndexes} = require('./OrderedArray')
// const data = [5, 50, 2, 1, 4, 2, 8, 5, 77, 100, 0, 12, 312, -3, 54]

const genRandomInt = (max) => Math.floor(Math.random() * max)
const genNumberArray = (arrayLength, cb) => Array.from(Array(arrayLength), cb)
const size = 4_000_000

console.time('Fill Array')
const randomInteger = (num) => Math.floor(Math.random() * num)
// const data = genNumberArray(size, () => ({
//     id: randomInteger(size),
//     name: Math.random().toString(32).slice(2)
// }))
const data = genNumberArray(size, () => randomInteger(size))
console.timeEnd('Fill Array')

console.time('Order array')
const orderedData = binaryFindSort(data, (value) => value)
console.timeEnd('Order array')

const searchCondFactory = (valueToSearch) => (value) => valueToSearch - value
let randomValue = null

console.time('Insert To Ordered Array')
randomValue = genRandomInt(size)
insertOrdered(orderedData, randomValue, searchCondFactory)
console.timeEnd('Insert To Ordered Array')

// const a = [1, 2, 3, 3, 3, 3, 4, 6, 7, 7, 7, 7, 7, 8, 9]
// console.log(`FOUND binaryFindIndexes:`, binaryFindIndexes(a, (value) => 3 - value))
// console.log(`FOUND binaryFindIndexes:`, binaryFindIndexes(a, (value) => 7 - value))
// process.exit()

// console.log(data)
// console.log(orderedArr)

console.time('Binary Find')
randomValue = genRandomInt(size)
console.log(`FOUND "${randomValue}" binaryFind:`, orderedData[binaryFindIndex(orderedData, searchCondFactory(randomValue))])
randomValue = genRandomInt(size)
console.log(`FOUND "${randomValue}" binaryFind:`, orderedData[binaryFindIndex(orderedData, searchCondFactory(randomValue))])
randomValue = genRandomInt(size)
console.log(`FOUND "${randomValue}" binaryFind:`, orderedData[binaryFindIndex(orderedData, searchCondFactory(randomValue))])
randomValue = genRandomInt(size)
console.log(`FOUND "${randomValue}" binaryFind:`, orderedData[binaryFindIndex(orderedData, searchCondFactory(randomValue))])
console.timeEnd('Binary Find')

console.time('Sequential Find')
randomValue = genRandomInt(size)
console.log(`FOUND "${randomValue}" sequentially:`, data[data.indexOf(randomValue)])
randomValue = genRandomInt(size)
console.log(`FOUND "${randomValue}" sequentially:`, data[data.indexOf(randomValue)])
randomValue = genRandomInt(size)
console.log(`FOUND "${randomValue}" sequentially:`, data[data.indexOf(randomValue)])
randomValue = genRandomInt(size)
console.log(`FOUND "${randomValue}" sequentially:`, data[data.indexOf(randomValue)])
console.timeEnd('Sequential Find')
