import React from 'react'

function UserCard({userInfo}) {
    return (
        <div style={{ width: '300px', height: '250px' }}>
            <img />
            <h1>{userInfo.name}</h1>
            <p>{userInfo.email}</p>
            <p>{userInfo.phone}</p>
            <button>more info</button>
        </div>
    )
}

export default UserCard