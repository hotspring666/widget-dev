import { useEffect, useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

const DefineInputs = ({ defineInfo, setDefineInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDefineInfo({ ...defineInfo, [name]: value });
  };

  return (
    <>
      <input
        type="text"
        name="userId"
        className="input-field"
        placeholder="user id"
        onChange={handleChange}
      />
      <input
        type="text"
        name="evmAddress"
        className="input-field"
        placeholder="evm address"
        onChange={handleChange}
      />
      <input
        type="text"
        name="solanaAddress"
        className="input-field"
        placeholder="solana address"
        onChange={handleChange}
      />
      <input
        type="text"
        className="input-field"
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
    </>
  );
};

export default DefineInputs;
