# coinbase-prime-node
Node wrapper for Coinbase Prime APIs.

This package provides wrapper methods to consume Coinbase Prime APIs.

Coinbase Prime API: https://docs.cloud.coinbase.com/prime/reference

## Installation
To use it, we've to export following environment variables:
```bash
export API_SECRET   = '<api_secret>'
export API_KEY      = '<api_key>'
export PASSPHRASE   = '<passphrase>'
export BASE_URL     = '<base_url>' 
export PORTFOLIO_ID = '<portfolio_id>'
export ENTITY_ID    = '<entity_id>'
```

## Quick Start

The npm package provide below functions which can be called using below classes, which makes request on respective Endpoint of Coinbase Prime API (https://docs.cloud.coinbase.com/prime/reference)

```js
Activities
Addresses
Assets
Balances
Orders
PaymentMethods
Products
Transactions
Wallets
```
### Example To fetch all the orders. 
```js
import { Orders } from 'coinbase-prime-node'

const orders = new Orders.list();
console.log(orders)
```

## Testing

```bash
npm test
```
