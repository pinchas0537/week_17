import React from 'react'
import { Link } from 'react-router'

export default function Home() {
    return (
        <div id='home'>
            <h1>
                wolcome to server
            </h1>
            <Link className='link' to="login">login</Link>
        </div>
    )
}
