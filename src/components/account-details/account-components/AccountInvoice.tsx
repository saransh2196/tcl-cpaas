import { Box, Stack, Typography } from '@mui/material'
import useLocales from '../../../hooks/useLocales'
import { apiVrbls } from '../../../utils/constants'


const AccountInvoice = ({ sendInvoice }: any) => {
    const { t } = useLocales()
    return (
        <>
            {/* 2nd row container starts */}
            {sendInvoice != null &&
                <Box
                    className="bd-single-content account-invoice"
                    sx={{
                        bgcolor: '#fff',
                        height: 1,
                        borderRadius: '20px',
                        borderTopLeftRadius: '0px',
                        borderTopRightRadius: '0px',
                        pt: '40px',
                        pb: '133px',
                        px: '50px',
                    }}
                >
                    {/* 3rd row starts here */}
                    <Box
                        sx={{
                            mb: 6,
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between">
                            <Typography
                                variant="h5"
                                component="h1"
                                sx={{
                                    maxWidth: 'unset',
                                    textAlign: 'left',
                                    padding: 0,
                                    fontSize: '24px',
                                    lineHeight: '22px',
                                    color: '#303030',
                                    fontWeight: 700,
                                    fontFamily: 'ubuntu',
                                }}
                            >
                                {t<string>('sendInvoiceTo')}
                            </Typography>
                        </Stack>
                    </Box>

                    {/* 4th row starts here */}
                    <Box
                        component="form"
                        className="account-user-details-input"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            rowGap: '48px',
                            // marginBottom: '40px',
                            // paddingBottom: '133px',
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack
                            sx={{
                                flexBasis: '30%',
                                minWidth: '160px',
                            }}
                        >
                            <Typography
                                className="prefilled-title"
                                component="h3"
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '10px !important',
                                    fontSize: '14px',
                                    color: '#344857',
                                    fontFamily: 'ubuntu',
                                    opacity: 0.7,
                                    flexBasis: '30%',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {t<string>('name')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="name"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {sendInvoice[apiVrbls.ACCOUNT.LES_CHILD.SND_INV_CON_CHILD.NAME]}
                            </Typography>
                        </Stack>

                        <Stack
                            sx={{
                                flexBasis: '30%',
                                minWidth: '160px',
                            }}
                        >
                            <Typography
                                className="prefilled-title"
                                component="h3"
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '10px !important',
                                    fontSize: '14px',
                                    color: '#344857',
                                    fontFamily: 'ubuntu',
                                    opacity: 0.7,
                                    flexBasis: '30%',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {t<string>('address')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="address"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {sendInvoice[apiVrbls.ACCOUNT.LES_CHILD.SND_INV_CON_CHILD.ADDRESS]}
                            </Typography>
                        </Stack>

                        <Stack
                            sx={{
                                flexBasis: '30%',
                                minWidth: '160px',
                            }}
                        >
                            <Typography
                                className="prefilled-title"
                                component="h3"
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '10px !important',
                                    fontSize: '14px',
                                    color: '#344857',
                                    fontFamily: 'ubuntu',
                                    opacity: 0.7,
                                    flexBasis: '30%',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {t<string>('city')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="city"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {sendInvoice[apiVrbls.ACCOUNT.LES_CHILD.SND_INV_CON_CHILD.CITY]}
                            </Typography>
                        </Stack>

                        <Stack
                            sx={{
                                flexBasis: '30%',
                                minWidth: '160px',
                            }}
                        >
                            <Typography
                                className="prefilled-title"
                                component="h3"
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '10px !important',
                                    fontSize: '14px',
                                    color: '#344857',
                                    fontFamily: 'ubuntu',
                                    opacity: 0.7,
                                    flexBasis: '30%',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {t<string>('country')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="country"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {sendInvoice[apiVrbls.ACCOUNT.LES_CHILD.SND_INV_CON_CHILD.COUNTRY]}
                            </Typography>
                        </Stack>

                        <Stack
                            sx={{
                                flexBasis: '30%',
                                minWidth: '160px',
                            }}
                        >
                            <Typography
                                className="prefilled-title"
                                component="h3"
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '10px !important',
                                    fontSize: '14px',
                                    color: '#344857',
                                    fontFamily: 'ubuntu',
                                    opacity: 0.7,
                                    flexBasis: '30%',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {t<string>('pin')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="pin"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {sendInvoice[apiVrbls.ACCOUNT.LES_CHILD.SND_INV_CON_CHILD.PIN]}
                            </Typography>
                        </Stack>

                        <Stack
                            sx={{
                                flexBasis: '30%',
                                minWidth: '160px',
                            }}
                        >
                            <Typography
                                className="prefilled-title"
                                component="h3"
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '10px !important',
                                    fontSize: '14px',
                                    color: '#344857',
                                    fontFamily: 'ubuntu',
                                    opacity: 0.7,
                                    flexBasis: '30%',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {t<string>('emailId')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="email-Id"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {sendInvoice[apiVrbls.ACCOUNT.LES_CHILD.SND_INV_CON_CHILD.EMAIL]}
                            </Typography>
                        </Stack>

                        <Stack
                            sx={{
                                flexBasis: '30%',
                                minWidth: '160px',
                            }}
                        >
                            <Typography
                                className="prefilled-title"
                                component="h3"
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '10px !important',
                                    fontSize: '14px',
                                    color: '#344857',
                                    fontFamily: 'ubuntu',
                                    opacity: 0.7,
                                    flexBasis: '30%',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {t<string>('carnr')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="rate-notification"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {sendInvoice[apiVrbls.ACCOUNT.LES_CHILD.SND_INV_CON_CHILD.CUS_AUT_RAT_NOT_REC]}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            }
        </>
    )
}

export default AccountInvoice
