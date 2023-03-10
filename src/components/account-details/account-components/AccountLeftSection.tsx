import { Box } from '@mui/material'

import AccountAvatar from './AccountAvatar'
import AccountContact from './AccountContact'

const AccountLeftSection = () => {
    return (
        <Box>
            <AccountAvatar />
            <AccountContact />
        </Box>
    )
}

export default AccountLeftSection
