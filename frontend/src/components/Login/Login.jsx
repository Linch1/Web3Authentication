import {config} from 'dotenv';
import React, { useEffect, useRef, useState } from "react";

// import web3
import {useWeb3React } from '@web3-react/core';
import Web3Library from "../../web3Actors/Library";
import ApiAuth from "../../Api/auth";
import ApiUsers from "../../Api/users";

config(); // load env variables



const Web3Login = ( props ) => {

    const [ retrivedInfos, setRetrivedInfos ] = useState("NONE");
    const { account, library } = useWeb3React();
    
    const login = async () => {
        if( !account ) return;
        let nonce = (await ApiUsers.getNonce( account )).data.nonce;
        let web3 = Web3Library.getLib( library );
        let textToSign = `${process.env.REACT_APP_AUTH_TEXT}${nonce}`;
        let sign = await web3.eth.personal.sign( textToSign, account);
        let res = await ApiAuth.authenitcate( sign, account );
    }
    const retriveInfos = async () => {
        if( !account ) return;
        let infos = (await ApiUsers.getUser()).data;
        setRetrivedInfos(JSON.stringify(infos));
    }

    return(
        <div>
            <button onClick={login}> Login </button>
            <button onClick={retriveInfos}> Retrive My Infos </button>
            <p>Retrived Infos: {retrivedInfos}</p>
        </div>
    )
}

export default Web3Login;