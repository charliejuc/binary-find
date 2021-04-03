'use strict'

const {binaryFindSort, binaryFindIndex} = require('./OrderedArray')

const genRandomInt = (max) => Math.floor(Math.random() * max)
const genNumberArray = (arrayLength, cb) => Array.from(Array(arrayLength), cb)
const size = 4_000_000

const randomInteger = (num) => Math.floor(Math.random() * num)
const data = genNumberArray(size, () => randomInteger(size))

console.time('Order array')
const orderedData = binaryFindSort(data, (value) => value)
console.timeEnd('Order array')

const searchCondFactory = (valueToSearch) => (value) => valueToSearch - value

const toFindBinary = genNumberArray(4, () => genRandomInt(size))
const searchCondFactory0 = searchCondFactory(toFindBinary[0])
const searchCondFactory1 = searchCondFactory(toFindBinary[1])
const searchCondFactory2 = searchCondFactory(toFindBinary[2])
const searchCondFactory3 = searchCondFactory(toFindBinary[3])

console.time('Binary Find')
console.log(`FOUND "${toFindBinary[0]}" binaryFind:`, orderedData[binaryFindIndex(orderedData, searchCondFactory0)])
console.log(`FOUND "${toFindBinary[1]}" binaryFind:`, orderedData[binaryFindIndex(orderedData, searchCondFactory1)])
console.log(`FOUND "${toFindBinary[2]}" binaryFind:`, orderedData[binaryFindIndex(orderedData, searchCondFactory2)])
console.log(`FOUND "${toFindBinary[3]}" binaryFind:`, orderedData[binaryFindIndex(orderedData, searchCondFactory3)])
console.timeEnd('Binary Find')

console.log()

const toFindSequential = genNumberArray(4, () => genRandomInt(size))
console.time('Sequential Find')
console.log(`FOUND "${toFindSequential[0]}" sequentially:`, data[data.indexOf(toFindSequential[0])])
console.log(`FOUND "${toFindSequential[1]}" sequentially:`, data[data.indexOf(toFindSequential[1])])
console.log(`FOUND "${toFindSequential[2]}" sequentially:`, data[data.indexOf(toFindSequential[2])])
console.log(`FOUND "${toFindSequential[3]}" sequentially:`, data[data.indexOf(toFindSequential[3])])
console.timeEnd('Sequential Find')
