import Vue from 'vue'
import { format, formatDistance } from 'date-fns'

Vue.filter('limit', (value) => {
  if (!value) return
  if (value.length <= 15) return value

  return `${value.slice(0, 15)}...`
})

Vue.filter('title', (value) => {
  if (!value) return
  if (value.length <= 30) return value

  return `${value.slice(0, 30)}...`
})

Vue.filter('description', (value) => {
  if (!value) return
  if (value.length <= 100) return value

  return `${value.slice(0, 100)}...`
})

Vue.filter('date', (value) => {
  // Converts from Seconds timestamp to Milliseconds
  if (typeof value === 'number') {
    value = value * 1000
  }

  const date = value instanceof Date ? value : new Date(value)

  return format(date, 'MMM d, yyyy')
})

Vue.filter('timeDistance', (value) => {
  // Converts from Seconds timestamp to Milliseconds
  if (typeof value === 'number') {
    value = value * 1000
  }

  const date = value instanceof Date ? value : new Date(value)

  return formatDistance(date, Date.now(), { addSuffix: true })
})
