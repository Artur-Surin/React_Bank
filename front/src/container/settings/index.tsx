import React, { useReducer, useState } from "react";
import "./index.css"

import Page from "../../page";
import AccountHeader from "../../component/account-header";
import ArrowBack from "../../component/back-button";
import Field from "../../component/field";
import Alert from "../../component/alert-message";
import Button from "../../component/buttons";
import Divider from "../../component/divider";
import Section from "../../component/section";

import { SET, reducer, validate, initialState } from "../../util/form";

interface settingsProps {
    children: React.ReactNode
}

const Settings: React.FC<settingsProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isEmailFormFilled, setIsEmailFormFilled] = useState(false);
    const [isPasswordFormFilled, setIsPasswordFormFilled] = useState(false);
    const [activeForm, setActiveForm] = useState("")

    const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value, "email");
        dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_E, payload: errorMessage });
        checkEmailFromField();
    }

    const handlePassConfirmInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_P, payload: errorMessage });
        checkEmailFromField();
    }

    const handlePassOldInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_PASSWORD_OLD, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_PASS_OLD, payload: errorMessage });
        checkPasswordFormFilled();
    }

    const handlePassNewInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validate(e.target.value);
        dispatch({ type: SET.SET_PASSWORD_NEW, payload: e.target.value });
        dispatch({ type: SET.SET_MESSAGE_PASS_NEW, payload: errorMessage });
        checkPasswordFormFilled();
    }

    const checkEmailFromField = () => {
        const isEmailFilled = Boolean(state.email && !state.messageE);
        const isPasswordFilled = Boolean(state.password && !state.messageP);
        setIsEmailFormFilled(isEmailFilled && isPasswordFilled);
    }

    const checkPasswordFormFilled = () => {
        const isPassOldFilled = Boolean(state.passwordOld && !state.messagePO);
        const isPassNewFilled = Boolean(state.passwordNew && !state.messagePN);
        setIsPasswordFormFilled(isPassOldFilled && isPassNewFilled);
    }

    const handleNewEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setActiveForm("email");
        checkEmailFromField();

        const { email, password } = state;

        const emailError = validate(email, "email");
        const passwordError = validate(password, "password");

        if (!email || !password || emailError || passwordError) {
            dispatch({ type: SET.SET_MESSAGE_DATA, payload: "Enter correct data!" })
        }

        const id = JSON.parse(window.localStorage.sessionAuth).user.userId;

        const convertData = JSON.stringify({ currentData: password, typeNewData: "email", newData: email, customerId: id });

        try {
            const res = await fetch("http://localhost:4000/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: convertData,
            })

            const data = await res.json();

            if (!res.ok && data.field === "data") {
                dispatch({ type: SET.SET_MESSAGE_DATA, payload: data.message });
                return;
            } else if (!res.ok && data.field === "password") {
                dispatch({ type: SET.SET_MESSAGE_P, payload: data.message });
                return;
            } else if (res.ok) {
                const move = window.confirm("Are you sure ?");
                if (move) {
                    window.location.assign("/balance");
                }
            }
        } catch (e: any) {
            console.error("Error fetching data", e.message);
        }
    }

    const handleNewPassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setActiveForm("password");
        checkPasswordFormFilled();

        const { passwordOld, passwordNew } = state;

        const passOldError = validate(passwordOld);
        const passNewError = validate(passwordNew, "password");

        if (!passwordOld || !passwordNew || passOldError || passNewError) {
            dispatch({ type: SET.SET_MESSAGE_DATA, payload: "Error, u have to enter correct data" });
        }

        const id = JSON.parse(window.localStorage.sessionAuth).user.userId;
        const convertData = JSON.stringify({ currentData: passwordOld, typeNewData: "password", newData: passwordNew, customerId: id });

        try {
            const res = await fetch("http://localhost:4000/settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: convertData,
            })

            const data = await res.json();

            if (!res.ok && data.field === "data") {
                dispatch({ type: SET.SET_MESSAGE_DATA, payload: data.message });
                return;
            } else if (!res.ok && data.field === "password") {
                dispatch({ type: SET.SET_MESSAGE_P, payload: data.message });
                return;
            } else if (res.ok) {
                const move = window.confirm("Are you sure ?");
                if (move) {
                    window.location.assign("/balance");
                }
            }
        } catch (e: any) {
            console.error(e.message)
        }
    }

    const handleLogOut = () => {
        const move = window.confirm("Are you sure ?");

        if (move) {
            window.localStorage.clear();
            window.location.href = "/";
        }
    }

    const handlePassVisibility = () => {
        dispatch({ type: SET.TOGGLE_VISIBILITY });
    }

    return (
        <Page>
            <Section>
                <AccountHeader title="Settings">
                    <ArrowBack />
                </AccountHeader>

                <form method="POST" onSubmit={handleNewEmailSubmit} className="settings__change">
                    <p className="subtitle">Change email</p>
                    <Field
                        type="email"
                        placeholder="Enter your new Email adress"
                        label="Email"
                        value={state.email}
                        alert={state.messageE}
                        onInput={handleMailInput}
                    />
                    <Field
                        type="password"
                        placeholder="Enter your password"
                        label="Password"
                        value={state.password}
                        alert={state.messageP}
                        onInput={handlePassConfirmInput}
                        showPass={state.showPassword}
                        onPassVisibility={handlePassVisibility}
                    />
                    <Button type="submit"
                        className={`button ${isEmailFormFilled ? "button--primary" : "button--secondary"}`}
                        style={{ padding: "16px 0", fontSize: "14px", fontWeight: "400" }}
                    >
                        Save Email
                    </Button>

                    {
                        activeForm === "email" && (
                            <Alert className={`alert--warn ${state.messageData}disabled`}>
                                {state.messageData}
                            </Alert>
                        )
                    }
                </form>

                <Divider />

                <form method="POST" onSubmit={handleNewPassSubmit} className="settings__change">
                    <p className="subtitle">Change password</p>

                    <Field
                        label="Old Password"
                        placeholder="Enter your old password"
                        type="password"
                        value={state.passwordOld}
                        alert={state.messagePO}
                        onInput={handlePassOldInput}
                        onPassVisibility={handlePassVisibility}
                        showPass={state.showPassword}
                    />
                    <Field
                        label="New Password"
                        placeholder="Enter a new password"
                        type="password"
                        value={state.passwordNew}
                        alert={state.messagePN}
                        onInput={handlePassNewInput}
                        onPassVisibility={handlePassVisibility}
                        showPass={state.showPassword}
                    />

                    <Button type="submit"
                        className={`button ${isPasswordFormFilled ? "button--primary" : "button--secondary"}`}
                        style={{ padding: "16px 0", fontSize: "14px", fontWeight: "400" }}
                    >
                        Save Password
                    </Button>

                    {
                        activeForm === "password" && (
                            <Alert className={`alert--warn ${state.messageData}disabled`}>
                                {state.messageData}
                            </Alert>
                        )
                    }
                </form>

                <Divider />

                <Button onClick={handleLogOut}
                    className="button button--secondary button--alert"
                    style={{ padding: "16px 0", fontSize: "14px", fontWeight: "400" }}
                >
                    Log out
                </Button>

            </Section>
        </Page>
    )
}

export default Settings;