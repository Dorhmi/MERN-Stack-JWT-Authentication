import axios from 'axios';
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../context/Context';



const LoginPage = () => {
    const {setUser} = useGlobalContext()
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault()
        const loginData = {
            email,
            password,
        }
        axios.post('http://localhost:3001/auth/login', loginData )
        .then((res)=>{
            if (res.data === 'incorrect password') {
                setError(true)
            } else {
                setUser(res.data);
                navigate("/dashboard")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
return (
    <section className='login-section'>
        <div className='login-content'>
            <p className='login-header'>Login</p>
            <form onSubmit={handleSubmit} className='login-form'>
                <input onChange={(e)=>{setEmail(e.target.value)}} className='login-input' type="email" placeholder='Email' />
                <input onChange={(e)=>{setPassword(e.target.value)}} className='login-input' type="text" placeholder='Password'/>
                <button className='login-button' type='submit'>Login</button>
                {error && <p className='error-msg'>Incorrect Email or Password</p>}
            </form>
            <p className='login-footer'>Not a Member ? <Link to={"/register"}>register</Link></p>
        </div>
    </section>
)
}

export default LoginPage