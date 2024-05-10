export const SESSION_KEY: string = 'sessionAuth'

interface Session {
	token: string;
}

export const saveSession = (session: Session): void => {
  try {
    (window as any).session = session
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session),
    )
  } catch (error) {
    (window as any).session = null
  }
}

export const loadSession = (): void => {
  try {
    const session: Session | null = JSON.parse(
      (localStorage as any).getItem(SESSION_KEY),
    )

    if (session) {
		(window as any).session = session
    } else {
		(window as any).session = null
    }
  } catch (error) {
    (window as any).session = null
  }
}

export const getTokenSession = (): string | null => {
  try {
    const session: Session | null = getSession()

    return session ? session.token : null
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getSession = (): Session | null => {
  try {
    const session: Session | null =
      JSON.parse((localStorage as any).getItem(SESSION_KEY)) 
	  || (window as any).session

    return session || null
  } catch (er) {
    console.log(er)
    return null
  }
}