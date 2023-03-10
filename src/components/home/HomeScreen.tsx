import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocales from '../../hooks/useLocales'
import { appRoutes } from '../../utils/constants'

const HomeScreen = () => {
  const { t } = useLocales()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(appRoutes.LOGIN)
  })
  return (
    <>
      <div className="main-div">
        <h1 data-testid="password-exist" className="homescreen-text">
          {t<string>('home')}
        </h1>
        <div className="centering-div">
          <h1 className="h1-padding">TCL-CPAAS {t<string>('home')}</h1>
        </div>
      </div>
    </>
  )
}

export default HomeScreen
