import React from 'react'

const UserCard = ({email , firstName , lastName , picture , picturePath}) => {
return (
    <article className='article-user'>
        <img src={`/Server/public/assets/${picture}`} alt={picture} />
        <h3 className='article-name'>{firstName} {lastName}</h3>
        <p className='article-email'>{email}</p>
    </article>
)
}

export default UserCard