
// import 'react-dates/initialize'
// import 'react-dates/lib/css/_datepicker.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setTimeout } from 'timers'

import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/consfigureStore'
import { startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
import { setUILang } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import LoadingPage from './components/LoadingPage'

import 'normalize.css/normalize.css'
import './styles/styles.scss'
//import 'react-datepicker/dist/react-datepicker.css'


// *****************************

import { firebase } from './firebase/firebase'

// *****************************

let lang = localStorage.getItem('language')
if (!lang || (lang !== 'en' && lang !== 'ar')) {
  lang = 'en'
} 
localStorage.setItem('language', lang)
//console.log('app.js : Current lang:', lang)


// *****************************

const store = configureStore()

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'))
    store.dispatch(setUILang(lang))
    hasRendered = true
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'))

// *****************************

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid))
    store.dispatch(startSetExpenses()).then(() => {
      renderApp()
      if (history.location.pathname === '/') {
        history.push('/dashboard')
      }
    })
  } else {
    store.dispatch(logout())
    renderApp()
    history.push('/')
  }
})

// *****************************

// allows for conditional load of .scss file base on the html property lang
// require('./styles/base/_base_' + lang + '.scss')