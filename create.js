const {position} = require('./config')
const META = Symbol('META')

const trampoline = fn => (...args) => {
    let result = fn(...args)

    while (typeof result === 'function') {
        try {
            result = result()
        } catch (err) {
            console.log(result)
            throw err
        }
    }

    return result
}

const setMeta = (tree) => {
    if (META in tree) {
        return
    }

    tree[META] = {
        nodeLength: {
            left: 0,
            right: 0
        }
    }
}
const increaseNodeLength = (treeMETA, nextStep) => {
    treeMETA.nodeLength[nextStep === position.left ? 'left' : 'right'] += 1
}

const getLessDeepPath = trampoline((tree, path) => {
    setMeta(tree)

    path = path || []
    const leftNodeLength = tree[META].nodeLength.left
    const rightNodeLength = tree[META].nodeLength.right

    if (leftNodeLength === 0) {
        return [...path, position.left]
    }

    if (rightNodeLength === 0) {
        return [...path, position.right]
    }

    if (rightNodeLength < leftNodeLength) {
        return () => getLessDeepPath(tree[position.right], [...path, position.right])
    }

    return () => getLessDeepPath(tree[position.left], [...path, position.left])
})

const tryLeftRightRotation = (tree) => {
    const leftTree = tree[position.left]
    const rightTree = tree[position.right]

    if (leftTree.length === 0 || rightTree.length === 0) {
        return
    }

    if (leftTree[position.node] <= rightTree[position.node]) {
        return
    }

    tree[position.right] = leftTree
    tree[position.left] = rightTree

    const leftNodeLength = tree[META].nodeLength.left
    tree[META].nodeLength.left = tree[META].nodeLength.right
    tree[META].nodeLength.right = leftNodeLength
}

const insertNode = trampoline((tree, node, lessDeepPath) => {
    lessDeepPath = lessDeepPath || null
    // push when target node is reached
    if (tree.length === 0) {
        tree.push(node, [], [])
        return
    }

    /*
        replace current tree node when is less than passed node
        and call insertNode with replaced tree node
    */
    if (node < tree[position.node]) {
        const oldNode = tree[position.node]
        tree[position.node] = node
        return () => insertNode(tree, oldNode, lessDeepPath)
    }

    lessDeepPath = lessDeepPath || getLessDeepPath(tree)

    if (lessDeepPath.length === 0) {
        return () => insertNode(tree, node, lessDeepPath)
    }

    // take a step using lessDeepPath
    return () => {
        const nextStep = lessDeepPath[0]

        insertNode(tree[nextStep], node, lessDeepPath.slice(1))
        increaseNodeLength(tree[META], nextStep)

        if (lessDeepPath.length === 1) {
            tryLeftRightRotation(tree)
        }
    }
})

module.exports = {
    insertNode
}
