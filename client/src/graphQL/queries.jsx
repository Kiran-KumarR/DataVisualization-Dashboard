import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserById($userID: ID!) {
    user(_id: $userID) {
      _id
      firstName
      lastName
      email
    }
  }
`;
export const GET_ALL_CUSTOMERS = gql`
  query GetAllCustomers {
    customers {
      id
      name
      email
      city
      source
      birth_date
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query GetAllOrders {
    orders {
      id
      user_id
      product_id
      discount
      quantity
      total
      subtotal
      tax
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      firstName
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      vendor
      title
      rating
      category
      price
    }
  }
`;

export const GET_NUMBER_OF_PRODUCTS = gql`
  query GET_NUMBER_OF_PRODUCTS {
    getNumberofProducts
  }
`;

export const GET_NUMBER_OF_CUSTOMERS = gql`
  query GET_NUMBER_OF_CUSTOMERS {
    getNumberofCustomers
  }
`;

export const GET_NUMBER_OF_ORDERS = gql`
  query GET_NUMBER_OF_ORDERS {
    getNumberofOrders
  }
`;
export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    reviews {
      id
      product_id
      reviewer
      rating
      body
    }
  }
`;
export const GET_PRODUCT_COUNT = gql`
query GetProductCount {
  getProductCounts {
   Total
    Gizmo
    Gadget
    Doohickey
    Widget
  }
}
`;

export const GET_CUSTOMER_ORDERS_COUNTS=gql`
query getCustomerOrderCounts {
  getCustomerOrderCounts {
  CustomerID
  NumOrders
  }
}

`;

