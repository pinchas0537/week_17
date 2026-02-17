import { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { Link } from 'react-router';

export default function login() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userName, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [err, seterr] = useState(null)
  async function sendInput() {
    const response = await fetch("http://localhost:3000/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
      }
    )
    const data = await response.json()
    if (data.messages) {
      seterr(data.messages)
    } else if (data.err) {
      seterr(data.err)
    }
    else {
      setCurrentUser({ operator: data.operator, token: response.headers.get("Authorization") })
    }
  }

  return (
    <div id='login'>
      <input type="text" placeholder="enter user name" onChange={e => setusername(e.target.value)} />
      <input type="password" placeholder="enter password" onChange={e => setpassword(e.target.value)} />
      <button type='submit' onClick={sendInput}>send</button>
      {!currentUser && <h1>No user logged in</h1>}
      {currentUser && (
        <>
        <h2>success</h2>
          <p>id = {currentUser.operator.id}</p>
          <p>name = {currentUser.operator.name}</p>
          <p>role = {currentUser.operator.role}</p>
          {err !== null ? seterr(null) : err}
        </>
      )}
      {err && (
        <h3 id='err'>{err}</h3>
      )}
      <nav>
      <Link className='link' to="/">get by Home  </Link>
      <Link className='link' to="/status"> status</Link>
      </nav>
    </div>
  )
}