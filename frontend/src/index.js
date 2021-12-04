import React from 'react';
import ReactDOM from 'react-dom';

// import web3
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import Routing from './Routing';

// intialize web3-react
const getLibrary = (provider) => {
  return new Web3(provider);
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Routing />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

