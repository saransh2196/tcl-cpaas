import { Box, Typography, Button, IconButton, Avatar, Tooltip, Divider } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work';
import GavelIcon from '@mui/icons-material/Gavel';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import useLocales from '../../../hooks/useLocales'
import { apiVrbls } from '../../../utils/constants';



const UserInfoCard = ({ edituserHandler, data, inactiveUser }: any) => {
    const { t } = useLocales()

    return (
        <Box className='single-card'>
            {data && <>

                <Box className='icon-right--container'>
                    <IconButton className='icon-right onlySVG' color="primary" aria-label="updated user details">
                        {/* <CheckCircleIcon /> */}
                        <span className={data[apiVrbls.USER_MANAGMENT.STATUS]}>  <data.iconEle /></span>
                    </IconButton>
                    <Tooltip title={t<string>('inactiveUser')}>
                        <IconButton className='icon-right icon-editmode' color="primary" aria-label="delete user details" onClick={() => { inactiveUser(data) }}>
                            <RemoveCircleOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t<string>('editUser')}>
                        <IconButton className='icon-right icon-editmode' color="primary" aria-label="edit user details" onClick={() => { edituserHandler(data) }}>
                            <ModeEditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Top content */}
                <Box className='top-content flex-division'>
                    <Avatar sx={{ bgcolor: '#DBE9F3', }}>
                        ES
                    </Avatar>
                    <Box className='internal-content'>
                        <Typography variant='h3'>{data[apiVrbls.USER_MANAGMENT.NAME]}</Typography>
                        <Button href='mailto:johndeo@company.com'>{data[apiVrbls.USER_MANAGMENT.EMAIL_ID]}</Button>
                        <Box component='span' className='italic'>{t<string>('CreatedOn')} {data[apiVrbls.USER_MANAGMENT.CREATED_DATE]}</Box>
                    </Box>
                </Box>

                <Box sx={{
                    padding: '20px',
                    borderRadius: '16px',
                    backgroundColor: '#F9F9F9',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '20px',
                }}>
                    {/* Middle content */}
                    <Box className='middle-content flex-division'>
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <WorkIcon />
                        </IconButton>
                        <Box className='internal-content'>
                            <Typography variant='h4'>{t<string>('role')}</Typography>
                            <Box component='span'>{data[apiVrbls.USER_MANAGMENT.ROLE]}</Box>
                        </Box>
                    </Box>

                    <Divider sx={{
                        borderColor: '#EFEFEF',
                    }} />

                    {/* Bottom content */}
                    <Box className='bottom-content flex-division'>
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <GavelIcon />
                        </IconButton>
                        <Box className='internal-content'>
                            <Typography variant='h4'>{t<string>('legalEntity')}</Typography>
                            <Box component='span'>{data[apiVrbls.USER_MANAGMENT.LEGAL_ENTITY]}</Box>
                        </Box>
                    </Box>

                </Box>
            </>}
        </Box>
    )
}

export default UserInfoCard
