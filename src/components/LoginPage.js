import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'
import { setUILang } from '../actions/filters'
import messages from '../intl/messeges'


export const LoginPage = ({ startLogin, setUILang, lang }) => (
  <div className="box-layout">
    <div className={`box-layout__box box-layout__${lang}`}>
      <h1 className="box-layout__title">
        {messages[lang].loginPage_AppTitle}
      </h1>
      <p>{messages[lang].loginPage_Message}</p>
      <button className="button" onClick={startLogin}>
        {messages[lang].loginPage_LoginBtn}
      </button>
    </div>
    <div>
      <button 
        className="button--lang" 
        disabled={lang === "en"}
        onClick={() => { setUILang("en") }}
      >English</button>
      <button 
        className="button--lang"
        disabled={lang === "ar"}
        onClick={() => { setUILang("ar") }}
      >عربي</button> 
    </div> 
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  setUILang: (lang) => dispatch(setUILang(lang))
})

const mapStateToProps = ({filters}) => ({
  lang: filters.lang
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)