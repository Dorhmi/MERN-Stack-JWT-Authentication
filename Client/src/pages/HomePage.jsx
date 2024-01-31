import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
return (
    <section className='home-section'>
        <div className='home-btns-container'>
            <Link to={"/login"} className='login-btn'>Login</Link>
            <Link to={"/register"} className='register-btn'>Register</Link>
        </div>
    </section>
)
}

export default HomePage