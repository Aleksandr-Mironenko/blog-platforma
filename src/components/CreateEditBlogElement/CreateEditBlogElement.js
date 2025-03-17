// import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
  const { token, authorized } = store

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: title ? title : '',
      description: postAbbreviated ? postAbbreviated : '',
      text: postFull ? postFull : '',
      tagList: tagList ? tagList : [''],
    },
  })

  // const [titlee, setTitle] = useState(title ? title : '')
  // const [description, setDescription] = useState(postAbbreviated ? postAbbreviated : '')
  // const [text, setText] = useState(postFull ? postFull : '')
  // const [tags, setTags] = useState(tagList ? tagList : [''])
  const tagsList = watch('tagList')

  const addTags = (index, value) => {
    const newTags = [...tagsList.slice(0, index), value, ...tagsList.slice(index + 1)]
    setValue('tagList', newTags)
  }

  const delTags = (index) => {
    const newTags = [...tagsList.slice(0, index), ...tagsList.slice(index + 1)]
    setValue('tagList', newTags)
  }

  const tagsElements = tagsList.map((item, index) => {
    return <AddTag key={index} item={item} index={index} addTags={addTags} delTags={delTags} />
  })

  const tags = tagsList.filter((item) => item !== '' && item !== ' ')

  //
  //
  //
  //
  const check = title || postAbbreviated || postFull || tagList
  const send = (data) => {
    const post = {
      title: data.title,
      tagList: tags,
      text: data.text,
      slug: slug,
      description: data.description,
      token: token,
    }

    if (check) {
      updateArticle(post)
    } else {
      createPost(post)
    }
    history.push('/articles')
  }

  if (!authorized) {
    return <Redirect to="/articles" />
  }

  return (
    <div className={style.createEditBlogElement}>
      <form onSubmit={handleSubmit(send)} className={style.blogElement}>
        <div className={style.legend}>{check ? 'Edit article' : 'Create new article'}</div>
        <label htmlFor="title" className={style.label}>
          Title
        </label>
        <input
          {...register('title', { required: 'Title cannot be empty' })}
          type="text"
          id="title"
          name="title"
          // value={titlee}
          // onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={errors.title ? style.input_false : style.input}
          autoComplete="title"
        />
        {errors.title && <span>{errors.title.message}</span>}

        <label htmlFor="description" className={style.label}>
          Short description
        </label>
        <input
          {...register('description', { required: 'Description cannot be empty' })}
          type="text"
          id="description"
          name="description"
          // value={description}
          placeholder="Title"
          // onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? style.input_false : style.input}
          autoComplete="description"
        />
        {errors.description && <span>{errors.description.message}</span>}

        <label htmlFor="text" className={style.label}>
          Text
        </label>
        <textarea
          {...register('text', { required: 'Text cannot be empty' })}
          id="text"
          name="text"
          rows="4"
          cols="500"
          // onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          className={errors.text ? style.input_false : style.input}
          // value={text}
          autoComplete="text"
        />
        {errors.text && <span>{errors.text.message}</span>}

        <div className={style.tags}>
          <div className={style.label}>Tags</div>
          <div className={style.tags_elems_button}>
            <div className={style.tags_el}>{tagsElements}</div>
            <button
              type="button"
              onClick={() => {
                const newTags = [...tagsList, '']
                setValue('tagList', newTags)
              }}
              className={style.button_add}
            >
              Add tag
            </button>
          </div>
        </div>
        <button disabled={!isValid} type="submit" className={style.button_send}>
          Send
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })
export default withRouter(connect(mapStateToProps, actions)(CreateEditBlogElement))
