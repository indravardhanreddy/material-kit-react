import {gql} from '@apollo/client'

export const GET_ALL_DATA = gql`
query getAllUsers{
    users{
      email
      lastName
      firstName
      posts
      {
        post
        userId
        comments{
          comment
          userId
        }
      }
    }
  }
`

export const GET_ALL_USERS = gql`
query getAllUsers{
    users{
      _id
      firstName
      lastName
        password
      email
    }
  }
  `

export const GET_ALL_POSTS = gql`
query getAllPostsData{
    posts{
      post
      userId
      comments{
        comment
        userId
      }
    }
  }
`