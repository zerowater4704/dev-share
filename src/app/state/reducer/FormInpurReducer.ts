interface LoginFormStateType {
  userName: string
  userIamge: string
  email: string
  password: string
  school: string
  languages: string
  position: string
  githubAccount: string
  xAccount: string
}

type Action =
  | { type: 'INIITALIZE'; userData: LoginFormStateType }
  | { type: 'CLEAR' }
  | { type: 'SET_DATA'; name: string; value: string }

export const UserFormReducer = (
  userFormState: LoginFormStateType,
  userFormAction: Action,
): LoginFormStateType => {
  switch (userFormAction.type) {
    case 'INIITALIZE':
      return userFormAction.userData

    case 'SET_DATA':
      return {
        ...userFormState,
        [userFormAction.name]: userFormAction.value,
      }

    case 'CLEAR':
      return {
        userName: '',
        userIamge: '',
        email: '',
        password: '',
        school: '',
        languages: '',
        position: '',
        githubAccount: '',
        xAccount: '',
      }

    default:
      return userFormState
  }
}
