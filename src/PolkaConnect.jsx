import { useEffect, useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

export const PolkaConnect = () => {
  const [state, setState] = useState({});

  const handleConnect = () => {
    setState({ ...state, loading: true });

    web3Enable("polkadot-extension-dapp-example")
      .then((injectedExtensions) => {
        if (!injectedExtensions.length) {
          return Promise.reject(new Error("NO_INJECTED_EXTENSIONS"));
        }

        return web3Accounts();
      })
      .then((accounts) => {
        if (!accounts.length) {
          return Promise.reject(new Error("NO_ACCOUNTS"));
        }

        setState({
          error: null,
          loading: false,
          data: {
            accounts: accounts,
            defaultAccount: accounts[0],
          },
        });
      })
      .catch((error) => {
        console.error("Error with connect", error);
        setState({ error, loading: false, data: undefined });
      });
  };

  if (state.error) {
    return (
      <span style={{ color: "red", marginTop: "20px", fontSize: "14px" }}>
        Error with connect: {state.error.message}
      </span>
    );
  }

  return state.data ? (
    <div style={{ marginTop: "20px" }}>
      Hello, {state.data.defaultAccount.address}!
    </div>
  ) : (
    <button
      disabled={state.loading}
      className="button secondary-button"
      onClick={handleConnect}
    >
      {state.loading ? "Connecting..." : "Connect Polka"}
    </button>
  );
};

function beatifyAddress(address) {
  return `${address.slice(0, 3)}...${address.slice(-3)}`;
}
