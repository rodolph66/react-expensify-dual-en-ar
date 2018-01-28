import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import messages from '../intl/messeges'
import { toIndiaDigits } from '../intl/to-india-digits'

const ExpenseListItem = ({id, description, amount, createdAt, lang}) => {
  const amountLang = lang==="ar" ? 
    toIndiaDigits(numeral(amount/100 * 500).format('0,0'))+' '+messages[lang].currency_unit : 
    numeral(amount/100).format('0,0.00')+' '+messages[lang].currency_unit
  return(
    <div className={`${lang}`}>
      <Link to={`/edit/${id}`} className="list-item">
        <div>
          <h3 className="list-item__title">{description}</h3>
          <span className="list-item__sub-title">
            {moment(createdAt).format('DD MMMM YYYY')}
          </span>
        </div>
        <h3 className="list-item__data" lang="ar" >
          {amountLang}
        </h3>
      </Link>
    </div>
  )
}

const mapStateToProps = state => {
  moment.locale(state.filters.lang)
  return ({lang: state.filters.lang})
}

export default connect(mapStateToProps)(ExpenseListItem)
