export const REG_EXP_EMAIL: RegExp = new RegExp(
	/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  )
  
export const REG_EXP_PASSWORD: RegExp = new RegExp(
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  )
  
export const FIELD_ERROR = {
	IS_EMPTY: 'Enter a value in the field.',
	IS_BIG: 'Value is too long. Remove excess',
	EMAIL: 'Enter a valid email address.',
	PASSWORD:
	  'Password must be at least 8 characters long, including at least 1 digit, lowercase, and uppercase letter.',
};

//=================================================

export const validate = (value: string, type?: string) => {
	if (String(value).trim().length < 1) {
		return FIELD_ERROR.IS_EMPTY
	}

	if (String(value).trim().length > 30) {
	  return FIELD_ERROR.IS_BIG
	}

	if (type === 'email' && !REG_EXP_EMAIL.test(String(value))) {
		return FIELD_ERROR.EMAIL;
	}
  
	if (type === 'password' && !REG_EXP_PASSWORD.test(String(value))) {
		return FIELD_ERROR.PASSWORD;
	}

	return '';
};

//=================================================

interface State {
	email: string;
	password: string;
	code: string;
	amount: string;
	source: string;
	passwordOld: string,
	passwordNew: string,

	messageE: string;
	messageP: string;
	messageCode: string;
	messageSum: string;
	messageSource: string;
	messagePO: string;
	messagePN: string;
	messageData: string;

	showPassword: boolean;
  }
  
  interface Action {
	type: string;
	payload?: any;
  }
  
  export const initialState: State = {
	email: '',
	password: '',
	code: '',
	amount: '',
	source: '',
	passwordOld: '',
	passwordNew: '',

	messageE: '',
	messageP: '',
	messageCode: '',
	messageSum: '',
	messageSource: '',
	messagePO: '',
	messagePN: '',
	messageData: '',

	showPassword: false,
  };

  export const SET = {
	SET_EMAIL: 'SET_EMAIL',
	SET_PASSWORD: 'SET_PASSWORD',
	SET_CODE: 'SET_CODE',
	SET_AMOUNT: 'SET_AMOUNT',
	SET_SOURCE: 'SET_SOURCE',
	SET_PASSWORD_OLD: 'SET_PASSWORD_OLD',
	SET_PASSWORD_NEW: 'SET_PASSWORD_NEW',

	SET_MESSAGE_E: 'SET_MESSAGE_E',
	SET_MESSAGE_P: 'SET_MESSAGE_P',
	SET_MESSAGE_CODE: 'SET_MESSAGE_CODE',
	SET_MESSAGE_SUM: 'SET_MESSAGE_SUM',
	SET_MESSAGE_SOURCE: 'SET_MESSAGE_SOURCE',
	SET_MESSAGE_PASS_OLD: 'SET_MESSAGE_PASS_OLD',
	SET_MESSAGE_PASS_NEW: 'SET_MESSAGE_PASS_NEW',
	SET_MESSAGE_DATA: 'SET_MESSAGE_D',

	TOGGLE_VISIBILITY: 'TOGGLE_VISIBILITY',
  }
  
  export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case SET.SET_EMAIL :
			return { ...state, email: action.payload };
		case SET.SET_PASSWORD:
			return { ...state, password: action.payload };
		case SET.SET_CODE:
			return { ...state, code: action.payload };
		case SET.SET_AMOUNT:
			return { ...state, amount: action.payload };
		case SET.SET_SOURCE:
			return { ...state, source: action.payload };
		case SET.SET_PASSWORD_OLD:
			return { ...state, passwordOld: action.payload };
		case SET.SET_PASSWORD_NEW:
			return { ...state, passwordNew: action.payload };


		case SET.SET_MESSAGE_E:
			return { ...state, messageE: action.payload };
		case SET.SET_MESSAGE_P:
			return { ...state, messageP: action.payload };
		case SET.SET_MESSAGE_CODE:
			return { ...state, messageCode: action.payload };
		case SET.SET_MESSAGE_SUM:
			return { ...state, messageSum: action.payload };
			case SET.SET_MESSAGE_SOURCE:
				return { ...state, messageSource: action.payload };
		case SET.SET_MESSAGE_PASS_OLD:
			return { ...state, messagePO: action.payload };
		case SET.SET_MESSAGE_PASS_NEW:
			return { ...state, messagePN: action.payload };
		case SET.SET_MESSAGE_DATA:
			return { ...state, messageData: action.payload };


		case SET.TOGGLE_VISIBILITY:
			return { ...state, showPassword: !state.showPassword };
		default:
			return {...state};
	}
  };