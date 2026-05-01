import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate()
    return (
        <nav className='navbar'>
            <p>Instagram</p>
            <button
                onClick={() => { navigate("/create-post") }}
                className='button primary-button'>New post</button>
        </nav>
    )
}

export default Nav