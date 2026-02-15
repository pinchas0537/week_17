import React, { createContext, useState } from 'react'
export default function login() {
  const [userName, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [operator, setoperator] = useState(null)
  async function sendInput() {
    const response = await fetch("http://localhost:3000/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userName, password }) })
    const data = await response.json()
    const token1 = response.headers.get("Authorization")    
    setoperator(data.operator)
  }
  const token = createContext(token1)

  return (
    <div>
      <input type="text" placeholder="enter user name" onChange={e => setusername(e.target.value)} />
      <input type="password" placeholder="enter password" onChange={e => setpassword(e.target.value)} />
      <button type='submit' onClick={sendInput}>send</button>
      {operator && (
        <>
          <p>id = {operator.id}</p>
          <p>name = {operator.name}</p>
          <p>role = {operator.role}</p>
        </>
      )}
    </div>
  )
}
