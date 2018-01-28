import React from 'react'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import getExpensesTotal from '../selectors/expense-total'
import selectExpenses from '../selectors/expenses'
import messages from '../intl/messeges'
import { toIndiaDigits } from '../intl/to-india-digits'

// Note: "export" is required  so that the component can be used in testing (it is optional)
export const ExpensesSummary = ({expenseCount, expensesTotal, lang}) => {
  const count = lang==='en' ? expenseCount.toString() : toIndiaDigits(expenseCount.toString())
  const total = lang==='en' ? 
    numeral(expensesTotal/100).format('0,0.00') :
    toIndiaDigits(numeral(expensesTotal/100 * 500).format('0,0'))
  const summary = `${messages[lang].summary_message_viewing} ${count} 
      ${messages[lang].summary_message_total} ${total} ${messages[lang].currency_unit}`

  return (
    <div className={`page-header`}>
      <div className="content-container">
        {expenseCount>0 ? (
          <h1 className={`page-header__title ${lang}`}>{summary}</h1>
        ) : (
          <h1 className={`page-header__title ${lang}`}>{messages[lang].summary_noMessages}</h1>
        )}
        <div className={`page-header__action ${lang}`}>
          <Link className="button" to="/create">{messages[lang].addExpense_btn}</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)
  return ({
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses),
    lang: state.filters.lang
  })
}

export default connect(mapStateToProps)(ExpensesSummary)



/* Alternate version of the JSX

Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formatedTotal}</span>

<div>
  {(() => {
    switch(expenseCount) {
      case 0 : 
        return <p>There are no expenses to view</p>
        break
      case 1 : 
        return (
          <p> Viewing 1 exepense totalling {expensesTotal}</p>
        )
        break
      default: 
      return (
        <p> Viewing {expenseCount} exepense totalling {expensesTotal}</p>
      )
    }
  })()}
</div>
*/