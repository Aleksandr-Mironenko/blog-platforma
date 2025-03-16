import style from './index.module.scss'
const Error = () => {
  return (
    <div className={style.loading}>
      <div className={style.text}>Произошла ошибка. Попробуйте обновить страницу</div>
    </div>
  )
}
export default Error
