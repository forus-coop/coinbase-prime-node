// Coinbase base modules
import { Assets } from './lib/assets';

export default async function test() {
  const res = await new Assets().list();
  console.log(res)
}

test();
