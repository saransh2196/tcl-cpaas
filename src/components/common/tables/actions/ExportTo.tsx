import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import useLocales from '../../../../hooks/useLocales'
import Export from '../../icons/export'
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CheckIcon from '@mui/icons-material/Check';
export const ExportTo = ({
    allMasterData,
    tableName
}: any) => {

    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [dataStored, setDataStored] = useState([]);
    const { t } = useLocales();

    const downloadDetails = async () => {
        if (!loading) {
            setLoading(true)
        }
        if (await allMasterData !== null) {
            setTimeout(() => {
                setDataStored(allMasterData)
                setLoading(false)
                setCompleted(true);

                setTimeout(() => {
                    setCompleted(false);
                }, 2000);
            }, 1000);
            setTimeout(() => {
                setCompleted(false)
            }, 2000);
        }
        return dataStored
    }


    const ExportToCsv = {
        filename: `${tableName}.csv`,
        data: dataStored !== null ? dataStored : []
    }
    useEffect(() => {
        setDataStored(allMasterData)
    }, [allMasterData])

    return (
        <div className="action__elementItem">
            <span className="iconCta">
                <span className="icon">
                    {loading ? <RotateRightIcon /> : completed ? <CheckIcon /> : <Export />}
                </span>
                {dataStored && (
                    <CSVLink {...ExportToCsv} className="text" asyncOnClick={true} onClick={downloadDetails} data-testid="csv-link">
                        {loading ? 'EXPORTING' : completed ? 'EXPORT COMPLETE' : t<string>('exportToCsv')}
                    </CSVLink>)}
            </span>
        </div>
    )
}
