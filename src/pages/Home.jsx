import React from 'react'
import { Link } from 'react-router-dom'



export function Home() {
    return (
        <div className="home flex column align-center justify-center">
            <h1>Welcome To Taskit</h1>
            <Link to="/board"><p>Start</p></Link>
        </div>
    )
}
