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
        <div className="section">
          <input
            type="text"
            name="apiKey"
            value={apiKey}
            placeholder="API Key"
            onChange={(e) => setApiKey(e.target.value)}
            className="input-field"
          />
          <button
            // onClick={() => window.MetaCRMWidget.manualConnectWallet(address)}
            onClick={setupWidget}
            className="button primary-button"
          >
            Init Widget
          </button>
        </div>

        <div className="divider"></div>

        <div className="section">
          <ConnectButton />
          <button
            onClick={async () => {
              try {
                // 检查 Phantom 钱包是否安装
                if (!window.phantom?.solana) {
                  alert("请安装 Phantom ！");
                  window.open("https://phantom.app/", "_blank");
                  return;
                }

                // 连接到 Phantom 钱包
                const connection = await window.phantom.solana.connect();

                window.MetaCRMWidget.manualConnectWallet(
                  connection.publicKey.toString()
                );
              } catch (error) {
                console.error("连接 Phantom 钱包时出错:", error);
                alert("连接钱包失败，请检查 Phantom 扩展是否正常工作");
              }
            }}
            className="button secondary-button"
          >
            Connect Phantom
          </button>
          <PolkaConnect />
        </div>

        <div className="divider"></div>
        <div className="section">
          <DefineInputs defineInfo={defineInfo} setDefineInfo={setDefineInfo} />
        </div>
        <div className="section">
          <button
            onClick={() => window.MetaCRMWidget.manualConnectWallet(defineInfo)}
            className="button secondary-button  "
          >
            ManualConnect with DeFi APP
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
