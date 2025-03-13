import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import actions from '../actions'

import style from './index.module.scss'

const SignIn = ({ inlogin, history, oldUser, getPosts }) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    oldUser({
      emailAddress,
      password,
    })
    getPosts()
    history.push('/articles')

    // history.push('/')
  }

  return (
    <div className={style.signIn_body}>
      <form className={style.signIn} onSubmit={login}>
        <div className={style.head}>Sign In</div>

        <label htmlFor="emailAddress" className={style.label}>
          Email address
        </label>
        <input
          autoComplete="email"
          required
          type="text"
          id="emailAddress"
          placeholder="Email address"
          name="emailAddress"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          className={style.input}
        />

        <label htmlFor="password" className={style.label}>
          Password
        </label>
        <input
          required
          autoComplete="current-password"
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />

        <button type="submit" className={style.button_login}>
          Login
        </button>
        <div className={style.not_account}>
          <p className={style.not_account_text}>Don’t have an account?</p>
          <Link to="/sign-up" className={style.not_account_link}>
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })
// export default connect(mapStateToProps, actions)(SignIn)
export default withRouter(connect(mapStateToProps, actions)(SignIn))
