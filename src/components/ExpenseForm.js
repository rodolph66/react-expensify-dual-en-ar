import React from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import messages from '../intl/messeges'
import DatePick from './DatePick'

export default class ExpenseForm extends React.Component {
  // note 2
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense ? (this.props.expense.amount/100).toString() : '',
    createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
    calendarFocused: false,
    error: '',
    buttonLabel: this.props.expense ? 
      messages[this.props.lang].add_btn_label_save : 
      messages[this.props.lang].add_btn_label_add
  }

  onDescriptionChange = (e) => {
    // note 1
    const description = e.target.value
    this.setState(() => ({description}))
  }

  onNoteChange = (e) => {
    //note 1
    const note = e.target.value
    this.setState(() => ({note}))
  }

  onAmountChange = (e) => {
    const amount = e.target.value
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({amount}))
    }
  }

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }))
    }
  }

  // onFocusedChange = ({ focused }) => {
  //   this.setState({ calendarFocused: focused })
  // }

  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.description || !this.state.amount) {
      this.setState({error: `${messages[this.props.lang].add_error_msg}`})
    } else {
      this.setState({error: ''})
      this.props.onSubmit({
        description: this.state.description,
        amount: this.props.lang==="ar"? parseInt(this.state.amount*100/500, 10) : parseInt(this.state.amount*100, 10),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }
  }

  render() {
    return (  
      <form className={`form ${this.props.lang}`} onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          className="text-input"
          type="text"
          placeholder={messages[this.props.lang].add_description}
          autoFocus
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder={messages[this.props.lang].add_amount}
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <DatePicker 
          customInput={<DatePick />}
          locale={this.props.lang}
          dateFormat={"D MMMM YYYY"}
          selected={this.state.createdAt}
          onChange={this.onDateChange}
        />
        <textarea
          className="textarea"
          placeholder={messages[this.props.lang].add_note}
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button 
            className="button" 
            onClick={this.onSubmit}
          >{this.state.buttonLabel}</button>
        </div>
      </form>
    )
  }
}



// note 1: the target value must be saved in a var/const before setState

// note 2: if anything fails try the following which is what is used in the course
/*
  constructor(props) {
    super(props)
    this.state = {
      description: props.expense ? props.expense.description : ''
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount/100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }
  }
*/