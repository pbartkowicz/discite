const resize = <T>(array: Array<T>, newSize: number, defaultValue: T) => {
    let newArray = Array.from<T>({ length: newSize }).fill(defaultValue)

    for (let i = 0; i < Math.min(array.length, newSize); i++) {
        newArray[i] = array[i]
    }

    return newArray
}

export {
    resize
}
