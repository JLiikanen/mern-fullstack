'use client'
import { useState } from "react";
import React from 'react'


export default function Dashboard(){
    const [isAuthorized, setIsAuthorized] = useState(false);

    // check the user bearer token that the user is authorized for access!
    const token = localStorage.getItem('token');
    console.log("my token", token)
    fetch('http://localhost:3000/api/goals', {
        method: 'GET',
        headers: {
            'authorization': `${token}`
        }
    }) // still not working, NOW IT LETS ANYONE IN TO THE DASHBOARD!

    .then(response => {
        if (response.status === 401) {
            console.log(response.text())
            throw Error("Invalid token!")
        } else if (response.status === 200) {
            return;
        }
    })
    .then(data => {
        // Render the data
        setIsAuthorized(true)
    })
    .catch(error => {
        console.error('Error fetching user goals:', error);
    });

    console.log(isAuthorized)
    return (
        isAuthorized ? <h1>Hello User!</h1> : <h1>Access denied</h1>
    )
}

