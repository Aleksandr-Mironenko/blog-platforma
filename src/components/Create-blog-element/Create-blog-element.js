import { useState } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'

import actions from '../actions'
import AddTag from '../AddTag'

import style from './index.module.scss'

const CreateBlogElement = ({
  store,
  addPost,
  // history
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState([''])
  const sostTags = (index, value) => {
    setTags([...tags.slice(0, index), value, ...tags.slice(index + 1)])
  }

  const delTags = (index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)])
  }

  const tagss = tags.map((item, index) => {
    return <AddTag key={index} item={item} index={index} sostTags={sostTags} delTags={delTags} />
  })
  const sendPost = () => {
    addPost({
      title: title,
      tagList: tags,
      favoritesCount: 0,
      authorUserName: store.userName,
      createdAt: format(new Date(), 'MMMM d, yyyy'),
      authorImage: store.userPhoto,
      authorFollowing: false,
      favorited: false,
      postAbbreviated: description,
      postFull: text,
      updatedAt: format(new Date(), 'MMMM d, yyyy'),
    })
    // history.push('/')
    console.log({
      title: title,
      tagList: tags,
      favoritesCount: 0,
      authorUserName: store.userName,
      createdAt: format(new Date(), 'MMMM d, yyyy'),
      authorImage: store.userPhoto,
      authorFollowing: false,
      favorited: false,
      postAbbreviated: description,
      postFull: text,
      updatedAt: format(new Date(), 'MMMM d, yyyy'),
    })
  }

  return (
    <div className={style.createBlogElement}>
      <div className={style.blogElement}>
        <div className={style.legend}>Create new article</div>
        <label htmlFor="title" className={style.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
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
            <button onClick={() => setTags([...tags, ''])} className={style.button_add}>
              Add tag
            </button>
          </div>
        </div>
        <button onClick={sendPost} className={style.button_send}>
          Send
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(CreateBlogElement) //withRouter()

// возможнош разумно сделать разметку <fieldset>
// <legend>User Details</legend>
