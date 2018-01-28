import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../actions/auth'
import { setUILang } from '../actions/filters'
import messages from '../intl/messeges'

export const Header = ({ startLogout, setUILang, lang, }) => (
  <header className={`header ${lang}`}>
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>{messages[lang].header_title}</h1>
        </Link> 
        <button 
          className="button button--link"
          onClick={() => { setUILang(lang==="en" ? "ar" : "en")}}>
          {messages[lang].header_langBtn}
        </button>
        <button 
          className="button button--link" 
          onClick={startLogout}>
            {messages[lang].header_buttonLabel}
        </button>
      </div>
    </div>
  </header>
)

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  setUILang: (lang) => dispatch(setUILang(lang))
})

export default connect(undefined, mapDispatchToProps)(Header)

/*
<NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
<NavLink to="/create" activeClassName="is-active">Create Expense</NavLink> 
<NavLink to="/help" activeClassName="is-active">Help</NavLink>
*/