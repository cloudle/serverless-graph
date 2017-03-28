import { DynamoDB } from 'aws-sdk';
import server from 'graphql-server-lambda';
import { schema } from './graphql';

const	docClient = new DynamoDB.DocumentClient({region: 'ap-southeast-1'});
export function greeting (event, context, callback) {
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Go Serverless v1.1! Your function executed successfully!',
			input: event,
		}),
	};

	callback(null, response);
}

export function imageResize (event, context, callback) {
	callback(null, {message: 'Nothing here yet, but welcome!'});
}

export function addMessage (event, context, callback) {
	const params = {
		Item: {
			id: "000001",
			date: Date.now(),
			content: "Hi there!, this is from the lambda.."
		},
		TableName: 'messages',
	};

	docClient.put(params, (error, data) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, data);
		}
	});
}

export function graphql (event, context, callback) {
	const callbackFilter = function(error, output) {
		output.headers['Access-Control-Allow-Origin'] = '*';
		callback(error, output);
	};
	const handler = server.graphqlLambda({ schema });
	return handler(event, context, callbackFilter);
}