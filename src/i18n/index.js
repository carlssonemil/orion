import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getStoredLocale } from '../utils/utils'
import locales from './locales.js'

Vue.use(VueI18n)

const locale = getStoredLocale()
const DEFAULT_LOCALE = 'en-US'

const i18n = new VueI18n({
  locale: locale || DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: Object.assign(locales),
})

export { DEFAULT_LOCALE, locales, i18n }
