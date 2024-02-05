import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/Context'

const DashboardPage = () => {
    const {user , setUser } = useGlobalContext()
    const [users , setUsers] = useState(null)

    console.log(user);
    console.log(users);

    useEffect(() => {
        if (user && user.accessToken) {
            axios.get('http://localhost:3001/users/' , {headers: {authorization: "Bearer " + user.accessToken}})
            .then((res) => {
                setUsers(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
        localStorage.setItem('user' , JSON.stringify(user))
    }, [user , setUser])

    const storedTokens= localStorage.getItem('user')
    if(storedTokens) {
        setUser(JSON.parse(storedTokens))
    }

return (
    <section className='dashboard-section'>
        <div className='dashboard-content'>hellloo</div>
    </section>
)
}

export default DashboardPage