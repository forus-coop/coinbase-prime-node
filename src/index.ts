// Coinbase base modules
import util = require('./lib/util');
import { Addresses } from './lib/addresses';

export default async function test() {
  let res = await new Addresses().list();
  console.log(res)
}

test();
