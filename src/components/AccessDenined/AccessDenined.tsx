import { useSelector } from "react-redux";
import useLocales from "../../hooks/useLocales";

export const AccessDenined = () => {
    const { dashBoardWidth } = useSelector((state: any) => state.common);
    const { t } = useLocales();
    return (
        <div className="Layout__content" style={{ width: `${window.innerWidth - +`${dashBoardWidth}`.split('p')[0]}px`, marginLeft: `${dashBoardWidth}` }}>
            <div>
                <h1 style={{
                    padding: '0px',
                    margin: '0px',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '32px',
                    lineHeight: '37px',
                }}>
                    Access Deined !
                </h1>
            </div>
        </div >
    )
}

export default AccessDenined
