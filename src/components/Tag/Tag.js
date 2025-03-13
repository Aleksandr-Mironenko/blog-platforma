const Tag = (props, dispatchdeleted) => {
  return (
    <>
      <input value={props} onClick={dispatchdeleted} />
      <button>Delete</button>
    </>
  )
}
export default Tag
