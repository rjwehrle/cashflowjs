# cashflowjs
## Description
cashflowjs is a JavaScript NPM package that exposes utility functions to solve time value of money calculations.

### Features

* Calculate present value (PV) of a single cash flow
* Calculate present value (PV) of a single cash flow with continuous compounding
* Calculate future value (FV) of a single cash flow
* Calculate future value (FV) of a single cash flow with continuous compounding

## Installation

Use the package manager [npm](https://www.npmjs.com) to install cashflowjs.

```bash
npm install cashflowjs
```

## Usage

```javascript
var cashflowjs = require('cashflowjs');

# returns 90
cashflowjs.pv(99, .1, 1, 1);

# returns 99
cashflowjs.fv(90, .1, 1, 1);
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
