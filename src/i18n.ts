import i18n, {use} from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import English from './locales/translations/en.json'
import German from './locales/translations/de.json'

const resources = {
  English,
  German,
}

export const availableLanguages = Object.keys(resources)
// eslint-disable-next-line
i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  defaultNS: 'common',
  fallbackLng: 'English',
  lng: localStorage.lng,  
})
