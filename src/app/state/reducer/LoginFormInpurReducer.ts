export const initialState: LoginFormStateType = {
  errorMessage: '',
  userName: '',
  userImage: '',
  email: '',
  password: '',
  school: '',
  languages: '',
  position: '',
  githubAccount: '',
  xAccount: '',
}

export interface LoginFormStateType {
  errorMessage: string | null
  userName: string
  userImage: string
  email: string
  password: string
  school: string
  languages: string
  position: string
  githubAccount: string
  xAccount: string
}

type Action =
  | { type: 'INITIALIZE'; userData: LoginFormStateType }
  | { type: 'CLEAR' }
  | { type: 'SET_DATA'; name: keyof LoginFormStateType; value: string }

export const UserFormReducer = (
  userFormState: LoginFormStateType = initialState,
  userFormAction: Action,
): LoginFormStateType => {
  switch (userFormAction.type) {
    case 'INITIALIZE':
      return userFormAction.userData

    case 'SET_DATA':
      return {
        ...userFormState,
        [userFormAction.name]: userFormAction.value,
      }

    case 'CLEAR':
      return initialState // 初期状態に戻す

    default:
      return userFormState
  }
}
