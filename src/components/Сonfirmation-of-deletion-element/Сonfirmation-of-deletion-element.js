import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import actions from '../actions'

import arrow from './arrow.svg'
import allert from './allert.png'
import style from './index.module.scss'

const СonfirmationOfDeletionElement = ({ history, id }) => {
  return (
    <div className={style.confirmation_of_deletion_element}>
      <img src={arrow} alt="" className={style.image_arrow} />

      <div className={style.text_buttons}>
        <div className={style.text_element}>
          {/*  картинка и вопрос */}
          <img src={allert} alt="" className={style.image_allert} />
          <div className={style.text}>Are you sure to delete this article?</div>
        </div>
        <div className={style.buttons}>
          <button
            className={style.button}
            onClick={() => {
              history.push(`/articles/${id}`)
            }}
          >
            No
          </button>
          <button
            className={style.button}
            onClick={() => {
              history.push('/articles')
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({ store: state })
export default withRouter(connect(mapStateToProps, actions)(СonfirmationOfDeletionElement))
