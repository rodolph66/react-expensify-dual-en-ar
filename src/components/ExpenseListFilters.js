import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters'
import messages from '../intl/messeges'
import DatePick from './DatePick'

export class ExpenseListFilters extends React.Component{

  state = {
    calendarFocused: null,
  }

  componentWillMount() {
    moment.locale(this.props.lang)
  }

  onStartDateChange = (date) => {
    this.props.setStartDate(date)
  }

  onEndDateChange = (date) => {
    this.props.setEndDate(date)
  }

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }

  onSortChange = (e) => {
    if (e.target.value==="date") {
      this.props.sortByDate()
    } else if (e.target.value==="amount") {
      this.props.sortByAmount()
    }
  }

  render() {
    return (
      <div className={`content-container ${this.props.lang}`}>
        <div className="input-group">
          <div className={`input-group__item-${this.props.lang}`}>
            <div className="input-label">
              {messages[this.props.lang].filter_search_lable}
            </div>
            <input 
              type="text" 
              className="text-input"
              value={this.props.filters.text} 
              onChange={this.onTextChange}
              placeholder={messages[this.props.lang].filter_search_input}
            />
          </div>
          <div className={`input-group__item-${this.props.lang}`}>
            <div className="input-label">
              {messages[this.props.lang].filter_sort_label}
            </div>
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option style={{fontFamily: 'Cairo , sans-serif'}} value="date">
                {messages[this.props.lang].filter_sort_date}
              </option>
              <option style={{fontFamily: 'Cairo , sans-serif'}} value="amount">
                {messages[this.props.lang].filter_sort_amount}
              </option>
            </select>
          </div>
          <div className={`input-group__item-${this.props.lang}`}>
            <div className="input-label">
              {messages[this.props.lang].filter_dateRange_from}
            </div>
            <DatePicker customInput={<DatePick />}
              dateFormat={"D MMMM YYYY"}
              selected={this.props.filters.startDate}
              onChange={this.onStartDateChange}
            />
          </div>
          <div className={`input-group__item-${this.props.lang}`}>
            <div className="input-label">
              {messages[this.props.lang].filter_dateRange_to}
            </div>
            <DatePicker customInput={<DatePick />}
              dateFormat={"D MMMM YYYY"}
              selected={this.props.filters.endDate}
              onChange={this.onEndDateChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
  lang: state.filters.lang
})

const mapDispatchToProps = dispatch => ({
  setTextFilter : (text) => dispatch(setTextFilter(text)),
  sortByDate    : () => dispatch(sortByDate()),
  sortByAmount  : () => dispatch(sortByAmount()),
  setStartDate  : (startDate) => dispatch(setStartDate(startDate)),
  setEndDate    : (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)