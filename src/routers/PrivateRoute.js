import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

export const PrivateRoute = ({
  isAuthenticated,
  lang,
  component: Component,
  ...rest
}) => (
  <Route  {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        <Header lang={lang} />
        <Component {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    )
  )}/>
)

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
  lang: state.filters.lang
})

export default connect(mapStateToProps)(PrivateRoute)