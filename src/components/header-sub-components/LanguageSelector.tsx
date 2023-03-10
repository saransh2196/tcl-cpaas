import { FC, useEffect, useState } from 'react'
import { Select, MenuItem } from '@mui/material'
import useLocales from '../../hooks/useLocales'
import FormControl from '@mui/material/FormControl'
import Globe from '../../assets/images/svg/globe.svg'
import GlobeDark from '../../assets/images/svg/globe-dark.svg'
import { getFromLocalStorage, setInLocalStorage } from '../../hooks/useLocalStorage'
import { localStorageVar } from '../../utils/constants'
import { useTranslation } from 'react-i18next'
import { availableLanguages } from '../../i18n'

const LanguageSelector: FC = () => {
    const { i18n } = useTranslation()
    const { t, allLang, currentLang, onChangeLang } = useLocales()

    const getitem = getFromLocalStorage(localStorageVar.THEME_VAR)


    return (
        <FormControl
            sx={{
                m: 1,
                minWidth: 100,
                position: 'relative',
            }}
            size="small"
            id="lang-background-invoices"
        >
            <img
                src={getitem == 'light' ? Globe : GlobeDark}
                alt=""
                style={{
                    width: '18px',
                    height: '18px',
                    position: 'absolute',
                    top: '50%',
                    left: '-12px',
                    transform: 'translateY(-50%)',
                }}
            />
            <Select
                MenuProps={{
                    disableScrollLock: true,
                }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={i18n.language == ('en-ZA') ? 'English' : i18n.language == ('en-US')? 'English':i18n.language == ('en-GB')? 'English': i18n.language}
                label="Language"
                onChange={(e) => {
                    i18n.changeLanguage(e.target.value)
                    setInLocalStorage('lng', e.target.value)
                }}
            >
                {availableLanguages.map((language: any) => (
                    <MenuItem key={language} value={language}>
                        {language == 'en-ZA' ? 'English' : language}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSelector
