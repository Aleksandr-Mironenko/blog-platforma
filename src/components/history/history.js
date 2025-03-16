import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export const startHistoryListening = (store) => {
  history.listen((location, action) => {
    store.dispatch({
      type: 'LOCATION_CHANGE',
      payload: {
        location,
        action,
      },
    })
  })
}

export default history
