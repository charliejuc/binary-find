'use strict'

const {position} = require('./config')
const {insertNode} = require('./create')
// const data = [5, 50, 2, 1, 4, 2, 8, 5, 77, 100, 0, 12, 312, -3, 54]

const genRandomInt = max => Math.floor(Math.random() + max)
const genNumberArray = (arrayLength, cb) => Array.from(Array(arrayLength), cb)
const size = 500_000

console.time('Fill Array')
const randomInteger = (num) => Math.floor(Math.random() * num)
const data = genNumberArray(size, () => randomInteger(size))
console.timeEnd('Fill Array')

const tree = []

console.time('Create Index')
for (const element of data) {
    insertNode(tree, element)
}
console.timeEnd('Create Index')
console.log(tree)

let steps = 0
const findNode = (tree, node) => {
    ++steps
    if (tree.length === 0 || node < tree[position.node]) {
        return null
    }

    if (node === tree[position.node]) {
        return tree[position.node]
    }

    const nodeToTheLeft = findNode(tree[position.left], node)

    if (nodeToTheLeft !== null) {
        return nodeToTheLeft
    }

    return findNode(tree[position.right], node)
}

const findSequential = (data, node) => {
    for (const element of data) {
        ++steps
        if (node === element) {
            return node
        }
    }
    return null
}

const getRandomValue = () => data[Math.floor(Math.random() * data.length)]

const treeSteps = []
const sequentialSteps = []

console.time('Find Node into Tree')
console.log('FOUND into Tree:', findNode(tree, getRandomValue()), steps)
treeSteps.push(steps)
steps = 0
console.timeEnd('Find Node into Tree')

console.time('Find Node')
console.log('FOUND into Array:', data[findSequential(data, getRandomValue())], steps)
sequentialSteps.push(steps)
steps = 0
console.timeEnd('Find Node')

console.time('Insert in large tree')
insertNode(tree, genRandomInt(222214232134))
console.timeEnd('Insert in large tree')

console.time('Push in large array')
data.push(genRandomInt(222214232134))
console.timeEnd('Push in large array')

console.time('Unshift in large array')
data.unshift(genRandomInt(222214232134))
console.timeEnd('Unshift in large array')

console.time('Insert in large tree')
insertNode(tree, genRandomInt(222214232134))
console.timeEnd('Insert in large tree')

console.time('Push in large array')
data.push(genRandomInt(222214232134))
console.timeEnd('Push in large array')

console.time('Unshift in large array')
data.unshift(genRandomInt(222214232134))
console.timeEnd('Unshift in large array')

// console.time('Steps loop')
// let i = 1_000
// while(i !== 0) {
//     findNode(tree, getRandomValue())
//     treeSteps.push(steps)
//     steps = 0
//
//     findSequential(data, getRandomValue())
//     sequentialSteps.push(steps)
//     steps = 0
//
//     --i
// }
// console.timeEnd('Steps loop')
//
// console.log({
//     treeAvg: treeSteps.reduce((acc, current) => acc + current) / treeSteps.length / 1000,
//     sequentialAvg: sequentialSteps.reduce((acc, current) => acc + current) / sequentialSteps.length / 1000
// })
