import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config()

const response = await fetch('https://github.com/');
const body = await response.text();

console.log(body);