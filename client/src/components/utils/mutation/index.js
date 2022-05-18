import {gql} from '@apollo/client'


export const LOG = gql `
    
    mutation login($email: String!, $password:String!){
        login(email: $email, password: $password){
            token
            profile{
                _id
                name
                email
            }
        }
    }
`

export const ADD_PROFILE = gql`
  mutation addProfile(
    $name: String!
    $email: String!
    $password: String!
  ) {
    addProfile(
      name: $name
      email: $email
      password: $password
    ) {
      token
      profile {
        _id
        name
        email
      }
    }
  }
`