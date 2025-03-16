import actions from '../actions'

const loadingMiddleware = (history) => (store) => {
  const { loadStart, loadEnd } = actions
  let timer = null

  const handleLocationChange = (location, action) => {
    console.log('ВКЛЮЧИЛСЯ')
    store.dispatch(loadStart())

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      console.log('ВЫКЛЮЧИЛСЯ')
      store.dispatch(loadEnd())
    }, 1000) // Задержка для имитации загрузки
    return () => {
      console.log('МИДЛВАР НЕ РАБОТАЕТ')
      clearTimeout(timer)
    }
  }

  history.listen(handleLocationChange)

  return (next) => (action) => {
    const result = next(action) // Передача действия следующему middleware или редуктору
    return result
  }
}

export default loadingMiddleware
