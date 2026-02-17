import React, { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext';
import { Link } from 'react-router';

export default function Status() {
    const [status, setStatus] = useState("")
    const { currentUser } = useContext(UserContext);
    const fech = async function () {

        const response = await fetch("http://localhost:3000/status", { headers: { "Authorization": currentUser.token } })
        const data = await response.json()
        data.isOpen === true ? data.isOpen = "true" : data.isOpen = "false"
        setStatus(data)
        console.log(data);
    }
    return (
        <div>
            <button onClick={fech}>status</button>
            {status &&
                <>
                    <p>id = {status.checkpoint.id}</p>
                    <p>name is : {status.checkpoint.name}</p>
                    <p>location = {status.checkpoint.location}</p>
                    <p>commander = {status.checkpoint.commander}</p>
                    <p>isOpen = {status.isOpen}</p>
                    <p>trafficLevel = {status.trafficLevel}</p>
                    <p>lastUpdated ={status.lastUpdated}</p>
                </>
            }
            <Link to="/">Home</Link>
        </div>
    )
}
