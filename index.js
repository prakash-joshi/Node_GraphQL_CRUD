const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLSchema, GraphQLString, GraphQLInt, } = require('graphql');
const app = express();
const PORT = 8080;

var Websites = [
    { id: 1, name: 'Meta', ownerId: 1 },
    { id: 2, name: 'Apple', ownerId: 2 },
    { id: 3, name: 'Amazon', ownerId: 3 },
    { id: 4, name: 'Microsoft', ownerId: 4 },
    { id: 5, name: 'Google', ownerId: 5 }
];

var Owners = [
    { id: 1, name: 'Mark Zuckerburg' },
    { id: 2, name: 'Steve Jobs, Steve Wozniack' },
    { id: 3, name: 'Jeff Bezos' },
    { id: 4, name: 'Bill Gates, Paul Allen' },
    { id: 5, name: 'Larry Page, Sergei Brin' }
];

const WebsiteType = new GraphQLObjectType({
    name: 'Website',
    description: 'This shows the list of websites',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        ownerId: { type: new GraphQLNonNull(GraphQLInt) },
    }),
});

const OwnerType = new GraphQLObjectType({
    name: 'Owners',
    description: 'This shows the list of website owners',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        websites: {
            type: new GraphQLList(WebsiteType),
            description: 'List of Websites',
            resolve: () => Websites
        },
        owners: {
            type: new GraphQLList(OwnerType),
            description: 'List of Owners',
            resolve: () => Owners
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
}));

app.listen(PORT, () => {
    console.log(`Api is listenng to PORT http://localhost:${PORT}`);
});