import './i18n'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css'

import { worker } from './_mocks/browser'
// mock server
// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
worker.start()
// }

const container: any = document.getElementById('root');

createRoot(container).render(
  <Suspense fallback={null}>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </Suspense>
)
