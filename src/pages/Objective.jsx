import React from 'react'
import { Link } from 'react-router-dom'


const Objective = () => {
  return (
    <>
    <div>Objective</div>
    
    <div style={{display:'flex'}}>
        <Link to="/">Home</Link>
        <Link to="/campaign">Campaign</Link>
    </div>
    </>
  )
}

export default Objective