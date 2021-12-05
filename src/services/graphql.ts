import { buildSchema } from 'graphql';
import {
  addProducts,
  getProduct,
  getProducts,
  updateProducts,
  deleteProduct,
} from '../controllers/productsGraphql';

// GraphQL schema
export const graphqlSchema = buildSchema(`
    type Query {
        getProducts:[Item],
        getProduct(_id: String!):Item,
    },
    type Mutation {
        addProducts(producto: ItemBase!): Item
        updateProducto(id: String!, producto: ItemUpdate!): Item
        deleteProducto(id: String!): String!
    },
    input ItemBase {
        _id: String!
        title: String!
        price: Int!
        thumbnail: String!
    },
    input ItemUpdate {
        _id: String
        title: String
        price: Int
        thumbnail: String
    }
    type Item {
        _id: String
        title: String
        price: Int
        thumbnail: String
    }    
`);

// Root resolver
export const graphqlRoot = {
  getProducts,
  getProduct,
  addProducts,
  updateProducts,
  deleteProduct,
};
