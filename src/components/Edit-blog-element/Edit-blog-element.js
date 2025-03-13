import { useState } from 'react'

import AddTag from '../AddTag'

import style from './index.module.scss'

const EditBlogElement = ({
  title,
  tagList,
  favoritesCount,
  authorUserName,
  createdAt,
  authorImage,
  authorFollowing,
  favorited,
  postAbbreviated,
  postFull = '',
  updatedAt,
}) => {
  const [titlee, setTitlee] = useState(title)
  const [description, setDescription] = useState(postAbbreviated)
  const [text, setText] = useState('')
  const [tags, setTags] = useState(tagList)
  // const [tag, setTag] = useState
  const sostTags = (index, value) => {
    setTags([...tags.slice(0, index), value, ...tags.slice(index + 1)])
  }

  const delTags = (index) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)])
  }

  const tagss = tags.map((item, index) => {
    return <AddTag key={index} item={item} index={index} sostTags={sostTags} delTags={delTags} />
  })
  return (
    <div className={style.editBlogElement}>
      <div className={style.blogElement}>
        <div className={style.legend}>Edit article</div>
        <label htmlFor="title" className={style.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={titlee}
          onChange={(e) => setTitlee(e.target.value)}
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
        <button onClick={'otpravkaVSostoanie'} className={style.button_send}>
          Send
        </button>
      </div>
    </div>
  )
}

export default EditBlogElement

// возможнош разумно сделать разметку <fieldset>
// <legend>User Details</legend>
