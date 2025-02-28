const chai = require("chai");
const assert = chai.assert;
const cashflowjs = require("../src/index");

describe("cashflowjs", () => {
    const delta = 0.01;

    it("should calculate present value with fixed compounding", () => {
        const pv = cashflowjs.pv(99, 0.1, 1, 1);
        assert.closeTo(pv, 90, delta);
    });

    it("should calculate present value with continuous compounding", () => {
        const pv = cashflowjs.pv(99, 0.1, 1);
        assert.closeTo(pv, 89.57, delta);
    });

    it("should calculate future value with fixed compounding", () => {
        const fv = cashflowjs.fv(90, 0.1, 1, 1);
        assert.closeTo(fv, 99, delta);
    });

    it("should calculate future value with continuous compounding", () => {
        const fv = cashflowjs.fv(90, 0.1, 1);
        assert.closeTo(fv, 99.46, delta);
    });

    it("should calculate present value of ordinary annuity", () => {
        const pvoa = cashflowjs.pvoa(1000, 0.05, 5);
        assert.closeTo(pvoa, 4329.48, delta);
    });

    it("should calculate present value of annuity due", () => {
        const pvad = cashflowjs.pvad(1000, 0.05, 5);
        assert.closeTo(pvad, 4545.95, delta);
    });

    it("should calculate future value of ordinary annuity", () => {
        const fvoa = cashflowjs.fvoa(1000, 0.05, 5);
        assert.closeTo(fvoa, 5525.63, delta);
    });

    it("should calculate future value of annuity due", () => {
        const fvad = cashflowjs.fvad(1000, 0.05, 5);
        assert.closeTo(fvad, 5801.91, delta);
    });

    it("should calculate payment amount given present value", () => {
        const pmt = cashflowjs.pmt(10000, 0.05, 5);
        assert.closeTo(pmt, 2309.75, delta);
    });

    it("should calculate number of periods", () => {
        const nper = cashflowjs.nper(10000, 2309.75, 0.05);
        assert.closeTo(nper, 5, delta);
    });
});
