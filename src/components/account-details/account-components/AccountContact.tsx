import { Box, Stack, Typography, Button } from '@mui/material'
import HelpImg from '../../../assets/images/need-help.png'
import useLocales from '../../../hooks/useLocales'
const AccountContact = () => {
    const { t } = useLocales()
    return (
        <>
            <Box style={{ marginTop: '46px' }} className='bd-single-content' sx={{
                bgcolor: '#fff',
                height: 1,
                borderRadius: '20px',
                pt: '40px',
                px: '50px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0px',
            }}>
                {/* 1st row starts here */}
                <Box sx={{
                    mb: '14px',
                }}>
                    <Stack direction='row' justifyContent='center' alignItems='center' >
                        <img src={HelpImg} alt="" />
                    </Stack>
                </Box>

                {/* 2nd row starts here */}
                <Typography variant='h5' component='h1' sx={{
                    maxWidth: 'unset',
                    textAlign: 'center',
                    padding: 0,
                    fontSize: '24px',
                    lineHeight: '22px',
                    color: '#303030',
                    fontWeight: 700,
                    fontFamily: 'ubuntu',
                    mb: '10px',
                }}>{t<string>('needHelp')}</Typography>
                <Typography variant='subtitle1' sx={{
                    textAlign: 'center',
                    color: '#344857',
                    opacity: 0.7,
                    letterSpacing: '-0.72px',
                    fontSize: '18px',
                    lineHeight: '20px',
                    fontFamily: 'ubuntu',
                    mb: '19px',
                }}>Lorem ipsum dolor sit amet</Typography>

                {/* 3rd row starts here */}
                <Button color='error' variant='outlined' sx={{
                    textTransform: 'uppercase',
                    borderRadius: '100px',
                    mb: 11,
                    px: 6,
                    py: 2,
                    fontSize: '12px',
                    lineHeight: '13px',
                    fontWeight: 700,
                    fontFamily: 'ubuntu',
                    '&:hover': {
                        backgroundColor: '#D63548',
                        color: '#fff',
                    },
                }}>{t<string>('contactUs')}</Button>
            </Box>
        </>
    )
}

export default AccountContact
