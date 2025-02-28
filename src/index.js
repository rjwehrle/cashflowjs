/**
 * Calculates the future value of a single cash flow
 * @param pv - present value of the cash flow
 * @param r - annual interest rate
 * @param t - number of years
 * @param m - number of compounding periods per year (if null or undefined then
 * cash flow is calculated using continuous compounding)
 */
exports.fv = (pv, r, t, m) => {
    // Continuous compounding
    if (m == null) {
        return pv * Math.E ** (r * t);
    }
    // Discrete compounding
    return pv * (1 + r / m) ** (m * t);
};

/**
 * Calculates the present value of a single cash flow
 * @param pv - future value of the cash flow
 * @param r - annual interest rate
 * @param t - number of years
 * @param m - number of compounding periods per year (if null or undefined then
 * cash flow is calculated using continuous compounding)
 */
exports.pv = (fv, r, t, m) => {
    // Continuous compounding
    if (m == null) {
        return fv / Math.E ** (r * t);
    }
    // Discrete compounding
    return fv / (1 + r / m) ** (m * t);
};

/**
 * Calculates the present value of an ordinary annuity
 * @param pmt - payment per period
 * @param r - annual interest rate
 * @param n - total number of payments
 * @param m - number of compounding periods per year (defaults to 1)
 */
exports.pvoa = (pmt, r, n, m = 1) => {
    const i = r / m;

    if (i === 0) {
        return pmt * n;
    }

    return (pmt * (1 - (1 + i) ** -n)) / i;
};

/**
 * Calculates the present value of an annuity due
 * @param pmt - payment per period
 * @param r - annual interest rate
 * @param n - total number of payments
 * @param m - number of compounding periods per year (defaults to 1)
 */
exports.pvad = (pmt, r, n, m = 1) => {
    const i = r / m;

    return exports.pvoa(pmt, r, n, m) * (1 + i);
};

/**
 * Calculates the future value of an ordinary annuity
 * @param pmt - payment per period
 * @param r - annual interest rate
 * @param n - total number of payments
 * @param m - number of compounding periods per year (defaults to 1)
 */
exports.fvoa = (pmt, r, n, m = 1) => {
    const i = r / m;

    if (i === 0) {
        return pmt * n;
    }

    return (pmt * ((1 + i) ** n - 1)) / i;
};

/**
 * Calculates the future value of an annuity due
 * @param pmt - payment per period
 * @param r - annual interest rate
 * @param n - total number of payments
 * @param m - number of compounding periods per year (defaults to 1)
 */
exports.fvad = (pmt, r, n, m = 1) => {
    const i = r / m;

    return exports.fvoa(pmt, r, n, m) * (1 + i);
};

/**
 * Calculates the payment for an ordinary annuity given present value
 * @param pv - present value
 * @param r - annual interest rate
 * @param n - total number of payments
 * @param m - number of compounding periods per year (defaults to 1)
 */
exports.pmt = (pv, r, n, m = 1) => {
    const i = r / m;

    if (i === 0) {
        return pv / n;
    }

    return (pv * i) / (1 - (1 + i) ** -n);
};

/**
 * Calculates the number of periods required for an ordinary annuity
 * @param pv - present value
 * @param pmt - payment per period
 * @param r - annual interest rate
 * @param m - number of compounding periods per year (defaults to 1)
 */
exports.nper = (pv, pmt, r, m = 1) => {
    const i = r / m;

    if (i === 0) {
        return pv / pmt;
    }

    return -Math.log(1 - (pv * i) / pmt) / Math.log(1 + i);
};
