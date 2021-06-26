/* eslint-disable camelcase */
import { extend } from 'vee-validate'
import { required, email, min, max_value, max } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})
extend('email', email)
extend('min', min)
extend('max', max)
extend('max_value', max_value)
