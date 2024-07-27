import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [form, setForm] = useState({});
  const [users,setUsers] = useState([])

  

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

     const response =  await fetch("http://localhost:8000/demo",{
      method: "POST",
      body:JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        },
    })

   console.log(response)
    if (response.ok) {
      // Refresh the users list after a successful submission
      getUsers();
    }
   };


   const getUsers = async () =>{
    const response = await fetch("http://localhost:8000/demo",{
      method: "GET",
    })
    const data = await response.json();
    setUsers(data)
   };
   
   useEffect(()=>{
    getUsers();
   },[])



  return (
    <>
      <form onSubmit={handleSubmit}>
        <span>User Name:</span>
        <input type="text" required name="username" onChange={(e) => handleForm(e)} />
        <span>Password:</span>
        <input type="password" required name="password" onChange={handleForm} />
        <button type="submit">Login</button>
      </form>

      <div>
        <ul>
          {users.map(user=>
            <li key={user.id}>{user.username}</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;