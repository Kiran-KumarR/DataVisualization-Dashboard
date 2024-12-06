const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
  }
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  type Token {
    token: String
  }

  type Mutation {
    signupUser(userNew: UserInput): User
    signinUser(userSignin: UserSigninInput): Token
    createProduct(productInput: ProductInput!): Product
    updateProduct(id: ID!, productInput: ProductInput!): Product
    deleteProduct(id: ID!): String
  }

  input ProductInput {
    category: String
    id: ID!
    price: Float
    rating: Float
    title: String
    vendor: String
  }

  type Product {
    id: ID!
    category: String
    ean: String
    price: Float
    quantity: Int
    rating: Float
    title: String
    vendor: String
  }

  type Customer {
    id: ID!
    name: String
    email: String
    address: String
    city: String
    state: String
    zip: String
    birth_date: String
    latitude: Float
    longitude: Float
    password: String
    source: String
  }

  type Order {
    id: ID!
    user_id: ID!
    product_id: ID!
    discount: Float
    quantity: Int
    subtotal: Float
    tax: Float
    total: Float
  }

  type Review {
    id: ID!
    reviewer: String
    product_id: ID!
    rating: Int
    body: String
  }

  type Query {
    product(id: ID!): Product
    products: [Product]
    customer(id: ID!): Customer
    customers: [Customer]
    order(id: ID!): Order
    orders: [Order]
    review(id: ID!): Review
    reviews: [Review]
  }

  type Query {
    getNumberofProducts: Int
    getNumberofCustomers: Int
    getNumberofOrders: Int
  }



  type ProductCounts {
    Total:Int
    Gizmo: Int
    Gadget: Int
    Doohickey: Int
    Widget: Int
  }

  type Query {
    getProductCounts: ProductCounts
  }

  type C{
    CustomerID:ID!
    NumOrders:Int!
  }
  type Query{
    getCustomerOrderCounts:[C!]!
  }
`;

module.exports = { typeDefs };
