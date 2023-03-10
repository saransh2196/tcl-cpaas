import { useTranslation } from 'react-i18next'
import { localStorageVar } from '../utils/constants'
import { getFromLocalStorage } from './useLocalStorage'

type LangType = [
  {
    value: any
    label: any
  },
  {
    value: any
    label: any
  }
]

const LANGS: LangType = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'de',
    label: 'German',
  },
]

export default function useLocales() {
  const { i18n, t } = useTranslation()
  const langStorage = getFromLocalStorage(localStorageVar.I18_LANG_VAR)
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage)

  const handleChangeLanguage = (newlang: any) => {
    i18n.changeLanguage(newlang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    t,
    currentLang,
    allLang: LANGS,
  }
}
