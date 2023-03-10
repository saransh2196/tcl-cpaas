import WhatsappImg from '../../../assets/images/svg/Whatsapp.svg'
import Box from '@mui/material/Box'
import { useDarkMode } from '../../../themes/useDarkMode'
import { darkTheme, lightTheme } from '../../../themes/globalStyles'
import useLocales from '../../../hooks/useLocales'
import {  appThemes } from '../../../utils/constants'
import Chart from '../icons/chart'
import Video from '../icons/video'
import PieChart from '../icons/pieChart'
import Voice from '../icons/voice'
import Sales from '../icons/sales'
import Chat from '../icons/chat'

const BackgroundBox = () => {
    const { t } = useLocales()
    const [theme, toggleTheme] = useDarkMode()
    const themeMode = theme === appThemes.LIGHT_THEME ? lightTheme : darkTheme
    return (
        // Background animation
        <Box sx={{ flexGrow: 1 }} className="account__form__animation">
            <div className="floating-wrapper">
                <div className="floating-wrapper-inner">
                    <div className="floating-item floating-item-1">
                        {/* <img src={ChartImg} alt={t<string>('chart')} /> */}
                        <Chart />
                    </div>
                    <div className="floating-item floating-item-2">
                        {/* <img src={PieChartImg} alt={t<string>('pieChart')} /> */}
                        <PieChart />
                    </div>
                    <div className="floating-item floating-item-3">
                        {/* <img src={SalesImg} alt={t<string>('sales')} /> */}
                        <Sales />
                    </div>
                    <div className="floating-item floating-item-4">
                        {/* <img src={VoiceImg} alt={t<string>('voice')} /> */}
                        <Voice />
                    </div>
                    <div className="floating-item floating-item-5">
                        {/* <img src={ChatImg} alt={t<string>('chat')} /> */}
                        <Chat />
                    </div>
                    <div className="floating-item floating-item-6">
                        {/* <img src={VideoImg} alt={t<string>('video')} /> */}
                        <Video />
                    </div>
                    <div className="floating-item floating-item-7">
                        <img src={WhatsappImg} alt={t<string>('whatsapp')} />
                        {/* <Whatsapp /> */}
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default BackgroundBox
