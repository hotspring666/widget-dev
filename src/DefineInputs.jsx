import { useEffect, useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

const DefineInputs = ({ defineInfo, setDefineInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "addresses") {
      const addresses = value.split(",").map((address) => address.trim());
      setDefineInfo({ ...defineInfo, addresses });
    } else {
      setDefineInfo({ ...defineInfo, [name]: value });
    }
  };

  return (
    <>
      <input
        type="text"
        name="clientId"
        className="input-field"
        placeholder="client id"
        onChange={handleChange}
      />
      <input
        type="text"
        name="addresses"
        className="input-field"
        placeholder="addresses"
        onChange={handleChange}
      />
      <input
        type="text"
        className="input-field"
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="discordId"
        className="input-field"
        placeholder="discord id"
        onChange={handleChange}
      />
      <input
        type="text"
        name="discordHandle"
        className="input-field"
        placeholder="discord handle"
        onChange={handleChange}
      />
      <input
        type="text"
        className="input-field"
        name="userName"
        placeholder="user name"
        onChange={handleChange}
      />
    </>
  );
};

export default DefineInputs;
