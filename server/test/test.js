import chai from 'chai';
import Car from '../myCar';
const newCar = new Car('Chevrolet', 2017, 'Corvette Stingray');

const assert = chai.assert;

describe('Gets full name function', () => {
  it('Should return the fullName of the car', () => {
    assert.strictEqual(newCar.getFullName(), '2017 Chevrolet Corvette Stingray');
  })
});