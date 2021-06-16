import React from 'react'
import { Form, Field } from 'react-final-form'
import ConnectButton from './ConnectButton'

export default function SubmissionForm() {
    const onSubmit = async values => {
        alert(JSON.stringify(values))
    }

    const required = value => (value ? undefined : 'This field is required.')
    const mustBeNumber = value => (isNaN(value) ? 'This field must be a number.' : undefined)
    const nameValidator = value => ((/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(value)) ? undefined : 'This field must consist of letters only.')
    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return (
        <div className="div__form-container">
            <h3>Welcome to XStarter</h3>
            <Form
                onSubmit={onSubmit}
                mutators={{
                    setEthAddress: ([field='eth_address', value], state, { setIn, changeValue }) => {
                        changeValue(state, field, () => value)
                    }
                }}
                render={({ handleSubmit, form, submitting, pristine, values }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <ConnectButton connectionCallback={value => form.mutators.setEthAddress(undefined, value)}/>
                            <div className="div__field-container">
                                <Field
                                    validate={composeValidators(required, nameValidator)}
                                    name="name"
                                    component="input"
                                >
                                    {({ input, meta }) => (
                                        <>
                                            <input {...input} type="text" placeholder="Name" />
                                            { meta.error && meta.touched && 
                                                <div className="div__form-errors">
                                                    <span className="error">{meta.error}</span>
                                                </div>
                                            }
                                        </>
                                    )}
                                </Field>
                            </div>
                            <div className="div__field-container">
                                <Field
                                    validate={composeValidators(required, nameValidator)}
                                    name="surname"
                                    component="input"
                                >
                                    {({ input, meta }) => (
                                        <>
                                            <input {...input} type="text" placeholder="Surname" />
                                            { meta.error && meta.touched && 
                                                <div className="div__form-errors">
                                                    <span className="error">{meta.error}</span>
                                                </div>
                                            }
                                        </>
                                    )}
                                </Field>
                            </div>
                            <div className="div__field-container">
                                <Field
                                    validate={required}
                                    name="eth_address"
                                    component="input"
                                >
                                {({ input, meta }) => (
                                    <>
                                        <input {...input} disabled type="text" placeholder="ETH address" />
                                        { meta.error && meta.touched && 
                                            <div className="div__form-errors">
                                                <span className="error">{meta.error}</span>
                                            </div>
                                        }
                                    </>
                                )}
                                </Field>
                            </div>
                            <div className="div__field-container">
                                <Field
                                    validate={composeValidators(required, mustBeNumber)}
                                    name="want_to_invest"
                                    component="input"
                                >
                                    {({ input, meta }) => (
                                        <>
                                            <input {...input} type="number" placeholder="Amount to invest (ETH)" />
                                            { meta.error && meta.touched && 
                                                <div className="div__form-errors">
                                                    <span className="error">{meta.error}</span>
                                                </div>
                                            }
                                        </>
                                    )}
                                </Field>
                            </div>
                            <div className="div__field-container">
                                <div className="div__twitter-info">
                                    <div>
                                        <span>Subscribe to our Twitter and repost the pinned post.</span>
                                    </div>
                                    <div>
                                        <button type="button" className="button__outline">Twitter</button>
                                    </div>
                                </div>
                                <Field
                                    name="twitter"
                                    component="input"
                                    type="text"
                                    placeholder="Twitter username"
                                />
                            </div>
                            <div className="div__field-container">
                                <div className="div__telegram-info">
                                    <span>Subscribe to our <a href="#" target="_blank" rel="noopener noreferrer">Telegram channel</a> and <a target="_blank" rel="noopener noreferrer" href="#">chat</a>.</span>
                                </div>
                                <Field
                                    name="telegram"
                                    component="input"
                                    type="text"
                                    placeholder="Telegram username"
                                />
                            </div>
                            <div className="div__submission-buttons">
                                <button className="button__filled button__join-whitelist" type="submit" disabled={submitting || pristine}>
                                    Join whitelist
                                </button>
                            </div>
                        </form>
                    )
                }}
            />
        </div>
    )
}
