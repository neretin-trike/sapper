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