import React from 'react'

const UserCard = ({email , firstName , lastName , picture }) => {
return (
    <article className='article-user'>
        <img className='article-img' src={`http://localhost:3001/assets/${picture}`} alt={picture} />
        <h3 className='article-name'>{firstName} {lastName}</h3>
        <p className='article-email'>{email}</p>
    </article>
)
}

export default UserCard