import Grid from "./grid.js";

window.onload = function () {

    const dom = {
        playingField: document.getElementById("playing-field"),
    }

    dom.playingField.width = 650;
    dom.playingField.height = 650;

    // dom.playingField.addEventListener('click', (event) => {
    //     let vX = (-325 + event.offsetX) > 0 ? 1 : -1;
    //     let vY = (325 - event.offsetY) > 0 ? 1 : -1;

    //     let lengthX = Math.abs(325 - event.offsetX);
    //     let lengthY = Math.abs(325 - event.offsetY);

    //     let propX = (lengthX * 15) / 325;
    //     let propY = (lengthY * 15) / 325;

    //     let rotX = propX * vY;
    //     let rotY = propY * vX;

    //     dom.playingField.style.transform = `perspective(1300px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    //     setTimeout(() => {
    //         dom.playingField.style.transform = "perspective(1300px) rotateX(0deg) rotateY(0deg)";
    //     }, 300)
    // });

    const ctx = dom.playingField.getContext("2d");

    let grid = new Grid(10,10, dom.playingField, ctx);
    grid.placeBombs(10);

}