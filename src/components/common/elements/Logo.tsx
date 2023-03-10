import { Link } from 'react-router-dom'
import Logo from '../../../assets/images/CPaaSLogo.png'
import DarkLogo from '../../../assets/images/CPaaSLogo-dark.png'

const TclLogo = ({ theme = 'light' }: any) => {
    if (theme === 'light') {
        return (
            <div className="logo">
                <img id="tata-logo-invoice" src={DarkLogo} alt="CPAAS TCL" />
            </div>
        )
    } else {
        return (
            <div className="logo">
                <img src={Logo} alt="CPAAS TCL" />
            </div>

        )
    }
}

export default TclLogo
