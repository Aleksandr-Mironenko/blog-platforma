import { connect } from 'react-redux'
import { useEffect } from 'react'

import actions from '../actions'

const Tags = ({ store, getPosts }) => {
  useEffect(() => {
    getPosts(store.page, store.pageQty)
  }, [store.page, store.pageQty, getPosts])
  return (
    <>
      <h3>Tags</h3>
    </>
  )
}
const mapStateToProps = (state) => ({ store: state })

export default connect(mapStateToProps, actions)(Tags)
