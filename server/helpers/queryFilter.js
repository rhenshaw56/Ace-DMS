const filter = (request, parameters, terms) => {
  const limit = request.query.limit;
  const offset = request.query.offset;
  const page = request.query.page;
  const queryBuilder = {
    attributes: parameters,
    order: '"createdAt" ASC'
  };
  if (limit) {
    queryBuilder.limit = limit;
  }
  if (offset) {
    queryBuilder.offset = offset;
  }
  if (page) {
    const pageLimit = limit || 10;
    queryBuilder.offset = (page * pageLimit) - pageLimit;
    queryBuilder.limit = pageLimit;
  }
  queryBuilder.where = terms;
  return queryBuilder;
};
export default filter;
