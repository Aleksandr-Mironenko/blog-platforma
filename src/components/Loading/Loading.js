import style from './index.module.scss'
const Loading = () => {
  return (
    <div className={style.loading}>
      <div className={style.text}> Загрузка...</div>
    </div>
  )
}
export default Loading
