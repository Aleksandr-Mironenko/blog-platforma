import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from '../actions'

import style from './index.module.scss'

const Error = ({ history, errorFetch }) => {
  const noError = (event) => {
    event.preventDefault()
    errorFetch(false)
    history.push('/articles')
  }
  return (
    <div className={style.error}>
      <div className={style.text}>Произошла ошибка. Попробуйте обновить страницу</div>
      <button type="button" className={style.button_noError} onClick={noError}>
        Вернуться в начало
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })
export default withRouter(connect(mapStateToProps, actions)(Error))
