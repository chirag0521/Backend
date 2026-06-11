import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const user = useSelector(state => state.auth.user)
    // const { user } = useSelector(state => state.auth) same as above just destructured
    console.log(user);

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard