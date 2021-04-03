const indexNotFound = -1
const equalToSearchValue = 0

const trampoline = fn => (...args) => {
    let result = fn(...args)

    while (typeof result === 'function') {
        result = result()
    }

    return result
}

const binaryFindSort = (arr, key) => {
    const baseCond = (a, b) => a > b ? 1 : a < b ? -1 : 0

    return arr.slice()
        .sort(
            typeof key === 'function'
                ? (a, b) => baseCond(key(a), key(b))
                : baseCond
        )
}

const binaryFindIndexRecall = (arr, cond, start, end, endStartDiff) => {
    if (endStartDiff < 2) {
        return indexNotFound
    }

    return () => binaryFindIndex(arr, cond, start, end)
}
const binaryFindIndex = trampoline((arr, cond, start = 0, end) => {
    end = end != null ? end : arr.length - 1

    const endStartDiff = end - start
    const middleIndex = start + Math.floor(endStartDiff / 2)
    const middleCond = cond(arr[middleIndex])

    if (middleCond === equalToSearchValue) {
        return middleIndex
    }

    if (middleCond > equalToSearchValue) {
        if (cond(arr[end]) === equalToSearchValue) {
            return arr[end]
        }

        return binaryFindIndexRecall(arr, cond, middleIndex + 1, end - 1, endStartDiff)
    }

    if (cond(arr[start]) === equalToSearchValue) {
        return arr[start]
    }

    return binaryFindIndexRecall(arr, cond, start + 1, middleIndex - 1, endStartDiff)
})

const binaryFindIndexToInsert = trampoline((arr, cond, start = 0, end) => {
    const pivotGreaterValueIndex = binaryFindIndex(arr, cond, start, end)

    if (pivotGreaterValueIndex === indexNotFound) {
        return indexNotFound
    }

    if (pivotGreaterValueIndex === 0) {
        return 0
    }

    const prevCurrentValueIndex = pivotGreaterValueIndex - 1

    if (cond(arr[prevCurrentValueIndex]) >= equalToSearchValue) {
        return pivotGreaterValueIndex
    }

    return () => binaryFindIndexToInsert(arr, cond, start, prevCurrentValueIndex)
})

const insertOrdered = (arr, valueToInsert, condFactory) => {
    const greaterValueIndex = binaryFindIndexToInsert(arr, condFactory)
    const insertionIndex = greaterValueIndex === indexNotFound ? arr.length : greaterValueIndex

    arr.splice(insertionIndex, 0, valueToInsert)
}

const _binaryFindAllIndexes = trampoline((arr, cond, baseIndex, indexModifier, indexes = []) => {
    const newIndex = baseIndex + indexModifier

    if (newIndex === indexNotFound || newIndex > arr.length || cond(arr[newIndex]) !== 0) {
        return indexes
    }

    return () => _binaryFindAllIndexes(arr, cond, newIndex, indexModifier, [
        newIndex,
        ...indexes
    ])
})
const binaryFindAllIndexes = (arr, cond) => {
    const foundIndex = binaryFindIndex(arr, cond)

    if (foundIndex === indexNotFound) {
        return []
    }

    const leftIndexes = _binaryFindAllIndexes(arr, cond, foundIndex, -1)
    const rightIndexes = _binaryFindAllIndexes(arr, cond, foundIndex, 1)

    return [
        ...leftIndexes,
        foundIndex,
        ...rightIndexes
    ]
}

module.exports = {
    binaryFindSort,
    insertOrdered,
    binaryFindIndex,
    binaryFindAllIndexes
}
