import React from 'react'
import {Link} from 'react-router-dom'

const LoginPage = () => {
return (
    <section className='login-section'>
        <div className='login-content'>
            <p className='login-header'>Login</p>
            <form className='login-form'>
                <input className='login-input' type="email" placeholder='Email' />
                <input className='login-input' type="text" placeholder='Password'/>
                <button className='login-button' type='submit'>Login</button>
            </form>
            <p className='login-footer'>Not a Member ? <Link to={"/register"}>register</Link></p>
        </div>
    </section>
)
}

export default LoginPage