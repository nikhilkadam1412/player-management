import React, { useEffect, useState } from 'react';

export default function UserList() {
    const users = [
        { id: 1, name: 'John',active: true, age: 25 },
        { id: 2, name: 'Jane',active: true, age: 30 },
        { id: 3, name: 'Bob',active: true, age: 28 },
        { id: 4, name: 'Alice',active: false, age: 22 },
        { id: 5, name: 'Ali',active: false, age: 24 },
        { id: 6, name: 'Pace',active: true, age: 32 },
    ];

    const [activeUser, setActiveUsers] = useState(users.filter((usr) => usr.active));
    const [deleteUser, setDeleteUser] = useState(users.filter((usr) => !usr.active))

    const userDelete = (id) => {
        console.log("id",id);
        const findUser = activeUser.find((usr) => usr.id == id);
        setActiveUsers(activeUser.filter((usr) => usr.id !== id));
        setDeleteUser([...deleteUser, { ...findUser, active: false }]);
    }

    const restoreUser = (id) => {
        console.log("id",id)
        const findUser = deleteUser.find((usr) => usr.id == id);
        setDeleteUser(deleteUser.filter((usr) => usr.id !== id));
        setActiveUsers([...activeUser, { ...findUser, active: true }]);
    }

    const fetchData = async () => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
            if(!response.ok) {
                throw new Error("Something went wrong!")
            }

            const jsonData = await response.json();
            console.log("json", jsonData)
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <div>
            <h1>User List</h1>
            { activeUser.length > 0 ? 
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    { activeUser.map((val) => 
                        <tr key={val.id}>
                            <td>{val.id}</td>
                            <td>{val.name}</td>
                            <td><button onClick={() => userDelete(val.id)}>Delete</button></td>
                        </tr>
                    ) }
                </table>
                : <p>No User found</p>
            }

            <p>Deleted Users</p>
            {
                deleteUser.length > 0 ? 
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    {
                        deleteUser.map((val) => (
                            <tr key={val.id}>
                                <td>{val.id}</td>
                                <td>{val.name}</td>
                                <td><button onClick={() => restoreUser(val.id)}>Restore</button></td>
                            </tr>
                        ))
                    }
                </table>
                : <p>No deleted User</p>
            }

        </div>
    )
}