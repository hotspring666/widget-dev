import logo from './logo.svg';
import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { PolkaConnect } from './PolkaConnect';
import DefineInputs from './DefineInputs';

import RouteComponent from './Routes';

function App() {
  const { address } = useAccount();
  // const [address, setAddress] = useState(
  //   '0xea32650A40EE259834bcfC0062f0038D61832b57'
  // );
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

    document.addEventListener('MetaCRMLoaded', handleConnectWidget);
    return () => {
      document.removeEventListener('MetaCRMLoaded', handleConnectWidget);
    };
  }, [address]);

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

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <button onClick={handleToggle}>toggleButton</button>
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <div>1111111</div>
  //       <div>2222222</div>
  //       <div>333333</div>
  //       <div>444444</div>
  //       <div>55555</div>
  //       <div>666666</div>
  //       <div>777777</div>
  //       <div>8888888</div>
  //       <div>999999</div>
  //       <div>1111111</div>
  //       <div>2222222</div>
  //       <div>333333</div>
  //       <div>444444</div>
  //       <div>55555</div>
  //       <div>666666</div>
  //       <div>777777</div>
  //       <div>8888888</div>
  //       <div>999999</div>
  //       <div>1111111</div>
  //       <div>2222222</div>
  //       <div>333333</div>
  //       <div>444444</div>
  //       <div>55555</div>
  //       <div>666666</div>
  //       <div>777777</div>
  //       <div>8888888</div>
  //       <div>999999</div>
  //       <div>1111111</div>
  //       <div>2222222</div>
  //       <div>333333</div>
  //       <div>444444</div>
  //       <div>55555</div>
  //       <div>666666</div>
  //       <div>777777</div>
  //       <div>8888888</div>
  //       <div>999999</div>
  //       <div>1111111</div>
  //       <div>2222222</div>
  //       <div>333333</div>
  //       <div>444444</div>
  //       <div>55555</div>
  //       <div>666666</div>
  //       <div>777777</div>
  //       <div>8888888</div>
  //       <div>999999</div>
  //       <div>1111111</div>
  //       <div>2222222</div>
  //       <div>333333</div>
  //       <div>444444</div>
  //       <div>55555</div>
  //       <div>666666</div>
  //       <div>777777</div>
  //       <div>8888888</div>
  //       <div>999999</div>
  //     </header>
  //   </div>
  // );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ConnectButton />
        {/* <PolkaConnect></PolkaConnect> */}
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
