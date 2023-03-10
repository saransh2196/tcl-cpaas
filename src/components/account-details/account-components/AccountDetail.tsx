import { useEffect, useState } from 'react'
import {
    Box,
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { useSelector } from '../../../redux/store'
import useLocales from '../../../hooks/useLocales'
import { apiVrbls } from '../../../utils/constants'

const AccountDetail = ({
    LegalEntity,
    setLegalEntity,
    setsendInvoice,
}: any) => {
    const { t } = useLocales()
    const [leEntity, setLeEntity] = useState<any>(null)
    const { accountDetails } = useSelector((state: any) => state.account)
    useEffect(() => {
        try {
            if (accountDetails && accountDetails[apiVrbls.ACCOUNT.LES]) {
                const allLEData = accountDetails[apiVrbls.ACCOUNT.LES];
                const firstLEData = allLEData[0];
                setLeEntity(firstLEData)
                setsendInvoice(firstLEData.sendInvoiceToContact)
                setLegalEntity(0)

            }
        } catch { }
    }, [accountDetails, setsendInvoice, setLegalEntity])

    const getAllLegalEntities = () => {
        try {
            return accountDetails[apiVrbls.ACCOUNT.LES].map((e: any) => e[apiVrbls.ACCOUNT.LES_CHILD.LE_NAME])
        } catch {
            return []
        }
    }

    const handleChangeEntity = (event: any) => {
        try {
            setLeEntity(accountDetails[apiVrbls.ACCOUNT.LES][event.target.value])
            setsendInvoice(accountDetails[apiVrbls.ACCOUNT.LES][event.target.value][apiVrbls.ACCOUNT.LES_CHILD.SND_INV_CON])
            setLegalEntity(event.target.value)
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            {/* 1st right row container starts here */}
            <Box
                className="bd-single-content account-detail"
                sx={{
                    bgcolor: '#fff',
                    height: 1,
                    borderRadius: '20px',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0',
                    pb: '133px',
                }}
            >
                {/* 1st row starts here */}
                <Box
                    sx={{
                        mb: 6,
                        px: '50px',
                        py: '28px',
                        bgcolor: 'rgba(85, 47, 114, 0.06)',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
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
                            {t<string>('billingDetails')}
                        </Typography>
                        {accountDetails && accountDetails[apiVrbls.ACCOUNT.LES] &&
                            <Box
                                id="select-entity-form"
                                className='legal-entity'
                                sx={{
                                    minWidth: 200,
                                    '& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused':
                                    {
                                        top: '1px',
                                        height: 'min-content',
                                    },
                                    '& [role="button"]': {
                                        color: '#222',
                                        textTransform: 'capitalize',
                                        fontWeight: 400,
                                    },
                                    '& label': {
                                        top: '12px',
                                        height: 'min-content',
                                    },
                                    '& legend': {
                                        display: 'none',
                                    }
                                }}
                            >

                                {getAllLegalEntities().length > 0 && (
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Legal Entity</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Legal Entity"
                                            value={LegalEntity}
                                            defaultValue={LegalEntity}
                                            onChange={handleChangeEntity}
                                        >
                                            {getAllLegalEntities().map((val: any, index: any) => (
                                                <MenuItem value={index} key={`legalEnt${index}`}>
                                                    {val}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </Box>
                        }
                    </Stack>
                </Box>

                {/* 2nd row starts here */}
                {leEntity != null && (
                    <Box
                        component="form"
                        className="account-user-details-input"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            rowGap: '48px',
                            px: '50px',
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
                                    textTransform: 'capitalize',
                                }}
                            >
                                {t<string>('accountName')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="account-name-details"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {accountDetails[apiVrbls.ACCOUNT.ACCOUNT_NAME]}
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
                                {t<string>('legalEntity')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="legal-entity"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.LE_NAME]}
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
                                {t<string>('billingType')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="billing-type"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.BILL_TYPE]}
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
                                {t<string>('billingCycle')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="billing-cycle"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.BILL_CYC]}
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
                                {t<string>('paymentPeriod')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="payment-period"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.PAY_PER]}
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
                                {t<string>('vatGstTax')}
                            </Typography>

                            <Typography
                                className="prefilled-content"
                                id="vat"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.VATGST]}
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
                                {t<string>('companyPanOrEqNo')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="company-pan"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.COMP_PAN]}
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
                                {t<string>('applicableCurrency')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="applicable-currency"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.APP_CABL_CUR]}
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
                                {t<string>('contactTerm')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="contract-term"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.CON_TERM]}
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
                                {t<string>('rateChange...days')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="rate-change-notification-period"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.RATCHNG_NOT_PER]}
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
                                {t<string>('rate&cover...zone')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="rate-coverLegalEntity-change-timeZone"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.RATECOVERCHNGTIME]}
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
                                {t<string>('accountStatusAndRemark')}
                            </Typography>
                            <Typography
                                className="prefilled-content"
                                id="account-status"
                                component="span"
                                sx={{
                                    color: '#344857',
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    fontFamily: 'ubuntu',
                                    lineHeight: '18px',
                                }}
                            >
                                {leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA] && leEntity[apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA][apiVrbls.ACCOUNT.LES_CHILD.BILL_DETA_CILD.ACC_STAT]}
                            </Typography>
                        </Stack>
                    </Box>
                )}
            </Box>
            {/* <AccountInvoice sendInvoice={sendInvoice} /> */}
        </>
    )
}

export default AccountDetail
