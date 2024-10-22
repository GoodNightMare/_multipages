import React, { useRef, useState } from 'react'
import { Form, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'
import checkUsername from '../../data/username';


function Login({setToken}) {

    const userRef = useRef();
    const passRef = useRef();

  return (
    <div className='d-flex align-self-center justify-content-center h-100 p-5 bg-secondary'>
      <div className=' m-auto text-center border border-danger rounded-4 p-4 bg-light'>
        {/* OverlayTrigger เพื่อแสดง Tooltip เมื่อชี้ไปที่รูปภาพ */}
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Popover id="popover">
              <Popover.Body>
                ลิขสิทธิ์
                <br />
                <p>
                  https://mpics.mgronline.com/pics/Images/560000009989801.JPEG
                </p>
              </Popover.Body>
            </Popover>
          }
        >
          <img
            src='https://mpics.mgronline.com/pics/Images/560000009989801.JPEG'
            className='w-50'
            alt="Login Image"
            style={{ cursor: "pointer" }} // เพิ่ม cursor pointer เพื่อแสดงว่าเป็น interactive
          />
        </OverlayTrigger>    
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Label htmlFor='username' className="me-2 fs-4"><span className="bi bi-person-circle"></span>Username :</Form.Label>
          <Form.Control
            type='text'
            id='username'
            aria-describedby='passwordHelpBlock'
            placeholder='User'
            style={{ textAlign: "center", flex: 1 }}
            ref={userRef}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Label htmlFor='password' className="me-2 fs-4"><span className="bi bi-key-fill"></span>Password :</Form.Label>
          <Form.Control
            type='password'
            id='password'
            aria-describedby='passwordHelpBlock'
            placeholder='Password'
            style={{ textAlign: "center", flex: 1 }}
            ref={passRef}
          />
        </div>

        <button
          className='btn btn-success m-3 px-5 py-1 fs-3'
          onClick={() => {
            const user = userRef.current.value.trim()
            const pass = passRef.current.value.trim()
            const userInfo = checkUsername(user, pass)
            if (userInfo === null) {
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
    </div>
  )
}

export default Login;
