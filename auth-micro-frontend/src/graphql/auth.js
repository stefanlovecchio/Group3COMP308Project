import { gql } from '@apollo/client';

export const SIGNUP = gql`
   mutation Signup($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $accountType: String!) {
            signup(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName, accountType: $accountType)
   }
`;

export const LOGIN = gql`
   mutation Login($email: String!, $password: String!) {
       login(email: $email, password: $password)
   }
`;

export const LOGOUT = gql`
   mutation Logout($token: String!) {
       logout(token: $token)
   }
`;
