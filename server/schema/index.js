import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import typeDefs from './types';
import resolvers from './resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });


export default schema;
