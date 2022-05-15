const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema.js');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log("Dale na 4K!");
});