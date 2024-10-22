import React from 'react'

function Footer() {
  return (
    <div className="text-center bg-danger">
      <h1 className='align-self-stretch' style={{margin:"0"}}>
        <span className="badge bg-dark">SPU</span> 
        <span className='ms-2 me-2'>-</span> 
        <span className="badge bg-secondary">SIT</span> 
        <span className='ms-2 me-2'>-</span> 
        <span className="badge bg-info">CSI</span>
      </h1>
    </div>
  )
}

export default Footer