import { MAINNET, GOERLI, SEPOLIA, GANACHE_UI, GANACHE_UI_NETWORK, errorMessages } from './constants';

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
    else { // (chainId == SEPOLIA) {
        return {
            chainId: SEPOLIA,
            chainName: 'Sepolia test network',
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            nativeCurrency: {
                //name: 'Binance Coin',
                symbol: 'SepoliaETH', // 2-6 characters long
                decimals: 18,
            },
        }
    }
}

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export const getRandomThumbnail = (index) => {
    //return `/${index%7}.png`;
    const rootUrl = import.meta.env.BASE_URL;
    return `${rootUrl}${index % 7}.png`;
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
    console.log('env => ', env)
    //if dev && network == Ganache, then localhost
    //else Sepolia
    if (env.MODE == 'development') {
        if (env.VITE_network && env.VITE_network == 'Sepolia') {
            return String(SEPOLIA).toLowerCase();
        }
        else {
            return String(GANACHE_UI).toLowerCase();
        }
    }
    else if (env.network && env.VITE_network == 'Mainnet') { //return Mainnet
        return String(MAINNET).toLowerCase();
    }
    else {
        return String(SEPOLIA).toLowerCase();
    }
}

export const getAppNetworkId = () => {
    const env = import.meta.env;
    console.log('env => ', env)
    //if dev && network == Ganache, then localhost
    //else Sepolia
    if (env.MODE == 'development') {
        if (env.VITE_network && env.VITE_network == 'Sepolia') {
            return SEPOLIA;
        }
        else {
            return GANACHE_UI_NETWORK;
        }
    }
    else if (env.network && env.VITE_network == 'Mainnet') { //return Mainnet
        return MAINNET;
    }
    else {
        return SEPOLIA;
    }
}

export const getNetworkName = (id) => {
    switch (id) {
        case MAINNET:
            return 'Mainnet';

        case SEPOLIA:
            return 'Sepolia';

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
    if (firstOccurence == -1) {
        return "An error occured";
    }

    const secondOccurence = str.indexOf(delimiter, firstOccurence + 1);
    if (secondOccurence == -1) {
        return "An error occured";
    }

    //Okay so far
    const errorCode = str.substring(firstOccurence + delimiter.length, secondOccurence);
    return errorMessages[errorCode] ?? errorCode;
}

export const compareStr = (str1, str2) => {
    return str1.toLowerCase() == str2.toLowerCase();
}