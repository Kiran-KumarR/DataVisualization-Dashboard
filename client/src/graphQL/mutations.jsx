import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      _id
      firstName
      lastName
      email
      password
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SigninUser($userSignin: UserSigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_NEW_PRODUCT = gql`
  mutation createProduct($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
      id
      price
      title
      rating
      vendor
      category
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $productInput: ProductInput!) {
    updateProduct(id: $id, productInput: $productInput) {
      id
      price
      title
      rating
      vendor
      category
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
