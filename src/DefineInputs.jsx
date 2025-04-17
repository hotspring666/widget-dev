import { useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';



 const DefineInputs = ({defineInfo,setDefineInfo}) => {

  const handleChange=(e)=>{
    const {name, value}=e.target;
    setDefineInfo({...defineInfo, [name]:value})
  }

 
  return(
    <>
    <input type="text" name="userId" placeholder='user id' onChange={handleChange}/>
    <input type="text" name="evmAddress" placeholder='evm address' onChange={handleChange}/>
    <input type="text" name="solanaAddress" placeholder='solana address' onChange={handleChange}/>
    <input type="text" name="email" placeholder='email' onChange={handleChange}/>
    </>
  )
};

export default DefineInputs;


