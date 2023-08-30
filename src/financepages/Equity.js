import React, { useEffect } from 'react'

const Equity = () => {
  useEffect(()=>{
    fetch('http://localhost:4000', {
      method: 'post',
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
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
      })
    }).then(res => res.json())
    .then(data => console.log(data))
  },[])
  return (
    <div>equity</div>
  )
}

export default Equity