import React, { useReducer } from "react";
import "./index.css";

import Page from "../../page";
import Header from "../../component/header";
import Button from "../../component/buttons";
import Alert from "../../component/alert-message";
import Field from "../../component/field";
import ArrowBack from "../../component/back-button";
import Section from "../../component/section";

import { validate, initialState, SET, reducer } from '../../util/form';

interface RecoveryProps {
	children: React.ReactNode;
}

const Recovery: React.FC<RecoveryProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const errorMessage = validate(e.target.value, "email");
		dispatch({ type: SET.SET_EMAIL, payload: e.target.value });
		dispatch({ type: SET.SET_MESSAGE_E, payload: errorMessage });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email } = state;
		const convertData = JSON.stringify({ email })

		try {
			const res = await fetch('http://localhost:4000/recovery', {
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
			} else if (res.ok) {
				window.location.assign("/recovery-confirm");
			}
		} catch (err: any) {
			console.error(err.message)
		}
	}

	return (
		<Page>
			<Section>
				<ArrowBack />
				<Header title="Recover password" text="Choose a recovery method" />

				<form method="POST" onSubmit={handleSubmit}>
					<div className="field__wrapper">
						<Field
							onInput={handleMailInput}
							label="Email"
							placeholder="Enter your email"
							alert={state.messageE}
							type="email"
							value={state.email}
							style={{ borderColor: state.messageE ? 'rgb(217, 43, 73)' : '' }}
						></Field>

						<Button
							type="submit"
							className="button button--primary"
						>
							Send Code
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

export default Recovery;