import logo from "./logo.svg";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { PolkaConnect } from "./PolkaConnect";
import DefineInputs from "./DefineInputs";

import RouteComponent from "./Routes";

function App() {
  const { address } = useAccount();
  const [apiKey, setApiKey] = useState("");
  const [defineInfo, setDefineInfo] = useState({
    userId: null,
    evmAddress: null,
    solanaAddress: null,
    email: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  // console.log('defineInfo: ', defineInfo);

  // console.log('address: ', address);
  // const [address, setAddress] = useState(null);

  // const handleSolfLare = async () => {
  //   await window.solflare.connect();
  //   const address = window.solflare.publicKey.toBase58();
  //   setAddress(address);
  // };

  // useEffect(() => {
  //   handleSolfLare();
  // }, []);

  useEffect(() => {
    if (window?.MetaCRMWidget?.manualConnectWallet) {
      window.MetaCRMWidget.manualConnectWallet(address);
    }

    const handleConnectWidget = () => {
      window.MetaCRMWidget?.manualConnectWallet(address);
    };

    document.addEventListener("MetaCRMLoaded", handleConnectWidget);
    return () => {
      document.removeEventListener("MetaCRMLoaded", handleConnectWidget);
    };
  }, [address, window?.MetaCRMWidget]);

  function initializeWidget(apiKey) {
    window.MetaCRMWidget.init({
      apiKey: apiKey, // Use the provided API key
      manualConnect: true,
      MetaCRMWidgetExecutionEnvironment: "dev",
    });
  }

  async function setupWidget() {
    try {
      if (!apiKey) return;

      initializeWidget(apiKey);
      console.log("Widget initialized successfully with API key:", apiKey);
    } catch (error) {
      console.error("Failed to load widget.js", error);
    }
  }

  // const handleOpen = () => {
  //   window.MetaCRMWidget.setWidgetOpen();
  //   setIsOpen(true);
  // };

  // const handleToggle = e => {
  //   e.preventDefault();
  //   console.log(
  //     'window?.MetaCRMWidget?.widgetStatus: ',
  //     window?.MetaCRMWidget?.widgetStatus
  //   );

  //   if (window?.MetaCRMWidget?.widgetStatus) {
  //     window.MetaCRMWidget.setWidgetClose();
  //   } else {
  //     window.MetaCRMWidget.setWidgetOpen();
  //   }
  // };

  // useEffect(() => {
  //   const handleMouseDown = () => {
  //     window.MetaCRMWidget.setWidgetClose();
  //     setIsOpen(false);
  //   };

  //   if (isOpen) {
  //     document.addEventListener('mousedown', handleMouseDown);
  //   }
  //   // window.MetaCRMWidget.setWidgetClose();
  // }, [isOpen]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <hr />
        <input
          type="text"
          name="apiKey"
          value={apiKey}
          placeholder="API Key"
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button
          // onClick={() => window.MetaCRMWidget.manualConnectWallet(address)}
          onClick={setupWidget}
        >
          init widget
        </button>
        <hr />
        <ConnectButton />
        <PolkaConnect></PolkaConnect>
        <RouteComponent></RouteComponent>
        <DefineInputs
          defineInfo={defineInfo}
          setDefineInfo={setDefineInfo}
        ></DefineInputs>
        <button
          // onClick={() => window.MetaCRMWidget.manualConnectWallet(address)}
          onClick={() => window.MetaCRMWidget.manualConnectWallet(defineInfo)}
        >
          manual connect
        </button>

        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleOpen}>open</button>
          <button onClick={() => window.MetaCRMWidget.setWidgetClose()}>
            close
          </button>
        </div>
        <div>
          <button onClick={handleToggle}>toggleButton</button>
        </div> */}
      </header>
    </div>
  );
}

export default App;
