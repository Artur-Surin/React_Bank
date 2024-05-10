import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import "./index.css"

import Page from "../../page/index";
import Header from "../../component/header"
import ArrowBack from "../../component/back-button";
import Button from "../../component/buttons";
import Field from "../../component/field";
import Alert from "../../component/alert-message";
import Section from "../../component/section";

import { saveSession } from "../../util/session";
import { validate, reducer, initialState, SET } from "../../util/form"


interface SignUpPage {
	children: React.ReactNode;
}

const SignUp: React.FC<SignUpPage> = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value, 'email');
		dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_E, payload: errorMessage });
	}

	const handlePassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value, 'password');
		dispatch({ type: SET.SET_PASSWORD, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_P, payload: errorMessage });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email, password } = state;

		const emailError = validate(email, 'email');
		const passwordError = validate(password, 'password');

		if (emailError || passwordError) {
			dispatch({ type: SET.SET_MESSAGE_DATA, payload: 'Please fix the errors before submitting.' });
			return;
		}
		const convertData = JSON.stringify({ email, password })

		try {
			const res = await fetch('http://localhost:4000/signup', {
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
			} else if (!res.ok && data.field === 'email') {
				dispatch({ type: SET.SET_MESSAGE_E, payload: data.message });
				return;
			} else if (!res.ok && data.field === 'password') {
				dispatch({ type: SET.SET_MESSAGE_P, payload: data.message });
				return;
			} else if (res.ok) {
				saveSession(data.initSession);
				window.location.assign("/signup-confirm");
			}

		} catch (err: any) {
			console.error(err.message)
		}
	}

	const handlePassVisibility = () => {
		dispatch({ type: SET.TOGGLE_VISIBILITY });
	};

	return (
		<Page>
			<Section>
				<ArrowBack path="/"/>

				<Header title="Sign Up" text="Choose a registration method" />

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
							Already have an account? <Link to="/signin"><span className="text--purple">Sign In</span></Link>
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

export default SignUp;