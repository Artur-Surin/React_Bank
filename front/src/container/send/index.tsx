import React, { useReducer } from "react";
import "./index.css";

import Page from "../../page";
import AccountHeader from "../../component/account-header";
import ArrowBack from "../../component/back-button";
import Field from "../../component/field";
import Button from "../../component/buttons";
import Alert from "../../component/alert-message";
import Section from "../../component/section";

import { validate, SET, initialState, reducer } from "../../util/form";

interface sendProps {
    children: React.ReactNode;
}

const Send: React.FC<sendProps> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_SOURCE, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_SOURCE, payload: errorMessage })
    }

    const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_AMOUNT, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_SUM, payload: errorMessage })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { source, amount } = state;

        if (!source || !amount) {
            dispatch({ type: SET.SET_MESSAGE_DATA, payload: "Fields must be field before submit" });
            return;
        }

        const data = { source, amount, type: "send" };
        const convertData = JSON.stringify(data);

        try {
            const res = await fetch('http://localhost:4000/send', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: convertData,
            })

            const data = await res.json()

            if (!res.ok && data.field === 'data') {
                dispatch({ type: SET.SET_MESSAGE_DATA, payload: data.message });
                return;
            } else if (res.ok) {
                const move = window.confirm("Are You Sure?")

                if (move) {
                    window.location.assign(`http://localhost:3000/transaction/${data.newTransaction.transactionId}`);
                }
            }

        } catch (e: any) {
            console.error(e.message)
        }
    }

    return (
        <Page>
            <Section>

                <AccountHeader title="Send">
                    <ArrowBack />
                </AccountHeader>

                <form method="POST" onSubmit={handleSubmit}>
                    <div className="form__content">
                        <Field
                            label="Email"
                            placeholder="Email or Username"
                            type="text"
                            alert={state.messageE}
                            value={state.source}
                            onInput={handleEmailInput}
                            style={{ borderColor: state.messageE ? 'rgb(217, 43, 73)' : '' }}
                        ></Field>

                        <Field
                            label="Sum"
                            placeholder="Enter amount"
                            type="number"
                            alert={state.messageSum}
                            value={state.amount}
                            onInput={handleAmountInput}
                            style={{ borderColor: state.messageSum ? 'rgb(217, 43, 73)' : '' }}
                        ></Field>

                        <Button type="submit" className="primary">Send</Button>

                        <Alert className={`alert--warn ${state.messageData}disabled`}>
                            {state.messageData}
                        </Alert>
                    </div>
                </form>
            </Section>
        </Page>
    )
}

export default Send;