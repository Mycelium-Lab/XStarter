import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import ConnectButton from './ConnectButton'
import Loading from './Loading'
import StyledAlert from './StyledAlert'
import Airtable from 'airtable'

export default function SubmissionForm() {
    const _fields = ['name', 'surname', 'eth_address', 'want_to_invest', 'twitter', 'telegram']

    const createAirTablePayload = values => ({
        ...values,
        want_to_invest: values.want_to_invest ? parseFloat(values.want_to_invest) : 0,
        twitter: values.twitter ? `https://twitter.com/${values.twitter}` : null,
        telegram: values.telegram ? `https://t.me/${values.telegram}` : null
    })

    const [submissionStatusComponent, changeSubmissionStatusComponent] = useState(null)
    const createSubmissionStatusComponent = (msg, severity) => <StyledAlert severity={severity}>{msg}</StyledAlert>

    const onSubmit = async (values, form) => {
        let base 
        try {
            base = new Airtable({
                apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
            }).base(process.env.REACT_APP_AIRTABLE_DB_NAME)
        } catch {
            changeSubmissionStatusComponent(
                createSubmissionStatusComponent(
                    'Cannot connect to our database. Please refresh the page to try again.',
                    'danger'
                )
            )
        }
        await base(process.env.REACT_APP_AIRTABLE_TABLE_NAME)
            .create(createAirTablePayload(values))
            .then(() => {
                changeSubmissionStatusComponent(
                    createSubmissionStatusComponent(
                        'Thank you! Your request has been successfully submitted.',
                        'success'
                    )
                )
                form.reset()
                _fields.forEach(e => {
                    if (e === 'eth_address') form.mutators.setEthAddress(undefined, values.eth_address)
                    else form.resetFieldState(e)
                })
            })
            .catch(() => {
                changeSubmissionStatusComponent(
                    createSubmissionStatusComponent(
                        'An error occured while processing your request. Please refresh the page to try again.',
                        'danger'
                    )
                )
            })
    }

    const required = value => (value ? undefined : 'Please fill in this mandatory field.')
    const requiredETHAddress = value => (value ? undefined : 'Please connect your wallet.')
    const mustBeNumber = value => (isNaN(value) ? 'Please enter a number.' : undefined)
    const mustBeGreaterThanZero = value => (value <= 0 ? 'Please enter a number greater than 0.' : undefined)
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
                // initialValues={initValues}
                render={({ handleSubmit, form, submitting, pristine, values }) => {
                    return (
                        <form onSubmit={async e => await handleSubmit(e, form)}>
                            <ConnectButton connectionCallback={value => form.mutators.setEthAddress(undefined, value)}/>
                            <div className="div__field-container">
                                <Field
                                    validate={composeValidators(required, nameValidator)}
                                    name="name"
                                    component="input"
                                >
                                    {({ input, meta }) => (
                                        <>
                                            <input {...input} type="text" placeholder="Name *" />
                                            { meta.error && meta.touched &&
                                                <div className="div__form-errors">
                                                    <span className="status-error">{meta.error}</span>
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
                                            <input {...input} type="text" placeholder="Surname *" />
                                            { meta.error && meta.touched && 
                                                <div className="div__form-errors">
                                                    <span className="status-error">{meta.error}</span>
                                                </div>
                                            }
                                        </>
                                    )}
                                </Field>
                            </div>
                            <div className="div__field-container">
                                <Field
                                    validate={requiredETHAddress}
                                    name="eth_address"
                                    component="input"
                                >
                                {({ input, meta }) => (
                                    <>
                                        <input {...input} disabled type="text" placeholder="ETH address *" />
                                        { meta.error && meta.touched && 
                                            <div className="div__form-errors">
                                                <span className="status-error">{meta.error}</span>
                                            </div>
                                        }
                                    </>
                                )}
                                </Field>
                            </div>
                            <div className="div__field-container">
                                <Field
                                    validate={composeValidators(required, mustBeNumber, mustBeGreaterThanZero)}
                                    name="want_to_invest"
                                    component="input"
                                >
                                    {({ input, meta }) => (
                                        <>
                                            <input {...input} type="number" placeholder="Amount to invest (ETH) *" />
                                            { meta.error && meta.touched && 
                                                <div className="div__form-errors">
                                                    <span className="status-error">{meta.error}</span>
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
                            <div className="div__submission-details">
                                { submissionStatusComponent || 
                                    <button className="button__filled button__join-whitelist" type="submit" disabled={submitting}>
                                        { submitting ? <Loading/> : 'Join whitelist' }
                                    </button>
                                }
                            </div>
                        </form>
                    )
                }}
            />
        </div>
    )
}
