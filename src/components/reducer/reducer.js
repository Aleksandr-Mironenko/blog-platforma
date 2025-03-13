const initialState = {
  authorized: false,
  error: false,
  loading: false,
  userName: '',
  userPhoto: '',
  emailAddress: '',
  token: '',
  bio: '',
  page: 1,
  pageQty: 5,
  posts: [],
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PUSH_POSTS': {
      return { ...state, posts: [...action.posts] }
    }
    case 'ERROR_FETCH': {
      return { ...state, error: true }
    }
    case 'LOAD_START': {
      return { ...state, loading: true }
    }
    case 'LOAD_END': {
      return { ...state, loading: false }
    }
    case 'CHANGE_PAGE': {
      return { ...state, page: action.page }
    }
    case 'CHANGE_PAGEQTY': {
      return { ...state, pageQty: action.pageQty }
    }
    case 'AVTORIZED': {
      return {
        ...state,
        authorized: true,

        emailAddress: action.email,
        token: action.token,
        userName: action.username,
      }
    }
    case 'LOGIN': {
      console.log(action)
      return {
        ...state,
        authorized: true,

        emailAddress: action.email,
        token: action.token,
        userName: action.username,
        bio: action.bio,
        userPhoto: action.image,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        authorized: false,

        emailAddress: '',
        token: '',
        userName: '',
        bio: '',
        userPhoto: '',
      }
    }
    default:
      return { ...state }
  }
}

export default reducer
