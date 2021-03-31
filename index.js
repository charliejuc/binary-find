'use strict'

const data = [5, 50, 2, 1, 4, 2, 8, 5, 77, 100, 0, 12]
const tree = []

const position = {
    node: 0,
    left: 1,
    right: 2
}
const whichIsLessDeep = (tree, depth = 0) => {
    const leftTree = tree[position.left]
    const rightTree = tree[position.right]

    if (leftTree.length === 0) {
        return [position.left, depth]
    }

    if (rightTree.length === 0) {
        return [position.right, depth]
    }

    depth += 1

    const [, leftDepth] = whichIsLessDeep(leftTree, depth)
    const [, rightDepth] = whichIsLessDeep(rightTree, depth)

    if (leftDepth > rightDepth) {
        return [position.right, rightDepth]
    }

    return [position.left, leftDepth]

}
const insertNode = (tree, node) => {
    if (tree.length === 0) {
        tree.push(node, [], [])
        return tree
    }

    if (node < tree[position.node]) {
        const oldNode = tree[position.node]
        tree[position.node] = node
        return insertNode(tree, oldNode)
    }

    if (whichIsLessDeep(tree)[0] === position.left) {
        tree[position.left] = insertNode(tree[position.left], node)
    } else {
        tree[position.right] = insertNode(tree[position.right], node)
    }

    return tree
}

console.log(insertNode(tree, data[0]))
console.log(insertNode(tree, data[1]))
console.log(insertNode(tree, data[2]))
console.log(insertNode(tree, data[3]))
console.log(insertNode(tree, data[4]))
console.log(insertNode(tree, data[5]))
console.log(insertNode(tree, data[6]))
console.log(insertNode(tree, data[7]))
console.log(insertNode(tree, data[8]))
console.log(insertNode(tree, data[9]))
console.log(insertNode(tree, data[10]))
console.log(insertNode(tree, data[11]))
