import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startAddExpense } from '../actions/expenses'
import messages from '../intl/messeges'

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this. props.startAddExpense(expense)
    this. props.history.push('/')
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className={`content-container ${this.props.lang}`}>
            <h1 className="page-header__title">
              {messages[this.props.lang].add_heading}
            </h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm onSubmit={this.onSubmit} lang={this.props.lang} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({lang: state.filters.lang})

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage)