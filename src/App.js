import logo from "./logo.svg";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import DefineInputs from "./DefineInputs";

function App() {
  const { address } = useAccount();
  const [apiKey, setApiKey] = useState("");
  const [version, setVersion] = useState("");
  const [integrity, setIntegrity] = useState("");
  const [manualConnect, setManualConnect] = useState(false);
  const [defineInfo, setDefineInfo] = useState({
    userId: null,
    evmAddress: null,
    solanaAddress: null,
    email: null,
  });

  // const [address, setAddress] = useState(null);

  // const handleSolfLare = async () => {
  //   await window.solflare.connect();
  //   const address = window.solflare.publicKey.toBase58();
  //   setAddress(address);
  // };

  // useEffect(() => {
  //   handleSolfLare();
  // }, []);

  const loadWidgetScript = async (src, version, integrity) => {
    return new Promise((resolve, reject) => {
      if (document.getElementById("widget-dom-id")) return;
      const script = document.createElement("script");
      script.crossOrigin = "anonymous";
      script.id = "widget-dom-id";
      if (integrity) script.integrity = integrity;
      let widgetUrl = src;
      if (version) widgetUrl += `-${version}`;
      widgetUrl += ".js";
      script.src = widgetUrl;

      script.onload = () => resolve(script);
      script.onerror = () =>
        reject(new Error(`Script load error for ${widgetUrl}`));

      document.body.appendChild(script);
    });
  };

  const initializeWidget = async (apiKey) => {
    await loadWidgetScript(
      "https://dev.widget.metacrm.inc/static/js/widget",
      version,
      integrity
    );
    const config = {
      apiKey: apiKey, // Use the provided API key
      MetaCRMWidgetExecutionEnvironment: "dev",
    };
    if (manualConnect) {
      config.manualConnect = manualConnect;
    }
    window.MetaCRMWidget.init(config);
    if (manualConnect) return;
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
  };

  async function setupWidget() {
    try {
      if (!apiKey) return;

      initializeWidget(apiKey);
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
          <div className="label">SRI</div>
          <input
            type="text"
            name="version"
            value={version}
            placeholder="Version"
            onChange={(e) => setVersion(e.target.value)}
            className="input-field"
          />

          <input
            type="text"
            name="integrity"
            value={integrity}
            placeholder="Integrity"
            onChange={(e) => setIntegrity(e.target.value)}
            className="input-field"
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="manualConnect"
              name="manualConnect"
              value={manualConnect}
              onChange={(e) => setManualConnect(e.target.checked)}
              className="custom-checkbox"
            />
            <label htmlFor="manualConnect" className="checkbox-label">
              Manual Connect
            </label>
          </div>
          <button onClick={setupWidget} className="button primary-button">
            Init Widget
          </button>
        </div>

        <div className="divider"></div>

        <div className="section">
          <ConnectButton />
          <button
            onClick={async () => {
              try {
                const connection = await window.ethereum.request({
                  method: "eth_requestAccounts",
                });
                const accounts = await window.ethereum.request({
                  method: "eth_accounts",
                });
                window.MetaCRMWidget.manualConnectWallet(accounts[0]);
              } catch (error) {
                console.error("连接 Phantom 钱包时出错:", error);
              }
            }}
            className="button secondary-button"
          >
            Connect EVM
          </button>
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
                console.error("connect Phantom error:", error);
              }
            }}
            className="button secondary-button"
          >
            Connect Phantom
          </button>
          <button
            onClick={async () => {
              try {
                await window.rise.connect();
                window.MetaCRMWidget.manualConnectWallet(window?.rise?.address);
              } catch (error) {
                console.error("connect Aptos error:", error);
              }
            }}
            className="button secondary-button"
          >
            Connect Aptos (rise)
          </button>
          <button
            onClick={async () => {
              try {
                const injectedExtensions = await web3Enable(
                  "polkadot-extension-dapp-example"
                );
                if (!injectedExtensions.length) {
                  throw new Error("NO_INJECTED_EXTENSIONS");
                }
                const accounts = await web3Accounts();
                if (!accounts.length) {
                  throw new Error("NO_ACCOUNTS");
                }
                window.MetaCRMWidget.manualConnectWallet(accounts[0]?.address);
              } catch (error) {
                console.error("connect Polka error:", error);
              }
            }}
            className="button secondary-button"
          >
            Connect Polka
          </button>
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
