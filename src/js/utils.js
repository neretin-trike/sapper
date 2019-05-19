export const getRandomArbitrary = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
}

export const getDirections = (x, y) => {
    return [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
        [x, y + 1],
        [x - 1, y + 1],
        [x - 1, y],
    ]
}

export const getIndexByClick = (event, size) => {
    let x = Math.trunc(event.offsetX / size);
    let y = Math.trunc(event.offsetY / size);

    return { x, y };
}

export const loadFromLocalStorage = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

export const saveToLocaleStorage = (key, data) => {
    try {
        const serializedState = JSON.stringify(data);
        localStorage.setItem(key, serializedState);
    } catch (error) { 
        console.log(error.message);
    }
}
