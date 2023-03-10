import { Box } from '@mui/material'
import React from 'react'


import AccountDetail from './AccountDetail'
import AccountInvoice from './AccountInvoice'

export const AccountRightSection = () => {
    const [LegalEntity, setLegalEntity] = React.useState('')
    const [sendInvoice, setsendInvoice] = React.useState(null)

    return (
        <Box className='removeRowGap'>
            <AccountDetail LegalEntity={LegalEntity} setLegalEntity={setLegalEntity} setsendInvoice={setsendInvoice} />
            <AccountInvoice sendInvoice={sendInvoice} />
        </Box>
    )
}

export default AccountRightSection
