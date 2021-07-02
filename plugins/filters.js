import Vue from 'vue'

Vue.filter('limitChars', (value) => {
  if (!value) return
  if (value.length <= 15) return value

  return `${value.slice(0, 15)}...`
})
