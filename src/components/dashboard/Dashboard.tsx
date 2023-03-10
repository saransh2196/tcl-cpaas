import { useSelector } from "react-redux";
import useLocales from "../../hooks/useLocales";

export const Dashboard = ({ toggleTheme, data }: { toggleTheme: any, data: any }) => {
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
                    {t<string>('dashboardTitle')}
                </h1>
            </div>
        </div >
    )
}

export default Dashboard
