import React, { useState, useEffect } from 'react'
import StatusIcon from './StatusIcon'
import Loading from './Loading'
import { BrowserView, MobileView } from 'react-device-detect'
import StyledInfoIcon from './styled-mui/StyledInfoIcon'
import Fade from '@material-ui/core/Fade'
import StyledAlertInfo from './styled-mui/StyledAlertInfo'

import '../styles/main.css'

export default function ConnectButton({connectionCallback}) {

    const [isConnected, changeConnected] = useState(false)
    const [connecting, changeConnecting] = useState(false)
    const [ethAddress, changeEthAddress] = useState("")
    const [connectError, changeConnectError] = useState(null)
    const [displayInfoAlert, changeDisplayInfoAlert] = useState(false)

    useEffect(() => {
        if (ethAddress !== "") connectionCallback(ethAddress)
    }, [ethAddress])

    const errorNoWallet = <span className="status-error">Cannot connect to your wallet. Please make sure you have one <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">installed</a>  and your browser supports it.</span> 
    const errorWalletConnectionTrouble = <span className="status-error">Cannot connect to your wallet. Please try again.</span>

    const connectToMobileWallet = async () => {
        // changeConnectError(null)
        // try {
        //     const provider = new WalletConnectProvider({
        //         infuraId: process.env.REACT_APP_INFURA_PROJECT_ID,
        //     })
        //     changeConnecting(true)
        //     await provider.enable()
        //     const web3 = new Web3(provider)
        //     const accounts = await web3.eth.getAccounts()
        //     changeConnecting(false)
        //     if (accounts) {
        //         changeConnected(true)
        //         changeEthAddress(accounts[0])
        //     }
        //     else changeConnectError(errorNoWallet)
        // } catch (error) {
        //     changeConnecting(false)
        //     changeConnectError(errorWalletConnectionTrouble)
        // }
    }

    const connectToWallet = async () => {
        // changeConnectError(null)
        // if (window.ethereum) {
        //     changeConnecting(true)
        //     const web3 = new Web3(window.ethereum)
        //     try {
        //         await window.ethereum.enable()
        //         changeConnected(true)
        //         const accounts = await web3.eth.getAccounts()
        //         changeConnecting(false)
        //         if (accounts) {
        //             changeConnected(true)
        //             changeEthAddress(accounts[0])
        //         }
        //         else changeConnectError(errorNoWallet)
        //     } catch (error) {
        //         changeConnecting(false)
        //         changeConnectError(errorWalletConnectionTrouble)
        //     }
        // } 
        // else changeConnectError(errorNoWallet)
    }

    const connectButton = (callBackOnPress) => 
        <button disabled={isConnected || connecting} onClick={callBackOnPress} type="button" className="button__outline button__connect-wallet">{isConnected ? <>Connected <StatusIcon/> </> : connecting ? <Loading/> : 'Connect Wallet' }</button> 

    const infoAlertSlow = <StyledAlertInfo variant="outlined" severity="info">Connection may take a while in your wallet app. Please be patient.</StyledAlertInfo>
    const infoAlertCache = <StyledAlertInfo variant="outlined" severity="info">If your wallet or wallet address has changed, you may need to clear your browser cache.</StyledAlertInfo>

    return (
        <div className="div__connect-wallet">
            <BrowserView>
                <div>
                    { connectButton(connectToWallet) }
                    { <StyledInfoIcon onMouseEnter={() => changeDisplayInfoAlert(true)} onMouseLeave={() => changeDisplayInfoAlert(false)}/> }
                </div>
                <Fade unmountOnExit={true} in={displayInfoAlert}>
                    {infoAlertCache}
                </Fade>
            </BrowserView>
            <MobileView>
                <div>
                    { connectButton(connectToMobileWallet) }
                    { <StyledInfoIcon onClick={() => changeDisplayInfoAlert(!displayInfoAlert)}/> }
                </div>
                <Fade unmountOnExit={true} in={displayInfoAlert}>
                    {infoAlertSlow}
                </Fade>
                <Fade unmountOnExit={true} in={displayInfoAlert}>
                    {infoAlertCache}
                </Fade>
            </MobileView>
            { connectError }
        </div>
    )
}