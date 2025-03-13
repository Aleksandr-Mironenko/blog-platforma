import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import actions from '../actions'

import style from './index.module.scss'

const SignUp = ({ store, createAccount, history, newUser, getPosts }) => {
  const [username, setUserName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [rpassword, setRpassword] = useState('')
  const [agree, setAgree] = useState(true)

  const clickCreate = (event) => {
    event.preventDefault()
    newUser({
      username: username,
      email: emailAddress,
      password: password,
    })
    getPosts()
    history.push('/articles')
  }
  const checkLength = password.length < 6 && password.length > 0
  const checkAll = checkLength || rpassword !== password

  return (
    <div className={style.signUp_body}>
      {/* <div className={style.signUp}> */}
      <form className={style.signUp} onSubmit={clickCreate}>
        <div className={style.head}>Create new account</div>
        <label htmlFor="username" className={style.label}>
          Username
        </label>
        <input
          required
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className={style.input}
          autoComplete="Username"
        />
        <label htmlFor="emailAddress" className={style.label}>
          Email address
        </label>
        <input
          autoComplete="email"
          required
          type="email"
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
          className={checkLength ? style.input_false : style.input}
        />
        {checkLength && 'Your password needs to be at least 6 characters'}
        <label htmlFor="repeatPassword" className={style.label}>
          Repeat Password
        </label>
        <input
          required
          autoComplete="current-password"
          type="repeatPassword"
          id="repeatPassword"
          placeholder="Repeat Password"
          name="repeatPassword"
          value={rpassword}
          onChange={(e) => setRpassword(e.target.value)}
          className={checkAll ? style.input_false : style.input}
        />
        {checkAll && 'Passwords must match'}
        <div className={style.agree_block}>
          <input
            name="agree"
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(() => !agree)}
            onClick={() => setAgree(() => !agree)}
            className={style.input_agree}
          />

          <div className={style.agreeText}>I agree to the processing of my personal information</div>
        </div>
        <button disabled={checkAll || checkLength || !agree} type="submit" className={style.buttton_create}>
          Create
        </button>
        <div className={style.account}>
          <p className={style.account_text}>Already have an account? </p>
          <Link to="/sign-in" className={style.account_link}>
            Sign In.
          </Link>
        </div>
      </form>
      {/* </div> */}
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })
// export default connect(mapStateToProps, actions)(SignUp)

export default withRouter(connect(mapStateToProps, actions)(SignUp))
