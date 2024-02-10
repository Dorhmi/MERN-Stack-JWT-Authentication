import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/Context'
import {Link} from 'react-router-dom'
import UserCard from '../components/UserCard'
// import jwt_decode from 'jwt-decode'

const DashboardPage = () => {
    const {user , setUser } = useGlobalContext()
    const [users , setUsers] = useState(null)
    // const navigate = useNavigate()
    
    
    // console.log(user);
    // console.log(users);
    
    
    const refreshToken = async () => {
        try {
            const res = await axios.post('http://localhost:3001/auth/refresh', { token: user.refreshToken });
            setUser({
                ...user,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
    
    // const axiosJWT = axios.create();
    
    // axiosJWT.interceptors.request.use(
    //     async (config) => {
    //         let currentDate = new Date();
    //         const decodedToken = jwt_decode(user.accessToken); 
    //         if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //             console.log('Token expired, refreshing...');
    //             const data = await refreshToken();
    //             config.headers["authorization"] = "Bearer " + data.accessToken;
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         console.log('Interceptor error:', error);
    //         return Promise.reject(error);
    //     }
    // );
    
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

    useEffect(() => {
        if (user && user.refreshToken) {
            const intervalId = setInterval(() => {
                refreshToken();
            }, 9000);
            return () => clearInterval(intervalId)
        }
    }, [user])


return (
    <section className='dashboard-section'>
        {users ?
        <div className='dashboard-content'>
            <h2 className='dashboard-title'>Dashboard</h2>
            <div className='dashboard-users'>
                {users.map((user) => {
                    return <UserCard key={user._id} id={user._id} {...user}  />
                })}
            </div>
        </div>
        : 
        <div>
            You'r not authenticated 
            <Link to={'/login'}>login</Link>
            again
        </div>
        }

    </section>
)
}

export default DashboardPage
