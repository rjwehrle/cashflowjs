const chai = require('chai');
const assert = chai.assert;
const cashflowjs = require('../src/index');

describe('cashflowjs', () => {

  delta = .01;

  it('should calculate present value with fixed compounding', () => {
    pv = cashflowjs.pv(99, .1, 1, 1);
    assert.closeTo(pv, 90, delta);
  });

  it('should calculate present value with continuous compounding', () => {
    pv = cashflowjs.pv(99, .1, 1);
    assert.closeTo(pv, 89.57, delta);
  });

  it('should calculate future value with fixed compounding', () => {
    fv = cashflowjs.fv(90, .1, 1, 1);
    assert.closeTo(fv, 99, delta);
  });

  it('should calculate future value with continuous compounding', () => {
    fv = cashflowjs.fv(90, .1, 1);
    assert.closeTo(fv, 99.46, delta);
  });

});