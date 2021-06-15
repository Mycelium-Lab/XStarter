import React, { useState, useEffect } from 'react'
import StatusIcon from './StatusIcon'
import Web3 from 'web3'

import '../styles/main.css'

export default function ConnectButton({connectionCallback}) {

    const [isConnected, changeConnected] = useState(false)
    const [ethAddress, changeEthAddress] = useState("")
    const [connectError, changeConnectError] = useState(null)

    useEffect(() => {
        if (ethAddress !== "") connectionCallback(ethAddress)
    }, [ethAddress])

    const errorNoWallet = <span className="error">Cannot connect to your wallet. Please make sure you have it <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">installed</a>.</span> 
    const errorConnectionTrouble = <span className="error">Cannot connect to MetaMask. Please try again.</span>

    const connectToWallet = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            try {
                await window.ethereum.enable()
                changeConnected(true)
                const account = window.web3.currentProvider.selectedAddress
                changeEthAddress(account)
            } catch (error) {
                changeConnectError(errorConnectionTrouble)
            }
        } else {
            changeConnectError(errorNoWallet)
        }
    }
    
    return (
        <div className="div__connect-wallet">
            <button disabled={isConnected} onClick={connectToWallet} type="button" className="button__outline button__connect-wallet">{isConnected ? <>Connected <StatusIcon/> </> : 'Connect Wallet' }</button> 
            { connectError }
        </div>
    )
}
