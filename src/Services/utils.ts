export const writeToStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}

export const readFromStorage = key => {
    let data = JSON.parse(localStorage.getItem(key))
    console.log(data)
    return data === null ? [] : data
}
