import { connect } from 'react-redux'
import React from 'react'
import { Pagination, Stack } from '@mui/material'

import actions from '../actions'
import BlogElement from '../Blog-element'

import style from './index.module.scss'

const BodyBlog = ({ store, changePage }) => {
  const { posts } = store
  console.log(posts)
  const elements = posts.map((item, index) => {
    return <BlogElement key={index} {...item} />
  })

  return (
    <div className={style.body_blog}>
      {elements}
      <Stack spacing={2} sx={{ margin: '26px auto' }}>
        {!!store.pageQty && (
          <Pagination
            count={store.pageQty}
            page={store.page}
            shape="rounded"
            color="primary"
            onChange={(__, num) => changePage(num)}
          />
        )}
      </Stack>
    </div>
  )
}

const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(BodyBlog)
