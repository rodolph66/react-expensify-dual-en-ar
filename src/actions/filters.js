
// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// SORT_BY_DATE
export const sortByDate = () => ({
  type: 'SET_SORT_BY',
  sortBy: 'date'
})

// SORT_BY_AMOUNT
export const sortByAmount = () => ({
  type: 'SET_SORT_BY',
  sortBy: 'amount'
})

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

// SET_UI_LANG
export const setUILang = (lang) => ({
  type: 'SET_UI_LANG',
  lang
})