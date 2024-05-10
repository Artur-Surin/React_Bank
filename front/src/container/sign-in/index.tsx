import { useReducer } from "react";
import "./index.css"

import Page from "../../page/index";
import Button from "../../component/buttons";
import ArrowBack from "../../component/back-button";
import Header from "../../component/header";
import Field from "../../component/field";
import Alert from "../../component/alert-message";
import Section from "../../component/section";
import { Link } from "react-router-dom";
import { validate, initialState, SET, reducer } from "../../util/form";
import { saveSession } from "../../util/session";

interface SignInProps {
    children: React.ReactNode;
}

const SignIn: React.FC<SignInProps> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_E, payload: errorMessage });
    };

    const handlePassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_P, payload: errorMessage });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = state;
        const convertData = JSON.stringify({ email, password });

        try {
            const res = await fetch("http://localhost:4000/signin", {
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
            } else if (!res.ok && data.field === "email") {
                dispatch({ type: SET.SET_MESSAGE_E, payload: data.message });
                return;
            } else if (!res.ok && data.field === "password") {
                dispatch({ type: SET.SET_MESSAGE_P, payload: data.message });
                return;
            } else if (res.ok) {
                saveSession(data.session);
                window.location.assign("/balance");
            }

        } catch (e: any) {
            console.error(e)
        }
    }

    const handlePassVisibility = () => {
        dispatch({ type: SET.TOGGLE_VISIBILITY });
    };

    return (
        <Page>
            <Section>
                <ArrowBack path="/"/>

                <Header title="Sign In" text="Select login method" />

                <form method="POST" onSubmit={handleSubmit}>
                    <div className="field__wrapper">
                        <Field
                            onInput={handleMailInput}
                            label="Email"
                            placeholder="Enter Your Email"
                            alert={state.messageE}
                            type="email"
                            value={state.email}
                            style={{ borderColor: state.messageE ? 'rgb(217, 43, 73)' : '' }}
                        ></Field>
                        <Field
                            onInput={handlePassInput}
                            label="Password"
                            alert={state.messageP}
                            placeholder="Enter Your Password"
                            type="password"
                            value={state.password}
                            style={{ borderColor: state.messageP ? 'rgb(217, 43, 73)' : '' }}

                            showPass={state.showPassword}
                            onPassVisibility={handlePassVisibility}
                        ></Field>

                        <p className="text">
                            Forgot your password? <Link to="/recovery"><span className="text--purple">Recovery</span></Link>
                        </p>

                        <Button
                            type="submit"
                            className="button button--primary"
                        >
                            Continue
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

export default SignIn;