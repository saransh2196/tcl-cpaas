import useLocales from '../../../../hooks/useLocales';
import { useDispatch as useAppDispatch } from '../../../../redux/store'
import { setUlrParms } from '../../../../utils/helpers';
export const PageItems = ({
    pagination,
    pageAction
}: any) => {
    const dispatch = useAppDispatch()
    const { t } = useLocales()
    const modifyTake = (e: any) => {
        changeTake(+e.target.value)
    }

    const changeTake = (take: any) => {
        updateData(pagination.page, take)
    }

    const updateData = (page: any, take: any) => {
        if (take * page > pagination.total) {
            dispatch(pageAction(Math.ceil(pagination.total / take), take))
            setUlrParms(page, take)
        } else {
            dispatch(pageAction(page, take))
            setUlrParms(page, take)
        }
    }
    return (
        <div className="action__elementItem">
            <div className="tableRow__show">
                <div className="selectRow">
                    <select name="" id="PageNumberInput" onChange={modifyTake}>
                        <option value="5">{t<string>('showing')} 5</option>
                        <option value="10">{t<string>('showing')} 10</option>
                        <option value="15">{t<string>('showing')} 15</option>
                        <option value="25">{t<string>('showing')} 25</option>
                    </select>
                </div>
                <div className="outOfRow">
                    <span id="results">
                        {t<string>('of')} {pagination.total} {t<string>('results')}
                    </span>
                </div>
            </div>
        </div>
    )
}
