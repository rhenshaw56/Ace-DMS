import { expect } from 'chai';
import filter from '../../helpers/queryFilter';

const request = {
  query: {
    limit: 10,
    offset: 0,
    page: 1
  }
};
const parameters = [
  'id',
  'ownerId',
  'access'
];
const terms = {};
describe('filter', () => {
  it('should return valid results when given valid data', () => {
    const expectedResult = filter(request, parameters, terms);
    expect(expectedResult).to.be.instanceof(Object);
    expect(expectedResult).to.have.property('attributes');
    expect(expectedResult).to.have.property('limit');
    expect(expectedResult).to.have.property('offset');
    expect(expectedResult).to.have.property('where');
    expect(expectedResult).to.have.property('order');
  });
});
