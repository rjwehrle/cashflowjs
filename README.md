# CashflowJS
[![npm version](https://img.shields.io/npm/v/cashflowjs.svg)](https://www.npmjs.com/package/cashflowjs)
[![npm downloads](https://img.shields.io/npm/dm/cashflowjs.svg)](https://www.npmjs.com/package/cashflowjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
CashflowJS is comprehensive JavaScript library for time value of money calculations and financial analysis.

### Features

#### Basic Cash Flow Functions
* Present value (PV) of a single cash flow
* Future value (FV) of a single cash flow
* Support for both discrete and continuous compounding

#### Annuity Functions
* Present value of ordinary annuity (PVOA)
* Present value of annuity due (PVAD)
* Future value of ordinary annuity (FVOA)
* Future value of annuity due (FVAD)
* Payment calculation (PMT)
* Number of periods calculation (NPER)

#### TypeScript Support
CashflowJS includes TypeScript definitions for all functions and return types.

## Installation

Use the package manager [npm](https://www.npmjs.com) to install cashflowjs.

```bash
npm install cashflowjs
```

## Usage

```javascript
var cashflowjs = require('cashflowjs');

// Basic cash flow functions
const pv = cashflowjs.pv(1000, 0.05, 5, 1);            // PV of $1000 in 5 years at 5% annual interest
const fv = cashflowjs.fv(1000, 0.05, 5, 1);            // FV of $1000 in 5 years at 5% annual interest
const pv_cont = cashflowjs.pv(1000, 0.05, 5);          // PV of $1000 in 5 years with continuous compounding
const fv_cont = cashflowjs.fv(1000, 0.05, 5);          // FV of $1000 in 5 years with continuous compounding

// Annuity calculations
const pvoa = cashflowjs.pvoa(100, 0.05, 10, 12);       // PV of $100 monthly payment for 10 years at 5%
const pvad = cashflowjs.pvad(100, 0.05, 10, 12);       // PV of annuity due
const fvoa = cashflowjs.fvoa(100, 0.05, 10, 12);       // FV of ordinary annuity
const fvad = cashflowjs.fvad(100, 0.05, 10, 12);       // FV of annuity due
const pmt = cashflowjs.pmt(10000, 0.05, 60, 12);       // Monthly payment on $10,000 loan
const nper = cashflowjs.nper(10000, 200, 0.05, 12);    // How long to pay off $10,000 at $200/month
```

## Support
For issue submission please visit [GitHub](https://github.com/rjwehrle/cashflowjs/issues)

## Roadmap
* Add calculations for internal rate of return (IRR)
* Add calculations for net present value (NPV)
* Add calculations for amortization schedule

## Contributing

Pull requests are welcome for bug resolution. Please open an issue prior to initiating a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
