import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'
import messages from '../intl/messeges'

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense)
    this.props.history.push('/')
  }

  onRemove = () => {
    this.props.startRemoveExpense({id: this.props.expense.id})
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className={`content-container ${this.props.lang}`}>
            <h1 className="page-header__title">
              {messages[this.props.lang].edit_heading}
            </h1>
          </div>
        </div>
        <div className={`content-container ${this.props.lang}`}>
          <ExpenseForm  expense={this.props.expense}  onSubmit={this.onSubmit} lang={this.props.lang} />
          <button className="button--secondary" onClick={this.onRemove}>
            {messages[this.props.lang].edit_btn_remove}
          </button>
          <span>&nbsp;&nbsp;</span>
          <button className="button--secondary" onClick={() => {this.props.history.push('/')}}>
            {messages[this.props.lang].edit_btn_cancel}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
  lang: state.filters.lang
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense  : (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)