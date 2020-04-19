import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './ZH/zh.js'
import en from './EN/en.js'
import { setLocale, getLocale } from '@/utils/localStorage.js'

Vue.use(VueI18n);

// 中英文切换
let messages = {
  zh,
  en
}

let locale = getLocale()

if (!locale) {
  locale = 'zh'
  setLocale(locale)
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n