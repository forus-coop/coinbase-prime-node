// Coinbase base modules
import { Addresses } from './lib/addresses';

export default async function test() {
  const res = await new Addresses().list();
  console.log(res)
}

test();
