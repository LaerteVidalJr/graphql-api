const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Tipo genérico de dado instanciado para o GraphQL
GenericType = new GraphQLObjectType({
    name: 'Gereric',
    fields:() => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        num_inf: {type: GraphQLInt},
        num_sup: {type: GraphQLInt},
        risco: {type: GraphQLFloat},
        extremoA: {type: GraphQLString},
        extremoB: {type: GraphQLString},
    })
});

// Root Query para fazer a consulta dos dados
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        data: {
            type: GenericType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/trechoDeVia/'+ args.id)
                    .then(resp => resp.data);
            }
        },
        dataList: {
            type: new GraphQLList(GenericType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/trechoDeVia/')
                    .then(resp => resp.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});