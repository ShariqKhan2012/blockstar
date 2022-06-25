export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export const getRandomThumbnail = (min, max) => {
    const random = getRandomNumber(min, max);
    return `/src/images/${random}.jpg`;
}
export const shortenAddress = (_addr) => {
    let shortenedAddr = _addr.substring(0, 6);
    shortenedAddr = shortenedAddr + '.....' + _addr.substring(_addr.length-7, _addr.length-1);
    return shortenedAddr;
}