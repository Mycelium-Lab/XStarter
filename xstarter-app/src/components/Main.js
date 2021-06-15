import React from 'react'
import SubmissionForm from './SubmissionForm'

import '../styles/main.css'


export default function Main() {
    return (
        <div>
            <SubmissionForm/>
            <button className="button__outline button__connect-wallet">Connect Wallet</button>
        </div>
    )
}
