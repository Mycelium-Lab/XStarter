import React, { useState, useEffect } from 'react'
import StatusIcon from './StatusIcon'
import Loading from './Loading'
import Web3 from 'web3'
import { BrowserView, MobileView } from 'react-device-detect'
import WalletConnectProvider from "@walletconnect/web3-provider"

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
    const errorWalletConnectionTrouble = <span className="status-error">Cannot connect to your wallet. Please try again.</span>

    const connectToMobileWallet = async () => {
        changeConnectError(null)
        try {
            const provider = new WalletConnectProvider({
                infuraId: process.env.REACT_APP_INFURA_PROJECT_ID,
            })
            changeConnecting(true)
            await provider.enable()
            const web3 = new Web3(provider)
            const accounts = await web3.eth.getAccounts()
            if (accounts) {
                changeConnecting(false)
                changeConnected(true)
                changeEthAddress(accounts[0])
            }
            else changeConnectError(errorNoWallet)
        } catch (error) {
            changeConnectError(errorWalletConnectionTrouble)
        }
        changeConnecting(false) 
    }

    const connectToWallet = async () => {
        changeConnectError(null)
        if (window.ethereum) {
            changeConnecting(true)
            const web3 = new Web3(window.ethereum)
            try {
                await window.ethereum.enable()
                changeConnected(true)
                const account = web3.currentProvider.selectedAddress
                changeEthAddress(account)
            } catch (error) {
                changeConnectError(errorWalletConnectionTrouble)
                changeConnecting(false)
            }
        } else {
            changeConnectError(errorNoWallet)
        }
    }

    const connectButton = (callBackOnPress) => 
        <button disabled={isConnected || connecting} onClick={callBackOnPress} type="button" className="button__outline button__connect-wallet">{isConnected ? <>Connected <StatusIcon/> </> : connecting ? <Loading/> : 'Connect Wallet' }</button> 
    
    return (
        <div className="div__connect-wallet">
            <BrowserView>
                { connectButton(connectToWallet) }
            </BrowserView>
            <MobileView>
                { connectButton(connectToMobileWallet) }
            </MobileView>
            { connectError }
        </div>
    )
}