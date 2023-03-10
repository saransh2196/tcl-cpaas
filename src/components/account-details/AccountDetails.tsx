import { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import AccountLeftSection from './account-components/AccountLeftSection'
import AccountRightSection from './account-components/AccountRightSection'
import { useDispatch, useSelector } from '../../redux/store'
import { getAcDetails } from '../../redux/slices/accountSlice'
import { BreadCrums } from '../common/elements/BreadCrum'
import { breadCrums } from '../../utils/constants'

const AccountDetails = ({ toggleTheme }: { toggleTheme: any }) => {
    const dispatch = useDispatch()
    const { dashBoardWidth } = useSelector((state: any) => state.common);
    useEffect(() => {
        dispatch(getAcDetails())
    }, [dispatch])

    return (
        <>
            <Box
                className="bd-container Layout__content"
                style={{ width: `${window.innerWidth - +`${dashBoardWidth}`.split('p')[0]}px`, marginLeft: `${dashBoardWidth}`, flexDirection: 'column' }}
            >
                <div className="content__header">
                    <BreadCrums data={breadCrums.ACCOUNT_DETAILS} />
                </div>
                <Grid
                    className="bd-inner-container"
                    container
                    columns={{ sm: 8, md: 12 }}
                >
                    {/* Upper grid */}
                    <Grid
                        className="bd-single-container"
                        item
                        container
                        columnSpacing={5}
                        columns={12}
                        sm={12}
                        md={12}
                    >
                        <Grid item xs={4} sm={4} md={4} lg={4.5} xl={4}>
                            {/* <AccountAvatar /> */}
                            <AccountLeftSection />
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={7.5} xl={8}>
                            <AccountRightSection />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default AccountDetails
