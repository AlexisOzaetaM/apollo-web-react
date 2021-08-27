export const isMovilScreen = () => {
    return window.screen.width < 576 ? true : false;
}

export const getDivWidthByClass = divClass => {
    return document.getElementsByClassName(divClass).offsetWidth
}