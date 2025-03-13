//
// import { withRouter } from 'react-router-dom'
// / и /articles - список всех статей. При клике на заголовок - переход на страницу статьи. Кнопка лайка не активна, т.к. мы не авторизованы.
// /articles/{slug} Просмотр статьи с полным текстом.

// /sign-in - Страница входа.
// /sign-up - Страница регистрации.
// /profile - Страница редактирования информации пользователя (см. метод Update User). Переход на эту страницу происходит по клике на имени-аватарке в шапке.

// /new-article - Страница создания статьи. При переходе по этой ссылке без аутентификации - перебрасывает на страницу логина (см. паттерн Private Route)
// /articles/{slug}/edit - Страница редактирования статьи.
//

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import СonfirmationOfDeletionElement from '../Сonfirmation-of-deletion-element'
import BodyBlog from '../Body-blog'
import actions from '../actions'
import BlogFullElement from '../Blog-full-element'
import BlogFullElementAuthorized from '../Blog-full-element-authorized'
import CreateBlogElement from '../Create-blog-element'
import EditBlogElement from '../Edit-blog-element'
import ProfileUser from '../Profile-user'
import SignUp from '../Sign-up'
import SignIn from '../Sign-in'
import Head from '../Head'

import style from './index.module.scss'

const App = ({ store, getPosts }) => {
  const { authorized, posts, page } = store
  authorized ? console.log('Залогинен') : console.log('Не залогинен')
  //  условие если залогинен то отображаем 2 компонента типо выход и морду  или  если не залогинен вход

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts(page)
    }
    fetchPosts()
  }, [getPosts, page])

  return (
    <Router>
      <div className={style.app}>
        <Head />

        <Route path="/articles" exact component={BodyBlog} />
        <Route
          path="/articles/:id"
          exact
          render={({ match }) => {
            const id = match.params.id
            return store.authorized ? <BlogFullElementAuthorized {...posts[id]} /> : <BlogFullElement {...posts[id]} />
          }}
        />
        <Route
          path="/articles/:id/edit"
          render={({ match }) => {
            const id = match.params.id
            return posts[id] && authorized ? <EditBlogElement {...posts[id]} /> : <SignIn />
          }}
        />
        <Route path="/profile" component={ProfileUser} />

        <Route path="/new-article" component={CreateBlogElement} />

        <Route path="/sign-in" component={SignIn} />

        <Route path="/sign-up" component={SignUp} />
        {/* <BlogFullElementAuthorized {...posts[3]} /> */}

        <Route
          path="/articles/:id/delete"
          exact
          render={({ match }) => {
            const id = match.params.id
            return (
              <>
                {authorized ? (
                  <>
                    <BlogFullElementAuthorized {...posts[id]} />
                    <СonfirmationOfDeletionElement {...posts[id]} />
                  </>
                ) : (
                  <BlogFullElement {...posts[id]} />
                )}
              </>
            )
          }}
        />
      </div>
    </Router>
  )
}
const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(App)
