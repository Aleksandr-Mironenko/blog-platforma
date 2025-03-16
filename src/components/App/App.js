import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import СonfirmationOfDeletionElement from '../Сonfirmation-of-deletion-element'
import BodyBlog from '../Body-blog'
import actions from '../actions'
import BlogFullElementAuthorized from '../Blog-full-element-authorized'
//
// import CreateBlogElement from '../Create-blog-element'
// import EditBlogElement from '../Edit-blog-element'
//
import CreateEditBlogElement from '../CreateEditBlogElement'
//
import ProfileUser from '../Profile-user'
import SignUp from '../Sign-up'
import SignIn from '../Sign-in'
import Head from '../Head'
import Transition from '../Transition'
import history from '../history'
import Loading from '../Loading'
import Error from '../Error'
import Offline from '../Offline'

import style from './index.module.scss'

const App = ({ store, getPosts, getCookie, listenerOnline, listenerOffline }) => {
  const { authorized, posts, page, loading, offline, error } = store
  authorized ? console.log('Залогинен') : console.log('Не залогинен')
  console.log(loading)
  useEffect(() => {
    getPosts(page)
  }, [getPosts, page])

  useEffect(() => {
    getCookie('token')
  }, [getCookie])

  useEffect(() => {
    listenerOnline()
    listenerOffline()
  }, [listenerOnline, listenerOffline])

  return (
    <Router history={history}>
      {offline ? (
        <Offline />
      ) : (
        <div className={style.app}>
          <Head />
          {error ? (
            <Error />
          ) : loading ? (
            <Loading />
          ) : (
            <Switch>
              <Route path="/profile" exact component={ProfileUser} />

              <Route path="/new-article" exact component={CreateEditBlogElement} />

              <Route path="/sign-in" exact component={SignIn} />

              <Route path="/sign-up" exact component={SignUp} />

              <Route
                path="/articles/:id/edit"
                render={({ match }) => {
                  const id = match.params.id
                  return authorized ? <CreateEditBlogElement {...posts[id]} /> : <Redirect to="/articles" />
                }}
              />
              <Route
                path="/articles/:id/delete"
                exact
                render={({ match }) => {
                  const id = match.params.id

                  return (
                    <>
                      <BlogFullElementAuthorized {...posts[id]} />
                      <СonfirmationOfDeletionElement {...posts[id]} />
                    </>
                  )
                }}
              />

              <Route
                path="/articles/:id"
                exact
                render={({ match }) => {
                  const id = match.params.id
                  return <BlogFullElementAuthorized {...posts[id]} />
                }}
              />
              <Route path="/articles" exact component={BodyBlog} />
              <Route path="/" component={Transition} />
              <Redirect to="/articles" />
            </Switch>
          )}
        </div>
      )}
    </Router>
  )
}
const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(App)
