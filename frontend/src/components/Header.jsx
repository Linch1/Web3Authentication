import React from "react";

// import web3
import {useWeb3React } from '@web3-react/core';

const Header = ( props ) => {

    const { account } = useWeb3React();

    return(
        <div>
            <button > { account ? account : 'Connect Wallet'} </button>
        </div>
    )
}

export default Header;