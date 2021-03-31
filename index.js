'use strict'

// const data = [5, 50, 2, 1, 4, 2, 8, 5, 77, 100, 0, 12, 312, -3, 54]

const genNumberArray = (arrayLength, cb) => Array.from(Array(arrayLength), cb)
const size = 10_000

console.time('Fill Array')
const randomInteger = (num) => Math.floor(Math.random() * num)
const data = genNumberArray(size, () => randomInteger(size))
console.timeEnd('Fill Array')

const tree = []

const position = {
    node: 0,
    left: 1,
    right: 2
}
const getLessDeepPath = (tree, path) => {
    path = path || []
    const leftTree = tree[position.left]
    const rightTree = tree[position.right]

    if (leftTree.length === 0) {
        return [position.left, ...path]
    }

    if (rightTree.length === 0) {
        return [position.right, ...path]
    }

    const leftPath = getLessDeepPath(leftTree, path)
    const rightPath = getLessDeepPath(rightTree, path)

    if (leftPath.length > rightPath.length) {
        return [position.right, ...rightPath]
    }

    return [position.left, ...leftPath]
}
const insertNode = (tree, node, lessDeepPath = null) => {
    if (tree.length === 0) {
        tree.push(node, [], [])
        return tree
    }

    if (node < tree[position.node]) {
        const oldNode = tree[position.node]
        tree[position.node] = node
        return insertNode(tree, oldNode, lessDeepPath)
    }

    lessDeepPath = lessDeepPath || getLessDeepPath(tree)

    if (lessDeepPath.length === 0) {
        return insertNode(tree, node)
    }

    const nextStep = lessDeepPath[0]
    tree[nextStep] = insertNode(tree[nextStep], node, lessDeepPath.slice(1))

    return tree
}

console.time('Create Index')
for (const element of data) {
    insertNode(tree, element)
}
console.timeEnd('Create Index')
// console.log(insertNode(tree, data[0]))
// console.log(insertNode(tree, data[1]))
// console.log(insertNode(tree, data[2]))
// console.log(insertNode(tree, data[3]))
// console.log(insertNode(tree, data[4]))
// console.log(insertNode(tree, data[5]))
// console.log(insertNode(tree, data[6]))
// console.log(insertNode(tree, data[7]))
// console.log(insertNode(tree, data[8]))
// console.log(insertNode(tree, data[9]))
// console.log(insertNode(tree, data[10]))
// console.log(insertNode(tree, data[11]))
// console.log(insertNode(tree, data[12]))
// console.log(insertNode(tree, data[13]))
// console.log(insertNode(tree, data[14]))
