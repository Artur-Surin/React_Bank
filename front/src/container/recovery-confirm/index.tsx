import { useReducer } from "react";
import "./index.css"

import Page from "../../page/index";
import Button from "../../component/buttons";
import ArrowBack from "../../component/back-button";
import Header from "../../component/header";
import Field from "../../component/field";
import Alert from "../../component/alert-message";
import Section from "../../component/section";
import { validate, initialState, SET, reducer } from "../../util/form";

interface RecoveryConfirmProps {
    children: React.ReactNode;
}

const RecoveryConfirm: React.FC<RecoveryConfirmProps> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handlePassInput = (e: any) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_P, payload: errorMessage });
    };

    const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_CODE, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_CODE, payload: errorMessage });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { code, password } = state;

        const codeError = validate(code);
        const passwordError = validate(password, "password");

        if (codeError || passwordError) {
            dispatch({ type: SET.SET_MESSAGE_DATA, payload: "Please fix the errors before submitting" })
        }

        const convertData = JSON.stringify({ code, password, getInfo: window.navigator.userAgent })

        try {
            const res = await fetch("http://localhost:4000/recovery-confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: convertData,
            });

            const data = await res.json()
            if (!res.ok && data.field === "data") {
                dispatch({ type: SET.SET_MESSAGE_DATA, payload: data.message });
                return;
            } else if (res.ok) {
                window.location.assign("/signin");
            }

        } catch (e: any) {
            console.error(e.message)
        }
    }

    const handlePassVisibility = () => {
        dispatch({ type: SET.TOGGLE_VISIBILITY });
    };

    return (
        <Page>
            <Section>
                <ArrowBack path="/balance"/>

                <Header title="Recover password" text="Write the code you received" />

                <form method="POST" onSubmit={handleSubmit}>
                    <div className="field__wrapper">
                        <Field
                            onInput={handleCodeInput}
                            label="Code"
                            alert={state.messageCode}
                            placeholder="Enter your code"
                            type="text"
                            value={state.code}
                            style={{ borderColor: state.messageCode ? 'rgb(217, 43, 73)' : '' }}
                        ></Field>
                        <Field
                            onInput={handlePassInput}
                            label="New password"
                            placeholder="Enter Your Email"
                            alert={state.messageP}
                            type="password"
                            value={state.password}
                            style={{ borderColor: state.messageP ? 'rgb(217, 43, 73)' : '' }}
                            showPass={state.showPassword}
                            onPassVisibility={handlePassVisibility}
                        ></Field>

                        <Button
                            type="submit"
                            className="button button--primary"
                        >
                            Restore password
                        </Button>

                        <Alert
                            className={`alert--warn ${state.messageData}disabled`}
                        >
                            {state.messageData}
                        </Alert>
                    </div>
                </form>
            </Section>
        </Page>
    )
}

export default RecoveryConfirm;