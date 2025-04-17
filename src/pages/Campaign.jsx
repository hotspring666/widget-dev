import React from 'react'
import { Link } from 'react-router-dom'


const Campaign = () => {
  return (
    <>
        <div>Campaign</div>
        <div style={{display:'flex'}}>
        <Link to="/objective">objective</Link>
        <Link to="/">Home</Link>
    </div>

    </>
  )
}

export default Campaign