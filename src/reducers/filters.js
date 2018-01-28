import moment from 'moment'

// Filter Reducer #########################################
const filtersDefaultState = {
  lang: 'en', 
  text: '', 
  sortBy: 'date', 
  startDate: moment().startOf('month'), 
  endDate: moment().endOf('month')
}

export default (state = filtersDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text }
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.sortBy }
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate }
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate }
    case 'SET_UI_LANG':
      localStorage.setItem('language', action.lang)
      return { ...state, lang: action.lang }
    default:
      return state
  }
}