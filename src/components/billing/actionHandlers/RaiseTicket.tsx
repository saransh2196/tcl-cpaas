import { useEffect, useState } from 'react'
import {
    Box,
    Stack,
    Typography,
    FormControl,
    Button,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ModalErrorSlider from '../../modals/ModalTicketError';
import { useForm } from 'react-hook-form';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { yupResolver } from '@hookform/resolvers/yup';
import { raiseTikcetSchema } from '../../../utils/yupschemas';
import ErrorIcon from '@mui/icons-material/Error';
import { CommonInput } from '../../common/elements/CommonInput';
import { TextArea } from '../../common/elements/TextArea';
import { useDispatch as useAppDispatch, useSelector } from '../../../redux/store'
import { raiseTicketApiCall } from '../../../redux/slices/billingSlice';
import { apiVrbls, CONFIG_VALUES, DefaultInputs } from '../../../utils/constants';
import useLocales from '../../../hooks/useLocales';
import ModalSuccessSlider from '../../modals/ModalTicketRaised';
import { DropDownInput } from '../../common/elements/DropDownInput';
import { PhoneInputComp } from '../../common/elements/phoneInput';
import { createAtachmentApiCall } from '../../../redux/slices/serviceAssurenceSlice';
import { AttachFilesBody, RaiseTicektBillingInvoiceBody } from '../../../utils/ApiRequestbody';

const radioClr = {
    '&, &.Mui-checked': {
        color: '#D63548',
    }
}
const requestIputs = DefaultInputs.requestInputs;
const CompaintsIputs = DefaultInputs.Complaint;

const RaiseTicket = ({ handleShow, showIt, data }: any) => {
    const dispatch = useAppDispatch()
    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { t } = useLocales()

    const { user } = useSelector((state: any) => state.auth || {});

    const { register, handleSubmit, formState, control, getValues, setValue, reset } = useForm<any>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(raiseTikcetSchema),
    });
    const [type, settype] = useState('2');
    const [ticketNumber, setNumber] = useState('');

    useEffect(() => {
        reset();
        if (user) {
            setValue('contactPerson', `${user[apiVrbls.USER.FIRST_NAME]}`);
            setValue('customerNumber', user[apiVrbls.USER.PHONE]);
            setValue('emailId', user[apiVrbls.USER.EMAIL_ID]);
        }
        setFilesUploaed([])
    }, [showIt])
    const shiftType = (type: any) => {
        setValue('listofValues', '')
        settype(type);
    }


    const [fileError, setFileError] = useState(false);

    const openFiles = () => {
        document.getElementById('atachFiles')?.click();
    }
    const [filesUpload, setFilesUploaed] = useState<any>([]);

    const changeFile = (e: any) => {
        debugger;
        const a =filesUpload;
        const body = AttachFilesBody({
            ticketId: "HARDCODED",
            file: e.target.files[0]
        });
        if (e.target.files[0].size >= CONFIG_VALUES.maxFileSize) {
            setFileError(true);
        } else {
            setFileError(false);
            dispatch(createAtachmentApiCall(body, (status: any, data: any) => {
                setFilesUploaed((s: any) => ([...s, `${e.target.files[0].name}`]))
            }));
        }
    }

    const submitHandler = () => {
        const fv = getValues();
        const body = RaiseTicektBillingInvoiceBody({
            ...fv,
            issueType: type == '2' ? 'Complaint' : 'request'
        })
        dispatch(raiseTicketApiCall(body, (status: boolean, data: any) => {
            if (status) {
                setNumber(data);
                handleShow(false);
                setSuccess(true);
            } else {
                setShowError(true);
            }
        }))
    }

    return (
        <>
            <Box sx={{
                bgcolor: '#fff',
                boxShadow: 24,
                height: 'calc(100vh - 90px)',
                position: 'fixed',
                top: '90px',
                right: 0,
                bottom: 0,
                width: '50%',
                zIndex: 1000,
                overflowY: 'auto',
                transition: 'transform 350ms 0ms ease-in',
                transform: `translateX(${showIt ? 0 : 100}%)`
            }} className='sliderBoxWidth'>
                <CloseIcon onClick={handleShow} className='closer'
                    sx={{
                        position: 'absolute',
                        top: '40px',
                        right: '40px',
                        fontSize: '30px',
                        zIndex: '999',
                        opacity: '0.5',
                        transition: 'all 0.5s ease-in-out',
                        '&:hover': {
                            cursor: 'pointer',
                            opacity: '1',
                        },
                    }} />
                {showIt &&
                    <Stack className='customScroll'>



                        <Typography
                            variant='h5'
                            component="h1"
                            className="raise-ticket--typography title-small pmtext1"
                            sx={{
                                maxWidth: 'unset',
                                textAlign: 'left',
                                mb: '40px',
                                padding: 0,
                                fontSize: '24px',
                                lineHeight: '22px',
                                fontWeight: 700,
                                fontFamily: 'ubuntu',
                                marginBottom: '40px',
                                letterSpacing: '-0.96px',
                            }}
                        >{t<string>('RaiseaTicket')}</Typography>
                        <Typography className='lighttext0' sx={{
                            padding: '0px',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: 400,
                            fontFamily: 'ubuntu',

                        }}>{t<string>('InvoiceNumber')}</Typography>
                        <Typography variant='h5'
                            component="h1"
                            className="raise-ticket--typography title-small pmtext1"
                            sx={{
                                maxWidth: 'unset',
                                textAlign: 'left',
                                mb: '40px',
                                padding: 0,
                                fontSize: '24px',
                                lineHeight: '22px',
                                fontWeight: 700,
                                fontFamily: 'ubuntu',
                                marginBottom: '40px',
                                letterSpacing: '-0.96px',
                                mt: '0px',
                            }}>{data[apiVrbls.BILLING.INVOICE_ID]}</Typography>

                        <Box className='basicModule' >
                            <Grid container spacing={2} className="">
                                <Grid item xs={6}>
                                    <CommonInput
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                background: 'red',
                                            }
                                        }}

                                        register={{ ...register('disputeTo') }}
                                        label={'serviceref'}
                                        fieldName={'disputeTo'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <CommonInput
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                background: 'red',
                                            }
                                        }}

                                        register={{ ...register('disputeOptimusAmount') }}
                                        label={'disputeamount'}
                                        fieldName={'disputeOptimusAmount'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box className='basicModule' sx={{
                            mt: '20px', mb: '0px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <Stack>
                                <Typography
                                    variant='h5'
                                    component="h1"
                                    className="raise-ticket--typography title-small pmtext1"
                                    sx={{
                                        maxWidth: 'unset',
                                        textAlign: 'left',
                                        mb: '40px',
                                        padding: 0,
                                        fontSize: '24px',
                                        lineHeight: '22px',
                                        fontWeight: 700,
                                        fontFamily: 'ubuntu',
                                        letterSpacing: '-0.96px',
                                        marginBottom: '15px',
                                        mt: '0px',
                                        marginRight: '50px'
                                    }}
                                >
                                    {t<string>('issuetype')} :

                                </Typography>
                            </Stack>
                            <Box className='basicModule'>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value={'1'} control={<Radio checked={type == '1'} onClick={() => (shiftType('1'))} sx={radioClr} />} label={t<string>('Request')} />
                                        <FormControlLabel value={'2'} control={<Radio checked={type == '2'} onClick={() => (shiftType('2'))} sx={radioClr} />} label={t<string>('Complaint')} />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>


                        <Box className='basicModule' sx={{
                            mt: '20px',
                        }}>
                            <Grid container spacing={1} className="">
                                <Grid item xs={12}>
                                    {type == '1' &&
                                        <DropDownInput
                                            register={{ ...register('listofValues') }}
                                            label={'listofValues'}
                                            data={requestIputs}
                                            fieldName={'listofValues'}
                                            formState={formState}
                                            typeName={'dropdown'}
                                        />
                                    }
                                    
                                    {type == '2' &&
                                        <DropDownInput
                                            register={{ ...register('listofValues') }}
                                            label={'listofValues'}
                                            data={CompaintsIputs}
                                            fieldName={'listofValues'}
                                            formState={formState}
                                            typeName={'dropdown'}
                                        />
                                    }

                                </Grid>
                            </Grid>
                        </Box>





                        <Box className='basicModule'>
                            <Grid container spacing={2} className="">
                                <Grid item xs={12}>
                                    <TextArea
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                background: 'red',
                                            },
                                            '& .MuiInputBase-root': {
                                                height: '100px',
                                            },
                                        }}
                                        className="describeTextarea"
                                        register={{ ...register('notesIssueDescription') }}
                                        label={`describe`}
                                        fieldName={'disputenotesIssueDescriptionOptimusAmount'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box className='' style={{ position: 'relative' }}>

                            <Box className='basicModule' sx={{ mt: '20px', mb: '20px' }}>
                                <Stack>
                                    <Typography
                                        variant='h5'
                                        component="h1"
                                        className="raise-ticket--typography title-small pmtext1"
                                        sx={{
                                            maxWidth: 'unset',
                                            textAlign: 'left',
                                            mb: '40px',
                                            padding: 0,
                                            fontSize: '24px',
                                            lineHeight: '22px',
                                            fontWeight: 700,
                                            fontFamily: 'ubuntu',
                                            marginBottom: '0px',
                                            letterSpacing: '-0.96px',
                                            mt: '0px',
                                        }}
                                    >
                                        {t<string>('Attachments')} :
                                    </Typography>
                                </Stack>
                            </Box>
                            <Stack direction='row' spacing={2}>
                                <Button
                                    className='secondaryButton'
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => { openFiles() }}
                                >
                                    <AttachFileIcon /> {t<string>('attachFiles')}
                                </Button>
                                {fileError &&
                                    <p className="text-error"
                                        style={{
                                            left: '-15px',
                                            bottom: '-24px',
                                            fontSize: '11px',
                                        }}
                                    > <span style={{ position: 'relative', top: '7px' }}><ErrorIcon /></span> {"file should be less than 5mb"}</p>
                                }
                                <input onChange={(e: any) => changeFile(e)} type="file" id="atachFiles" hidden />

                            </Stack>
                        </Box>

                        <Box className='basicModule' sx={{ mt: '10px', mb: '30px' }}>
                            <Grid container spacing={2} className="">
                                {filesUpload.map((s: any, i: any) => {
                                    return <Grid key={`filekey${i}`} item xs={3}>
                                        <Box component='span' className='attachmentBox'><InsertDriveFileIcon />
                                            <span className='fileName'>{s}</span>
                                        </Box>
                                    </Grid>
                                })}
                            </Grid>
                        </Box>

                        <Box className='basicModule' sx={{ mt: '10px', mb: '30px' }}>
                            <Stack>
                                <Typography
                                    variant="h5"
                                    component="h1"
                                    sx={{
                                        maxWidth: 'unset',
                                        textAlign: 'left',
                                        mb: '40px',
                                        padding: 0,
                                        fontSize: '24px',
                                        lineHeight: '22px',
                                        fontWeight: 700,
                                        fontFamily: 'ubuntu',
                                        marginBottom: '0px',
                                        letterSpacing: '-0.96px',
                                        mt: '0px',
                                    }}
                                    className="raise-ticket--typography title-small pmtext1"
                                >
                                    {t<string>('contactPerson')}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box className='basicModule hoverCtaModule' >
                            <Grid container spacing={2} className="">
                                <Grid item xs={4}>
                                    <CommonInput
                                        intiValue={user[apiVrbls.USER.FIRST_NAME]}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                background: 'red',
                                            }
                                        }}

                                        register={{ ...register('contactPerson') }}
                                        label={'contactPerson'}
                                        fieldName={'contactPerson'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                                <Grid item xs={4} style={{ paddingTop: '7px' }}>
                                    <PhoneInputComp
                                        intiValue={user[apiVrbls.USER.PHONE]}
                                        register={{ ...register('customerNumber') }}
                                        label={'adduserMobile'}
                                        fieldName={'customerNumber'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                        onValueChange={(value: any) => {
                                            setValue("customerNumber", value, { shouldValidate: true })
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CommonInput
                                        intiValue={user[apiVrbls.USER.EMAIL_ID]}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                background: 'red',
                                            }
                                        }}

                                        register={{ ...register('emailId') }}
                                        label={'emailId'}
                                        fieldName={'emailId'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                            </Grid>
                            {/* <div className="ctaWrapper">
                                <button type='button'><EditIcon /></button>
                                <button type='button'><DeleteIcon /></button>
                            </div> */}
                        </Box>

                        <Box className='sidebarCta-fixed' sx={{
                            mt: '96px',
                        }}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    onClick={() => { submitHandler() }}
                                    className={`${(!formState.isValid) ? 'disabledCs' : 'XXXXXXXX'}`}
                                    variant="contained"
                                    color="error"
                                    sx={{
                                        textTransform: 'uppercase',
                                        borderRadius: '23px',
                                        paddingX: '48px',
                                        pt: '10px',
                                        pb: '8px',
                                        fontFamily: 'ubuntu',
                                    }}
                                >
                                    {t<string>('RaiseTikcet')}

                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{
                                        textTransform: 'uppercase',
                                        borderRadius: '23px',
                                        paddingX: '48px',
                                        pt: '10px',
                                        pb: '8px',
                                        color: '#092133',
                                        fontFamily: 'ubuntu',
                                    }}
                                    onClick={handleShow}
                                >
                                    {t<string>('cancel')}
                                    <span style={{ display: 'none' }}>  {JSON.stringify(!formState.isValid)}</span>
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                }
            </Box >
            <ModalErrorSlider data={{ text: t<string>('unableToRaiseTicket') }} showError={showError} setShowError={setShowError} />
            <ModalSuccessSlider data={{ MsgCmp: <>Ticket has been raised for ticket number <span className='bolder-text'>{ticketNumber}</span> we will get back to you shortly .</> }} open={success} setOpen={setSuccess} />

        </>
    )
}

export default RaiseTicket
