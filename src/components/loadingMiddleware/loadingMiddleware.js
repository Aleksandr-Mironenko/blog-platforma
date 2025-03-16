import actions from '../actions'

const loadingMiddleware = (history) => (store) => {
  const { loadStart, loadEnd } = actions
  let timer = null

  const handleLocationChange = (location, action) => {
    store.dispatch(loadStart())

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      store.dispatch(loadEnd())
    }, 1000) // Задержка для имитации загрузки
    return () => {
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
