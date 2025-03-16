import { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import actions from '../actions'
import AddTag from '../AddTag'

import style from './index.module.scss'

const CreateEditBlogElement = ({
  store,
  history,
  title,
  tagList,
  postAbbreviated,
  slug,
  postFull = '',
  updateArticle,
  createPost,
}) => {
  const [titlee, setTitle] = useState(title ? title : '')
  const [description, setDescription] = useState(postAbbreviated ? postAbbreviated : '')
  const [text, setText] = useState(postFull ? postFull : '')
  const [tags, setTags] = useState(tagList ? tagList : [''])

  const sostTags = (index, value) => {
    setTags([...tags.slice(0, index), value, ...tags.slice(index + 1)])
  }

  const delTags = (index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)])
  }

  const tagss = tags.map((item, index) => {
    return <AddTag key={index} item={item} index={index} sostTags={sostTags} delTags={delTags} />
  })

  const tagsss = tags.filter((item) => item !== '' && item !== ' ')

  const check = title || postAbbreviated || postFull || tagList

  const send = (e) => {
    e.preventDefault()
    const post = {
      title: titlee,

      tagList: tagsss,

      text: text,
      slug: slug,
      description: description,
      token: store.token,
    }
    if (check) {
      updateArticle(post)
    } else {
      createPost(post)
    }

    history.push('/articles')
  }
  if (!store.authorized) {
    return <Redirect to="/articles" />
  }
  return (
    <div className={style.createEditBlogElement}>
      <form onSubmit={send} className={style.blogElement}>
        <div className={style.legend}>{check ? 'Edit article' : 'Create new article'}</div>
        <label htmlFor="title" className={style.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={titlee}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={style.input}
        />
        <label htmlFor="shortDescription" className={style.label}>
          Short description
        </label>
        <input
          type="text"
          id="shortDescription"
          name="shortDescription"
          value={description}
          placeholder="Title"
          onChange={(e) => setDescription(e.target.value)}
          className={style.input}
        />
        <label htmlFor="text" className={style.label}>
          Text
        </label>
        <textarea
          id="text"
          name="text"
          rows="4"
          cols="500"
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          className={style.input}
          value={text}
        />

        <div className={style.tags}>
          <div className={style.label}>Tags</div>

          <div className={style.tags_elems_button}>
            <div className={style.tags_el}>{tagss}</div>
            <button
              type="button"
              onClick={() => {
                setTags([...tags, ''])
              }}
              className={style.button_add}
            >
              Add tag
            </button>
          </div>
        </div>
        <button type="submit" className={style.button_send}>
          Send
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })

export default withRouter(connect(mapStateToProps, actions)(CreateEditBlogElement))

// возможнош разумно сделать разметку <fieldset>
// <legend>User Details</legend>
