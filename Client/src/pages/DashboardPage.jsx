import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/Context'
import {useNavigate} from 'react-router-dom'


const DashboardPage = () => {
    const {user , setUser } = useGlobalContext()
    const [users , setUsers] = useState(null)
    const navigate = useNavigate()


    console.log(user);
    console.log(users);
    
    useEffect(() => {
        // Save user to local storage
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        const storedTokens = localStorage.getItem('user');
        if (storedTokens) {
            setUser(JSON.parse(storedTokens));
        }
    }, [setUser]);
    
    useEffect(() => {
        if (user && user.accessToken) {
            axios.get('http://localhost:3001/users/' , {headers: {authorization: "Bearer " + user.accessToken}})
            .then((res) => {
                if (res.data) {
                    setUsers(res.data)
                } 
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [user])





return (
    <section className='dashboard-section'>
        {users ?
        <div className='dashboard-content'>hellloo</div>
        : 
        <div>You'r not authenticated </div>
        
        }
    </section>
)
}

export default DashboardPage