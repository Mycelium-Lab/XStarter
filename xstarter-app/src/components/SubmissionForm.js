import React from 'react'
import { Form, Field } from 'react-final-form'

export default function SubmissionForm() {
    const onSubmit = async values => {

    }

    return (
        <div className="div__form-container">
            <h3>Welcome to XStarter</h3>
            <Form
                onSubmit={onSubmit}
                initialValues={{ stooge: 'larry', employed: false }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                    <div className="div__field-container">
                        <Field
                            name="name"
                            component="input"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div className="div__field-container">
                        <Field
                            name="surname"
                            component="input"
                            type="text"
                            placeholder="Surname"
                        />
                    </div>
                    <div className="div__field-container">
                        <Field
                            name="eth_address"
                            component="input"
                            type="text"
                            placeholder="Eth address"
                        />
                    </div>
                    <div className="div__field-container">
                        <Field
                            name="want_to_invest"
                            component="input"
                            type="number"
                            placeholder="How much want to invest"
                        />
                    </div>
                    <div className="div__field-container">
                        <div className="div__twitter-info">
                            <div>
                                <span>Subscribe for our Twitter and repost pinned post</span>
                            </div>
                            <div>
                                <button className="button__outline">Twitter</button>
                            </div>
                        </div>
                        <Field
                            name="twitter"
                            component="input"
                            type="text"
                            placeholder="Your twitter account username"
                        />
                    </div>
                    <div className="div__field-container">
                        <div className="div__telegram-info">
                            <span>Subscribe our <a href="#">Telegram channel</a> and <a href="#">chat</a></span>
                        </div>
                        <Field
                            name="telegram"
                            component="input"
                            type="text"
                            placeholder="Your telegram username"
                        />
                    </div>
                    <div className="div__submission-buttons">
                        <button className="button__filled" type="submit" disabled={submitting || pristine}>
                            Join whitelist
                        </button>
                    </div>
                    </form>
                )}
            />
        </div>
    )
}
