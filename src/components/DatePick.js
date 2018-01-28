import React from 'react'
import PropTypes from 'prop-types'

class DatePick extends React.Component {

  render() {
    return (
      <button className="button--date-picker" type="button" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
}

DatePick.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
}

export default DatePick