import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {

    const chat = useChat()

    const user = useSelector(state => state.auth.user)
    // const { user } = useSelector(state => state.auth) same as above just destructured
    console.log(user);
    useEffect(()=>{
        chat.initializeSocketConnection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard