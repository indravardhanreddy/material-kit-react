import { gql } from '@apollo/client'

export const SIGNUP_USER = gql`
mutation signupUser($signup : UserInput!) {
    signupUser(signup: $signup){
      email
      firstName
      lastName
    }
  }

`

export const SIGNIN_USER = gql`

mutation signinUser($signin: UserSigninInput!) {
    user:signinUser(signin: $signin){
      token
      user{
        _id
        email
        firstName
        lastName
      }
    }
  }
`

export const COMMENT_POST = gql`

mutation createComment($commentData : CommentInput!) {
    createComment(commentData: $commentData) {
      userId
    }
  }
  `

export const POST_PUBLISH = gql`

mutation createPost($postData : PostInput!) {
    createPost(postData: $postData)
  }
  
`


