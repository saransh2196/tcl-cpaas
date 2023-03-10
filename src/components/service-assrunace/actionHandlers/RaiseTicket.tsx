import { useEffect, useState } from 'react'
import {
    Box,
    Stack,
    Typography,
    Button,
    Grid,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { raiseTikcetServiceSchema } from '../../../utils/yupschemas';
import { CommonInput } from '../../common/elements/CommonInput';
import { TextArea } from '../../common/elements/TextArea';
import { useDispatch as useAppDispatch, useSelector } from '../../../redux/store'
import { DropDownInput } from '../../common/elements/DropDownInput';
import { createAtachmentApiCall, raiseTicketServiceApiCall } from '../../../redux/slices/serviceAssurenceSlice';
import ModalSuccessSlider from '../../modals/ModalTicketRaised';
import ModalErrorSlider from '../../modals/ModalTicketError';
import useLocales from '../../../hooks/useLocales';
import { apiVrbls, CONFIG_VALUES, DefaultInputs } from '../../../utils/constants';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { PhoneInputComp } from '../../common/elements/phoneInput';
import ErrorIcon from '@mui/icons-material/Error';
import { AttachFilesBody, CreateTicketBodyServiceAssurence } from '../../../utils/ApiRequestbody';


const losinputs = DefaultInputs.TOTAL_LOSS_SERVICE_INPUTS;
const plinputs = DefaultInputs.PARTIAL_LOSS_IPUTS;
const NIinputs = DefaultInputs.NOIMPACT_INPUTS;
const impacts = DefaultInputs.IMPACTS;

const RaiseTicket = ({ handleShow, showIt }: any) => {
    const dispatch = useAppDispatch()
    const [showError, setShowError] = useState(false);
    const { user } = useSelector((state: any) => state.auth || {});
    const [success, setSuccess] = useState(false);
    const [fileError, setFileError] = useState(false);
    const { t } = useLocales()
    const { register, handleSubmit, formState, control, getValues, setValue, reset } = useForm<any>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(raiseTikcetServiceSchema),
    });
    const [type, settype] = useState('2');
    const [ticketNumber, setNumber] = useState('');
    const submitHandler = () => {
        const fv = getValues();
        const body = CreateTicketBodyServiceAssurence(fv)
        dispatch(raiseTicketServiceApiCall(body, (status: boolean, tikcetNumber: any) => {
            if (status) {
                setNumber(tikcetNumber);
                handleShow(false);
                setSuccess(true);
            } else {
                setShowError(true);
            }
        }))
    }
    useEffect(() => {
        if (user) {
            setValue('contactPerson', `${user[apiVrbls.USER.FIRST_NAME]}`);
            setValue('customerNumber', user[apiVrbls.USER.PHONE]);
            setValue('emailId', user[apiVrbls.USER.EMAIL_ID]);
        }
        setFilesUploaed([])
    }, [showIt])
    const shiftType = (type: any) => {
        settype(type);
    }
    const openFiles = () => {
        document.getElementById('atachFiles')?.click();
    }

    const [filesUpload, setFilesUploaed] = useState<any>([]);
    const [impct, setImpct] = useState<any>('');
    const impactchange = (e: any) => {
        setImpct(e);
        setValue('issuetype', '');
    }
    const changeFile = (e: any) => {
        const bdy = AttachFilesBody({ ticketId: "HARDCODED", file: e.target.files[0] })
        if (e.target.files[0].size >= CONFIG_VALUES.maxFileSize) {
            setFileError(true);
        } else {
            setFileError(false);
            dispatch(createAtachmentApiCall(bdy, (status: any, data: any) => {
                setFilesUploaed((s: any) => ([...s, `${e.target.files[0].name}`]))
            }));
        }
    }
    return (
        <>
            <Box sx={{
                boxShadow: 24,
                transform: `translateX(${showIt ? 0 : 100}%)`
            }} className='sliderBoxWidth'>
                <CloseIcon onClick={handleShow} className='closer' sx={{
                    '&:hover': {
                        cursor: 'pointer',
                    }
                }} />
                {showIt &&
                    <Stack className='customScroll'>

                        <Typography variant='h5' className='headtext0'> {t<string>('RaiseaTicket')}</Typography>

                        <Box className='basicModule' >
                            <Grid container spacing={1} className="">
                                <Grid item xs={6}>
                                    <CommonInput
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                background: 'red',
                                            }
                                        }}

                                        register={{ ...register('serviceIdentifier') }}
                                        label={'service'}
                                        fieldName={'serviceIdentifier'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <DropDownInput
                                        register={{ ...register('assetid') }}
                                        label={'assetid'}
                                        data={[{ name: 'Mock 1', value: 'Mock 1' }, { name: 'Mock 2', value: 'Mock 2' }]}
                                        fieldName={'assetid'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box className='basicModule' ></Box>

                        <Box className='basicModule' >
                            <Grid container spacing={2} className="">
                                <Grid item xs={6}>
                                    <DropDownInput
                                        register={{ ...register('impact') }}
                                        label={'impact'}
                                        data={impacts}
                                        fieldName={'impact'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                        onValueChange={impactchange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {impct == 'Total Loss of Service' && <DropDownInput
                                        register={{ ...register('issueType') }}
                                        label={'issuetype'}
                                        data={losinputs}
                                        fieldName={'issueType'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />}
                                    {impct == 'Partial Loss' && <DropDownInput
                                        register={{ ...register('issueType') }}
                                        label={'issuetype'}
                                        data={plinputs}
                                        fieldName={'issueType'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />}
                                    {impct == 'No Impact' && <DropDownInput
                                        register={{ ...register('issueType') }}
                                        label={'issuetype'}
                                        data={NIinputs}
                                        fieldName={'issueType'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className='basicModule' >

                        </Box>
                        <Box className='basicModule' >
                            <Grid container spacing={2} className="">
                                <Grid item xs={6}>
                                    <CommonInput
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                background: 'red',
                                            }
                                        }}

                                        register={{ ...register('messageID') }}
                                        label={'messageID'}
                                        fieldName={'messageID'}
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

                                        register={{ ...register('contact') }}
                                        label={'destinationno'}
                                        fieldName={'contact'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className='basicModule' ></Box>

                        <Box className='basicModule'>
                            <Grid container spacing={2} className="">
                                <Grid item xs={12}>
                                    <TextArea
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                background: 'red',
                                            }
                                        }}

                                        register={{ ...register('description') }}
                                        label={`describe`}
                                        fieldName={'description'}
                                        formState={formState}
                                        typeName={'dropdown'}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box className='basicModule' ></Box>
                        <Box className='' style={{ position: 'relative' }}>
                            <Box className='basicModule' sx={{ mt: '10px', mb: '0px' }}>
                                <Typography className='headtext2'> {t<string>('Attachments')} : </Typography>
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
                                            left: '172px',
                                            bottom: '14px',
                                            fontSize: '11px',
                                        }}
                                    > <span style={{ position: 'relative', top: '7px' }}><ErrorIcon /></span> {"file should be less than 5mb"}</p>
                                }
                                <input onChange={(e: any) => changeFile(e)} type="file" id="atachFiles" hidden />

                            </Stack>
                        </Box>

                        <Box className='basicModule' sx={{ mt: '20px', mb: '30px' }}>
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

                        <Box className='basicModule' sx={{ mt: '20px', mb: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                            <Stack>
                                <Typography
                                    variant="h5"
                                    component="h1"
                                    className="raise-ticket--typography title-small pmtext1"
                                >
                                    {t<string>('contactPerson')}
                                </Typography>
                            </Stack>
                            <Stack direction='row' justifyContent='flex-end' alignItems='center' className='pos-rel add-new-button' sx={{
                                marginTop: '0px',
                            }}>
                            </Stack>
                        </Box>
                        <Box className='basicModule hoverCtaModule' >
                            <Grid container spacing={2} className="">
                                <Grid item xs={4}>
                                    <CommonInput
                                        intiValue={user ? user[apiVrbls.USER_MANAGMENT.FIREST_NAME] : ''}
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
                                        intiValue={user ? user[apiVrbls.USER_MANAGMENT.PHONE_NUMBER] : ''}
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
                                        intiValue={user ? user[apiVrbls.USER_MANAGMENT.EMAIL_ID] : ''}
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
                                    className='secondaryButton'
                                    variant="outlined"
                                    color="error"
                                    onClick={handleShow}
                                >
                                    {t<string>('cancel')}
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                }
            </Box >
            <ModalErrorSlider data={{ text: "Unable to raise a service ticket" }} showError={showError} setShowError={setShowError} />
            <ModalSuccessSlider data={{ MsgCmp: <>Ticket has been raised for ticket number <span className='bolder-text'>{ticketNumber}</span> we will get back to you shortly .</> }} open={success} setOpen={setSuccess} />

        </>
    )
}

export default RaiseTicket
