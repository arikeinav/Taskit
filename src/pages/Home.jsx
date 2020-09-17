import React from 'react'
import { Link } from 'react-router-dom'



export function Home() {
    return (
        <div className="home flex column align-center justify-center">
            <h1>Welcome To Task<span className="logo-i">i</span>t</h1>
            <Link to="/board"><p>Start</p></Link>
        </div>
    )
}
