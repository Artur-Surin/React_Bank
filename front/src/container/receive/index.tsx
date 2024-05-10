import React, { useReducer } from "react";
import "./index.css";

import Page from "../../page";
import AccountHeader from "../../component/account-header";
import Section from "../../component/section";
import ArrowBack from "../../component/back-button";
import Field from "../../component/field";
import Divider from "../../component/divider";
import Alert from "../../component/alert-message";
import List from "../../component/list";
import { SET, reducer, initialState, validate } from "../../util/form";

interface receiveProps {
    children: React.ReactNode
}

const Receive: React.FC<receiveProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_AMOUNT, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_SUM, payload: errorMessage });
    }

    const handleItemClick = async (source: string) => {
        const { amount } = state;
        if (!amount) {
            dispatch({ type: SET.SET_MESSAGE_SUM, payload: "Enter amount" });
            return;
        }

        const data = { amount, source, type: "receive" };
        const convertData = JSON.stringify(data);

        try {
            const res = await fetch("http://localhost:4000/receive", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: convertData,
            })

            const data = await res.json()
            if (!res.ok && data.field === "field") {
                dispatch({ type: SET.SET_MESSAGE_DATA, payload: data.message });
                return;
            } else if (res.ok) {
                const move = window.confirm("Are u sure ?")

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
                
                <AccountHeader title="Receive">
                    <ArrowBack />
                </AccountHeader>

                <div className="receive__payment">
                    <p className="receive__subtitle">Receive amount</p>
                    <Field
                        placeholder="Amount"
                        type="number"
                        alert={state.messageSum}
                        value={state.amount}
                        onInput={handleInput}
                        style={{ borderColor: state.messageSum ? "rgb(217, 43, 73)" : "" }}
                    />

                    <Alert className={`alert--warn ${state.messageData}disabled`}>
                        {state.messageData}
                    </Alert>

                </div>

                <Divider />

                <div className="receive__payment">
                    <p className="receive__subtitle">Payment system</p>

                    <List
                        className="stripe"
                        title="Stripe"
                        info=""
                        style={{ backgroundImage: `url("../../../svg/group-1.svg")`, width: "160px", height: "20px", zIndex: "2" }}
                        onItemClick={() => handleItemClick("Stripe")}
                    />
                    <List
                        className="coinbase"
                        title="Coinbase"
                        info=""
                        style={{ backgroundImage: `url("../../../svg/group-2.svg")`, width: "160px", height: "20px", zIndex: "2" }}
                        onItemClick={() => handleItemClick("Coinbase")}
                    />
                </div>
           
            </Section>
        </Page>
    )
}

export default Receive;