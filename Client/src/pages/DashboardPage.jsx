import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/Context'
import {Link, json} from 'react-router-dom'
import UserCard from '../components/UserCard'
import * as jwt_decode from 'jwt-decode'
// import jwt from 'jsonwebtoken'


const DashboardPage = () => {
    // const {user , setUser } = useGlobalContext()
    const [users , setUsers] = useState(null)
    // const [isFirstMounted, setIsFirstMounted] = useState(true);
    // const navigate = useNavigate()
    const accessTokenn = localStorage.getItem('accessToken')
    const refreshTokenn = localStorage.getItem('refreshToken')
    // console.log(accessTokenn);
    // console.log(refreshTokenn);
    
    // console.log(jwt_decode);
    // console.log(user);
    // console.log(users);
    
    const refreshToken = async () => {
        try {
            const res = await axios.post('http://localhost:3001/auth/refresh', { token: refreshTokenn });
            localStorage.clear()
            localStorage.setItem('accessToken' , res.data.accessToken)
            localStorage.setItem('refreshToken' , res.data.refreshToken)
            // setUser({
            //     ...user,
            //     accessToken: res.data.accessToken,
            //     refreshToken: res.data.refreshToken
            // });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    
    const axiosJWT = axios.create();
    
    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode.jwtDecode(accessTokenn);
            console.log(decodedToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                console.log('refrechiing');
                const data = await refreshToken();
                config.headers["authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
        );
        
        useEffect(() => {
            if (accessTokenn) {
                axiosJWT.get('http://localhost:3001/users/' , {headers: {authorization: "Bearer " + accessTokenn}})
                .then((res) => {
                    if (res.data) {
                        setUsers(res.data)
                    } 
                })
                .catch((error) => {
                    console.log("oops");
                })
            }
        }, [accessTokenn])
        
        // axiosJWT.interceptors.response.use(
    //     async(res) => {
    //         if (res.data === "Token is not valid") {
    //             const data = await refreshToken(); 
    //             axios.defaults.headers.common["authorization"] = "Bearer " + data.accessToken;
    //         }
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );
    
    // useEffect(() => {
    //     if (user) {
    //         localStorage.setItem('user', JSON.stringify(user));
    //     }
    // }, [user]);

    // useEffect(() => {
    //     const storedTokens = localStorage.getItem('user');
    //     if (storedTokens) {
    //         setUser(JSON.parse(storedTokens));
    //     }
    // }, [setUser]);
    

    // useEffect(() => {
    //     if (user && user.refreshToken) {
    //         const intervalId = setInterval(async () => {
    //             try {
    //                 await refreshToken();
    //             } catch (error) {
    //                 console.log("Error refreshing token:", error);
    //             }
    //         }, 60000); 
    //         return () => clearInterval(intervalId);
    //     }
    // }, [user]);


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
