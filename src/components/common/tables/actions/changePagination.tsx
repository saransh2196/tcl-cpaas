import { Pagination, Stack } from '@mui/material';
import { DateInput } from '../../elements/DateInput';
import { useDispatch as useAppDispatch } from '../../../../redux/store'
import { setUlrParms } from '../../../../utils/helpers';
export const ChangePagination = ({
    pagination,
    pageAction
}: any) => {
    const totalCount = Math.ceil(pagination.total / pagination.take)
    const dispatch = useAppDispatch()
    const changePage = (da: any, pageNumber: any) => {
        updateData(pageNumber, pagination.take)
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
        <Stack
            spacing={3}
            sx={{
                marginTop: 3,
            }}
        >
            <Pagination
                onChange={changePage}
                page={pagination.page}
                className="tablePag"
                count={totalCount}
                variant="outlined"
                shape="rounded"
            />
        </Stack>
    )
}
