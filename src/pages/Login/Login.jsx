import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import checkUsername from '../../data/username';


function Login({setToken}) {

    const userRef = useRef();
    const passRef = useRef();

  return (
    <div className='w-25 m-auto text-center fs-1' >
        <Form.Label htmlFor='username'>Username</Form.Label>
        <Form.Control 
        type='text' 
        id='username' 
        aria-describedby='passwordHelpBlock' 
        placeholder='User' 
        style={{textAlign:"center"}}
        ref={userRef}
        />

        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control 
        type='password' 
        id='password' 
        aria-describedby='passwordHelpBlock' 
        placeholder='Password' 
        style={{textAlign:"center"}}
        ref={passRef}
        />

        <button 
        className='btn btn-success m-3 px-5 py-1 fs-3'
        onClick={() => {
            const user = userRef.current.value.trim()
            const pass = passRef.current.value.trim()
            const userInfo = checkUsername(user, pass)
            if(userInfo === null){
                alert("Wrong Username or Password")
                userRef.current.value = ""
                passRef.current.value = ""
                userRef.current.focus()
            } else {
                setToken(userInfo)
                console.log(userInfo)
            }
        }}
        >Login</button>

    </div>
  )
}

export default Login