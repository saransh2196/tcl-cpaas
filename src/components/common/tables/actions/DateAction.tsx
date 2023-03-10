import { DateInput } from '../../elements/DateInput';
export const DateAction = ({
    setDateRange,
    dateRange
}: any) => {
    return (
        <div className="action__elementItem" id="date-picker">
            <DateInput  setDateRange={setDateRange} dateRange={dateRange} />
        </div>
    )
}
