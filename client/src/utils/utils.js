import {MAINNET, RINKEBY, GANACHE_UI, errorMessages} from './constants';


export const getChainConfig = (chainId) => {
    console.log('getChainConfig chainId ', chainId)
    if (chainId == GANACHE_UI) {
        return {
            chainId: GANACHE_UI,
            chainName: 'Ganache UI',
            rpcUrls: ['ws://127.0.0.1:7545'],
            nativeCurrency: {
                //name: 'Binance Coin',
                symbol: 'ETH', // 2-6 characters long
                decimals: 18,
            },
        }
    }
    else if (chainId == BINANCE_MAINNET) {
        return {
            chainId: BINANCE_MAINNET,
            chainName: 'Binance Mainnet',
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            nativeCurrency: {
                //name: 'Binance Coin',
                symbol: 'BNB', // 2-6 characters long
                decimals: 18,
            },
        }
    }
    else { // (chainId == RINKEBY) {
        return {
            chainId: RINKEBY,
            chainName: 'Rinkeby Testnet',
            rpcUrls: ['https://rinkeby.infura.io/v3/'],
            nativeCurrency: {
                //name: 'Binance Coin',
                symbol: 'ETH', // 2-6 characters long
                decimals: 18,
            },
        }
    }
}

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export const getRandomThumbnail = (index) => {
    //const random = getRandomNumber(min, max);
    //index = (index == 0 || index == '0') ? 1 : index;
    return `/src/assets/images/${index}.png`;
}
export const shortenAddress = (_addr) => {
    if (!_addr) {
        return '';
    }
    let shortenedAddr = _addr.substring(0, 6);
    shortenedAddr = shortenedAddr + '.....' + _addr.substring(_addr.length - 7, _addr.length - 1);
    return shortenedAddr;
}

//Gets the Chain ID of the network our pp is hosted on
export const getAppChainId = () => {
    const env = import.meta.env;

    //if dev && network == Ganache, then localhost
    //else Rinkeby
    if (env.MODE == 'development') {
        if (env.network && env.network == 'Rinkeby') {
            return RINKEBY;
        }
        else {
            return GANACHE_UI;
        }
    }
    else if (env.network && env.network == 'Mainnet') { //return Rinkeby
        return MAINNET;
    }
    else {
        return RINKEBY;
    }
}

export const getNetworkName = (id) => {
    switch (id) {
        case MAINNET:
            return 'Mainnet';

        case RINKEBY:
            return 'Rinkeby';

        case GANACHE_UI:
            return 'Ganache UI';

        default:
            return 'Unknown';
    }
}

export const extractErrorCode = (str) => {
    console.log('typeof', typeof (str), str)
    /*const leftDelimiter = "___";
    const rightDelimiter = "___";
    const arr = str.match(new RegExp(leftDelimiter + "(.*)" + rightDelimiter));
    console.log('arr', arr)

    if(arr && arr.length && arr.length == 2) {
        return arr[1];
    }
    else {
        return "An error occured";
    }*/

    const delimiter = '___';
    const firstOccurence = str.indexOf(delimiter);
    if(firstOccurence == -1) {
        return "An error occured";
    }

    const secondOccurence = str.indexOf(delimiter, firstOccurence + 1);
    if(secondOccurence == -1) {
        return "An error occured";
    }

    //Okay so far
    const errorCode = str.substring(firstOccurence + delimiter.length, secondOccurence);
    return errorMessages[errorCode] ?? errorCode;
}

export const compareStr = (str1, str2) => {
    return str1.toLowerCase() == str2.toLowerCase();
}