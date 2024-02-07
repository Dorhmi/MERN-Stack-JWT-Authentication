import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/Context'
import {Link} from 'react-router-dom'
import UserCard from '../components/UserCard'


const DashboardPage = () => {
    const {user , setUser } = useGlobalContext()
    const [users , setUsers] = useState(null)
    // const navigate = useNavigate()


    console.log(user);
    console.log(users);
    
    useEffect(() => {
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
        <div className='dashboard-content'>
            <h2 className='dashboard-title'>Dashboard</h2>
            <div className='dashboard-users'>
                {users.map((user) => {
                    return <UserCard key={user._id} {...user}/>
                })}
            </div>
        </div>
        : 
        <div>
            You'r not authenticated go <br />
            <Link to={'/login'}>login</Link>
        </div>
        }

    </section>
)
}

export default DashboardPage