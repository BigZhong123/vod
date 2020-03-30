import Storage from 'web-storage-cache'
const wsCache = new Storage()

const LOCALE = 'locale'
const THEME = 'theme'

export function setLocaleStorage (key, value) {
  return wsCache.set(key, value)
}

export function getLocaleStorage (key) {
  return wsCache.get(key)
}

export function setLocale (value) {
  setLocaleStorage(LOCALE, value)
}

export function getLocale () {
  return getLocaleStorage(LOCALE)
}

export function setTheme (value) {
  setLocaleStorage(THEME, value)
}

export function getTheme () {
  return getLocaleStorage(THEME)
}