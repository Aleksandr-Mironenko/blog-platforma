import { format, parseISO } from 'date-fns'
const baseurl = 'https://blog-platform.kata.academy/api/'

export const pushPosts = (posts) => ({ type: 'PUSH_POSTS', posts })
export const loadEnd = () => ({ type: 'LOAD_END' })
export const loadStart = () => ({ type: 'LOAD_START' })
export const errorFetch = () => ({ type: 'ERROR_FETCH' })
export const changePage = (page) => ({ type: 'CHANGE_PAGE', page })
export const isAvtorized = (dataUser) => ({
  type: 'AVTORIZED',
  email: dataUser.email,
  token: dataUser.token,
  username: dataUser.username,
})

export const logOut = () => ({ type: 'LOGOUT' })

export const login = (dataUser) => {
  console.log(dataUser)
  return {
    type: 'LOGIN',
    email: dataUser.user.email,
    token: dataUser.user.token,
    username: dataUser.user.username,
    bio: dataUser.user.bio ? dataUser.user.bio : '',
    image: dataUser.user.image ? dataUser.user.image : '',
  }
}

export const addPost = (post) => {
  // передать серверу post
  // получить с сервера новые данные и отобразить getPosts
}

const formatter = (array) => {
  return array.map((item, index) => {
    return {
      authorUserName: item.author.username,
      authorImage: item.author.image,
      authorFollowing: item.author.following,
      id: index,
      title: item.title,
      postAbbreviated: item.description,
      postFull: item.body,
      tagList: item.tagList,
      createdAt: format(parseISO(item.createdAt), 'MMMM d, yyyy'),
      updatedAt: format(parseISO(item.updatedAt), 'MMMM d, yyyy'),
      favorited: item.favorited,
      favoritesCount: item.favoritesCount,
    }
  })
}
export const createAccount = (dataUser) => {
  // передать серверу dataUser данные нового пользователя
  // получить с сервера новые данные и отобразить getPosts
}

export const newUser = (data, retries = 5) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseurl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: data }),
      })

      if (!response.ok) {
        throw new Error()
      } else {
        const content = await response.json()
        //         user
        // :
        // email
        // :
        // "sadadca11@mail.ru"
        // token
        // :
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDFlNDdjNzhkNDEwMWIwMDgyZTAyOCIsInVzZXJuYW1lIjoidXNlcm5hbWUxMjMxMSIsImV4cCI6MTc0Njk5Mjc2NCwiaWF0IjoxNzQxODA4NzY0fQ.9LOs6F3FDnV-f0Rb-eYsQ-r6MhtrQBnloE_QLQ3dhY4"
        // username
        // :
        // "username12311"
        console.log(content)
        dispatch(isAvtorized(content))
      }
    } catch (error) {
      if (retries <= 0) {
        // dispatch(loadEnd())
        console.log(error.message)
        dispatch(errorFetch(error.message))

        return
      }
      dispatch(newUser(data, retries - 1))
    }
  }
}
export const saveUserData = (data, retries = 5) => {
  return async (dispatch) => {
    console.log(data)
    console.log(
      JSON.stringify({
        password: data.password,
        email: data.emailAddress,
        username: data.userName,
        bio: data.bio || 'I work at State Farm.',
        image: data.userPhoto || null,
      })
    )
    if (retries <= 0) {
      // dispatch(loadEnd())
      dispatch(errorFetch())
      return
    }
    try {
      const response = await fetch(`${baseurl}user`, {
        method: 'PUT',
        headers: {
          Authorization: `${data.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.emailAddress,
          username: data.userName,
          bio: data.bio || 'I work at State Farm.',
          image: data.userPhoto || null,
        }),
      })
      if (!response.ok) {
        throw new Error()
      } else {
        const content = await response.json()
        console.log(content)
        // dispatch(login(content))
      }
    } catch (error) {
      dispatch(saveUserData(data, retries - 1))
    }
  }
}
// передать серверу data измененные данные пользователя
// получить с сервера новые данные и отобразить getPosts

//
//
//
export const oldUser = (data, retries = 5) => {
  return async (dispatch) => {
    if (retries <= 0) {
      // dispatch(loadEnd())
      dispatch(errorFetch())
      return
    }
    try {
      const response = await fetch(`${baseurl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { email: data.emailAddress, password: data.password } }),
      })

      if (!response.ok) {
        throw new Error()
      } else {
        const content = await response.json()
        console.log(content)
        dispatch(login(content))
      }
    } catch (error) {
      dispatch(newUser(data, retries - 1))
    }
  }
}

export const getPosts = (page, retries = 5) => {
  return async (dispatch) => {
    if (retries <= 0) {
      dispatch(loadEnd())
      dispatch(errorFetch())
      return
    }

    try {
      const searchContent = await fetch(`${baseurl}/articles?limit=5&offset=${(page - 1) * 5}`)

      if (!searchContent.ok) {
        throw new Error()
      } else {
        const content = await searchContent.json()
        console.log(content.articles)
        const posts = formatter(content.articles)
        console.log(posts)
        dispatch(pushPosts(posts))
      }
    } catch (error) {
      dispatch(getPosts(page, retries - 1)) //
    }
  }
}

// async (dispatch) => {
//   if (retries <= 0) {
//     dispatch(loadEnd())
//     dispatch(errorFetch())
//     return
//   }
// }
