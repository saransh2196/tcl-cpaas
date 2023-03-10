import React from "react";
import {
  DateRangePicker,
  LocalizationProvider,
} from "@material-ui/pickers"
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch } from "../../../redux/store";
import { updateCal } from "../../../redux/slices/billingSlice";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
export const DateInput = ({ dateRange, setDateRange }: any) => {
  const getDate = (dateRange: any) => {
    const s = `${new Date(dateRange[0]).toDateString()}`.split(" ");
    const e = `${new Date(dateRange[1]).toDateString()}`.split(" ");
    return `${s[1]} ${s[2]} ${s[3]} - ${e[1]} ${e[2]} ${e[3]} `
  }
  const { calOpen } = useSelector((state: any) => state.billing || {});

  const dispatch = useDispatch();
  const dateChangeFn = (date: any) => {
    if (date[1] != null) {
      dispatch(updateCal(false));
      setDateRange(date);
    }
  }

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <DateRangePicker
        onOpen={() => { setDateRange([dateRange[0], null]) }}
        open={calOpen}
        startText="from"
        endText="to"
        value={dateRange}
        onChange={(date: any) => dateChangeFn(date)}
        renderInput={(startProps: any, endProps: any) => (
          <div style={{ position: 'relative' }}>
            <button onClick={() => dispatch(updateCal(!calOpen))} className="showDate">
              {(dateRange[0] == null && dateRange[1] == null) ? 'CREATED DATE' : getDate(dateRange)}
              {/* {(dateRange[0] != null && dateRange[1] != null) && <span className="closeDate"><CloseIcon onClick={()=>{setDateRange([null,null])}} /></span>} */}

              <span className="cal"><CalendarMonthIcon /></span>
            </button>
            {(dateRange[0] != null && dateRange[1] != null) && <span className="closeDate"><CloseIcon onClick={() => { setDateRange([null, null]) }} /></span>}

          </div>
        )
        }
      />
    </LocalizationProvider>
  );
}
