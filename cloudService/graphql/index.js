import { GraphQLSchema, GraphQLObjectType, GraphQLString, } from 'graphql';
import query from './queries';
import subscription from './subscriptions';

export const schema = new GraphQLSchema({
	query,
	subscription,
});