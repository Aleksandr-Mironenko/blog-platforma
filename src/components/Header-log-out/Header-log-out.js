import { withRouter } from 'react-router-dom'

import style from './index.module.scss'

const HeaderLogOut = ({ history }) => {
  return (
    <div className={style.buttons}>
      <button
        className={style.sign_in}
        onClick={() => {
          history.push('/sign-in')
        }}
      >
        Sign In
      </button>
      <button
        className={style.sign_up}
        onClick={() => {
          history.push('/sign-up')
        }}
      >
        Sign Up
      </button>
    </div>
  )
}

export default withRouter(HeaderLogOut)
