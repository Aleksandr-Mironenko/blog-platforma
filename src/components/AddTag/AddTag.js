import style from './index.module.scss'

const AddTag = ({ item, index, sostTags, delTags }) => {
  return (
    <div className={style.tag}>
      <input
        type="text"
        id={item + index}
        name={item + index}
        value={item}
        placeholder="Tag"
        onChange={(e) => sostTags(index, e.target.value)}
        className={style.input_tag}
      />
      <button type="button" className={style.button_del} onClick={() => delTags(index)}>
        Delete
      </button>
    </div>
  )
}
export default AddTag
