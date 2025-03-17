import { connect } from 'react-redux'
import { useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import actions from '../actions'

import style from './index.module.scss'

const ProfileUser = ({ store, saveUserData, history }) => {
  const { userName, emailAddress, userPhoto, token, password, authorized } = store

  const [userNamee, setUserName] = useState(userName)
  const [emailAddresss, setEmailAddress] = useState(emailAddress)
  const [passwordd, setPassword] = useState('')
  const [userPhotoo, setUserPhoto] = useState(userPhoto)

  const saving = (event) => {
    event.preventDefault()
    saveUserData({
      userName,
      emailAddress,
      password: passwordd || password,
      userPhoto,
      token: token,
    })
    history.push('/articles')
  }
  console.log(authorized)
  if (!authorized) {
    return <Redirect to="/articles" />
  }

  return (
    <div className={style.edit_profile_body}>
      <form className={style.edit} onSubmit={saving}>
        <div className={style.edit_profile}>Edit Profile</div>

        <label htmlFor="username" className={style.edit_label}>
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          value={userNamee}
          onChange={(e) => setUserName(e.target.value)}
          className={style.edit_input}
          autoComplete="uername"
        />

        <label htmlFor="emailAddress" className={style.edit_label}>
          Email address
        </label>
        <input
          type="text"
          id="emailAddress"
          placeholder="Email address"
          name="emailAddress"
          value={emailAddresss}
          onChange={(e) => setEmailAddress(e.target.value)}
          className={style.edit_input}
          autoComplete="email"
        />

        <label htmlFor="newPassword" className={style.edit_label}>
          New password
        </label>
        <input
          type="password"
          id="newPassword"
          placeholder="New password"
          name="newPassword"
          value={passwordd}
          onChange={(e) => setPassword(e.target.value)}
          className={style.edit_input}
          autoComplete="new password"
        />

        <label htmlFor="avatar" className={style.edit_label}>
          Avatar image (url)
        </label>
        <input
          type="text"
          id="avatar"
          placeholder="Avatar image"
          name="avatar"
          value={userPhotoo}
          onChange={(e) => setUserPhoto(e.target.value)}
          className={style.edit_input}
          autoComplete="url"
        />

        <button type="submit" className={style.button_save}>
          Save
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })
export default withRouter(connect(mapStateToProps, actions)(ProfileUser))
