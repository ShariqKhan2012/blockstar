export const MAINNET = '0x1';   //Decimal => 1
export const RINKEBY = '0x4';   //Decimal => 1
export const GANACHE_UI = '0x539'; //Decimal => 1337

export const getChainConfig = (chainId) => {
    console.log('getChainConfig chainId ', chainId)
    if (chainId == GANACHE_UI) {
        return {
            chainId: GANACHE_UI,
            chainName: 'Ganache UI',
            rpcUrls: ['http://127.0.0.1:7545'],
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
export const getRandomThumbnail = (min, max) => {
    const random = getRandomNumber(min, max);
    return `/src/images/${random}.jpg`;
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