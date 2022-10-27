import * as dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import * as crypto from 'crypto';
import notifyAllChats from './nofication.js'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const url = process.env.URL;
const timeOutInms = process.env.TIMEOUT_IN_S ? process.env.TIMEOUT_IN_S * 1000 : 5000;

const getHash = url => {
    return new Promise(async resolve => {
        const response = await fetch(url);
        const body = await response.text();


        let hash = crypto.createHash('md5').update(body).digest('hex');
        resolve(hash);
    });
}

const sendNotificattion = (url) => {
    console.log("Change detected!");
    notifyAllChats(url)
}

const main = async (url, previousHash) => {
    let hash = await getHash(url);
    console.log("Generated Hash: " + hash);
    if (previousHash !== undefined && hash !== previousHash) {
        console.log("Hash is not equal, sending update");
        sendNotificattion(url);
    } else {
        console.log("Hash is equal");
    }
    sleep(timeOutInms).then(() => main(url, hash));
}

//start main
main(url);