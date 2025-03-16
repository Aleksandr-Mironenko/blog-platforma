import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import actions from '../actions'
import HeaderLogIn from '../Header-log-in'
import HeaderLogOut from '../Header-log-out'

import style from './index.module.scss'

const Head = ({ store, history, getPosts }) => {
  const { page, authorized } = store

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts(page)
    }
    fetchPosts()
  }, [getPosts, page])

  const headerUser = authorized ? <HeaderLogIn /> : <HeaderLogOut />

  return (
    <header className={style.header}>
      <div
        className={style.left}
        onClick={() => {
          history.push('/articles')
        }}
      >
        Realworld Blog
      </div>
      <div className={style.right}>{headerUser}</div>
    </header>
  )
}

const mapStateToProps = (state) => ({ store: state })
export default withRouter(connect(mapStateToProps, actions)(Head))
