import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (window?.MetaCRMWidget?.setHide) {
      if(location.pathname === '/objective'){
        window.MetaCRMWidget.setHide(true);
      }else{
        window.MetaCRMWidget.setHide(false);
      }
    }
  }, [location]);

  return (
    <>
    <div>Home</div>
    {/* <button onClick={() =>{
      const event = new CustomEvent('MetaCRMInit', {});
			document.dispatchEvent(event);
    } } type='button'>Click</button> */}
    <div style={{display:'flex'}}>
        <Link to="/objective">objective</Link>
        <Link to="/campaign">Campaign</Link>
    </div>
    </>
    
  )
}

export default Home