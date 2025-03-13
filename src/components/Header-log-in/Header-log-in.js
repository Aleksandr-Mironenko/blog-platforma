import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import actions from '../actions'

import style from './index.module.scss'

const HeaderLogIn = ({ store, history, logOut }) => {
  return (
    <div className={style.block_user}>
      <button className={style.create} onClick={() => history.push('/new-article')}>
        Create article
      </button>

      <div className={style.profile} onClick={() => history.push('/profile')}>
        <div className={style.author_user_name}>{store.userName}</div>

        <img className={style.author_image} alt="User" src={store.userPhoto} />
      </div>

      <button
        className={style.log_out}
        onClick={() => {
          logOut()
          history.push('/articles')
        }}
      >
        Log Out
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })

export default withRouter(connect(mapStateToProps, actions)(HeaderLogIn))
