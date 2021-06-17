import React, { useState, useEffect } from 'react'
import StatusIcon from './StatusIcon'
import Loading from './Loading'
import Web3 from 'web3'

import '../styles/main.css'

export default function ConnectButton({connectionCallback}) {

    const [isConnected, changeConnected] = useState(false)
    const [connecting, changeConnecting] = useState(false)
    const [ethAddress, changeEthAddress] = useState("")
    const [connectError, changeConnectError] = useState(null)

    useEffect(() => {
        if (ethAddress !== "") connectionCallback(ethAddress)
    }, [ethAddress])

    const errorNoWallet = <span className="status-error">Cannot connect to your wallet. Please make sure you have one <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">installed</a>  and your browser supports it.</span> 
    const errorConnectionTrouble = <span className="status-error">Cannot connect to MetaMask. Please try again.</span>

    const connectToWallet = async () => {
        changeConnectError(null)
        if (window.ethereum) {
            changeConnecting(true)
            window.web3 = new Web3(window.ethereum)
            try {
                await window.ethereum.enable()
                changeConnected(true)
                const account = window.web3.currentProvider.selectedAddress
                changeEthAddress(account)
            } catch (error) {
                changeConnectError(errorConnectionTrouble)
                changeConnecting(false)
            }
        } else {
            changeConnectError(errorNoWallet)
        }
    }
    
    return (
        <div className="div__connect-wallet">
            <button disabled={isConnected || connecting} onClick={connectToWallet} type="button" className="button__outline button__connect-wallet">{isConnected ? <>Connected <StatusIcon/> </> : connecting ? <Loading/> : 'Connect Wallet' }</button> 
            { connectError }
        </div>
    )
}