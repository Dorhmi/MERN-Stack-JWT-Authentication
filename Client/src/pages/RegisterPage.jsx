import React from 'react'
import {Link} from 'react-router-dom'

const RegisterPage = () => {
return (
    <section className='register-section'>
        <div className='register-content'>
            <p className='register-header'>Register your account</p>
            <form className='register-form'>
                <div className='form-div'>
                    <p className='form-header'>FirstName</p>
                    <input className='register-input' type="text" placeholder='Enter your firdtName'/>
                </div>
                <div className='form-div'>
                    <p className='form-header'>lastName</p>
                    <input className='register-input' type="text" placeholder='Enter your lastName'/>
                </div>
                <div className='form-div'>
                    <p className='form-header'>Email</p>
                    <input className='register-input' type="email" placeholder='Enter your email'/>
                </div>
                <div className='form-div'>
                    <p className='form-header'>Password</p>
                    <input className='register-input' type="text" placeholder='Enter your password'/>
                </div>
                <div className='form-div'>
                    <p className='form-header'>Profile Picture</p>
                    <input className='register-input' type="file"/>
                </div>
                <button className='submit-btn' type='submit'>Submit</button>
            </form>
            <p className='register-footer'>Already have an account? <Link to={"/login"}>login</Link></p>
        </div>
    </section>
)
}

export default RegisterPage