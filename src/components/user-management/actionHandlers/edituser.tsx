import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Box,
    Stack,
    Typography,
    FormControl,
    Button,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from '../../../redux/store'
import { apiVrbls, DefaultInputs } from '../../../utils/constants'
import AddIcon from '@mui/icons-material/Add'
import ModalTicketError from '../../modals/ModalTicketError'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import { DropDownInput } from '../../common/elements/DropDownInput'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editUserSchema } from '../../../utils/yupschemas'
import { CommonInput } from '../../common/elements/CommonInput'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userLoginData } from '../../../services/api'
import { loadInputValues, edituserapiCall } from '../../../redux/slices/userManagmentSlice';
import {
    useDispatch as useAppDispatch
} from '../../../redux/store'
import ModalInviteSent from '../../modals/ModalInviteSent'
import { MultipleSelectInput } from '../../common/elements/MultipleSelectInput'
import useLocales from '../../../hooks/useLocales'
import { UpdateUserBody } from '../../../utils/ApiRequestbody'

const loaclInputGrid = {
    flexBasis: 'calc((100% - 60px)/2)',
    marginRight: '20px',
    marginBottom: '20px',
    '& .MuiInputBase-root': {
        height: '60px !important',
    }
};

const radioClr = {
    '&, &.Mui-checked': {
        color: '#D63548',
    }
}


const EditUser = ({ handleeditUser, edituser, data, setUpdateopen }: any) => {
    const { t } = useLocales();

    const dispatch = useAppDispatch()
    const [showError, setShowError] = useState(false);
    const [inviteSent, setinviteSent] = useState(false);
    const [roleType, setiroleType] = useState("");
    const [type, settype] = useState('1');
    const {
        MasterData = [],
        legalEntitiesInputs = [],
        servicesInputs = [],
        modulesInputs = []
    } = useSelector((state: any) => state.userManagemnt || {});
    const { user } = useSelector((state: any) => state.auth || {});
    const [disableds, setDisabled] = useState([false])

    const { register, handleSubmit, formState, control, getValues, setValue } = useForm<any>({
        defaultValues: {
            profiles: [{ entity: '', service: '', module: [] }]
        },
        mode: "onChange",
        resolver: yupResolver(editUserSchema),
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "profiles",
    });

    const addedNewProfile = () => {
        append({ entity: '', service: '', module: [] });
        setDisabled(d => ([...d, false]));
    }

    const SubmitEditUser = () => {
        const fv = getValues();
        const rback: any = [];
        fv.profiles.map((s: any) => {
            const entity = legalEntitiesInputs.filter((q: any) => q.id == s.entity)[0];
            const services = servicesInputs.filter((q: any) => q.id == s.service)[0];
            const modules = s.module.map((f: any) => {
                return modulesInputs.filter((q: any) => q.id == f)[0];
            })
            modules.map((d: any) => {
                rback.push(`${entity.id}:${entity.name}::${services.id}:${services.name}::${d.id}:${d.name}`)
            })
        })

        const body = UpdateUserBody({
            emailId: fv.username,
            username: fv.username,
            phoneNumber: fv.phonenumber,
            rbacprofile: {
                "name": fv.username,
                "accessPolicy": rback
            },
            role: roleType,
            accountName: user[apiVrbls.USER.ACCOUNT_NAME],
            status: fv.status
        })
        dispatch(edituserapiCall(body, (status: boolean) => {
            if (status) {
                handleeditUser(false);
                setUpdateopen(true);
            } else {
                setShowError(true);
            }
        }))


    }
    const [duplication, setduplication] = useState(false);

    const removeProfile = (index: any) => {
        if (disableds.length != 1) {
            remove(index);
            const o = [...disableds];
            o.splice(index, 1)
            setDisabled(o);
            setduplication(false);
        }
    }

    const handleEditMode = (index: any, item: any, mode: any) => {
        const d = getValues().profiles;
        if (d.filter((a: any) => (a.entity == d[index].entity) && a.service == d[index].service).length == 1) {
            if (Object.values(d[index]).filter((z: any) => z === '').length > 0 || d[index].module.length == 0) {
                removeProfile(index);
            } else {
                const o = [...disableds];
                o[index] = mode;
                setDisabled(o);
                setduplication(false);
            }
        } else {
            setduplication(true);
        }
    }

    const loaduserInfo = async (email: any) => {
        try {
            const { data } = await userLoginData.getUserInfo(email);
            if (data) {
                const pfls = data.profiles;
                remove();
                setDisabled([]);
                setTimeout(() => {
                    pfls.map((f: any) => {
                        append(f);
                        setDisabled(d => ([...d, true]));
                    });

                }, 200);
            } else {

            }
        } catch (e) {
            console.log(e);
        }
    }

    const shiftType = (type: any) => {
        setiroleType(type);
    }


    useEffect(() => {
        setValue('phonenumber', data[apiVrbls.USER_MANAGMENT.PHONE_NUMBER]);
        setValue('username', data[apiVrbls.USER_MANAGMENT.EMAIL_ID]);
        setiroleType(data[apiVrbls.USER_MANAGMENT.ROLE])
        loaduserInfo(data[apiVrbls.USER_MANAGMENT.EMAIL_ID]);
        dispatch(loadInputValues(null))
    }, [])


    return (
        <>
            <Box
                sx={{
                    bgcolor: '#fff',
                    boxShadow: 24,
                    height: 'calc(100vh - 90px)',
                    position: 'fixed',
                    top: '90px',
                    right: 0,
                    bottom: 0,
                    width: '50%',
                    padding: '56px',
                    zIndex: 1000,
                    overflowY: 'auto',
                    transition: 'transform 350ms 0ms ease-in',
                    transform: `translateX(${edituser ? 0 : 100}%)`,
                }}
                className="raise-ticket"
            >
                <CloseIcon
                    onClick={handleeditUser}
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
                    }}
                />
                <Stack className='raise-ticket--inputWrapper'>

                    <div className='customScroll'>

                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{
                                maxWidth: 'unset',
                                textAlign: 'left',
                                mb: '40px',
                                padding: 0,
                                fontSize: '32px',
                                lineHeight: '22px',
                                fontWeight: 700,
                                fontFamily: 'ubuntu',
                                marginBottom: '40px',
                                letterSpacing: '-1.28px',
                            }}
                            className="raise-ticket--typography title-main"
                        >
                            {t<string>('edituser')}
                        </Typography>



                        <Box className='basicModule'>
                            <Stack>
                                <Typography variant="h6" component="h2" className="labelText1">
                                    Name
                                </Typography>
                                <Typography variant="h6" component="h2" className="dispalytext1">
                                    {data.name}
                                </Typography>
                            </Stack>
                        </Box>


                        <Box sx={{ display: 'flex' }}>
                            <Box sx={loaclInputGrid} >
                                <CommonInput
                                    intiValue={data[apiVrbls.USER_MANAGMENT.EMAIL_ID]}
                                    sx={{
                                        padding: '20px',
                                        '& .MuiInputBase-input': {
                                            background: 'red',
                                        }
                                    }}

                                    register={{ ...register('username') }}
                                    label={'adduseremail'}
                                    fieldName={'username'}
                                    formState={formState}
                                    typeName={'dropdown'}
                                />
                            </Box>
                            <Box sx={loaclInputGrid} >
                                <CommonInput
                                    intiValue={data[apiVrbls.USER_MANAGMENT.PHONE_NUMBER]}
                                    register={{ ...register('phonenumber') }}
                                    label={'adduserMobile'}
                                    fieldName={'phonenumber'}
                                    formState={formState}
                                    typeName={'dropdown'}
                                />
                            </Box>
                            <Box sx={loaclInputGrid} >
                                <DropDownInput
                                    intiValue={data[apiVrbls.USER_MANAGMENT.STATUS]}
                                    register={{ ...register('status') }}
                                    label={'status'}
                                    data={DefaultInputs.UserStatus}
                                    fieldName={'status'}
                                    formState={formState}
                                    typeName={'dropdown'}
                                />
                            </Box>
                        </Box>

                        <Box className='basicModule' sx={{ mt: '20px', mb: '15px' }}>
                            <Stack>
                                <Typography
                                    variant="h5"
                                    component="h1"
                                    sx={{
                                        fontSize: '24px',
                                        lineHeight: '22px',
                                        fontWeight: '700',
                                        fontFamily: 'ubuntu',
                                        letterSpacing: '-0.96px',
                                    }}
                                    className="raise-ticket--typography title-small pmtext1"
                                >
                                    {t<string>('UserType')}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box className='basicModule'>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value={'User'} control={<Radio checked={roleType == 'User'} onClick={() => (shiftType('User'))} sx={radioClr} />} label={t<string>('User')} />
                                    <FormControlLabel value={'Admin'} control={<Radio checked={roleType == 'Admin'} onClick={() => (shiftType('Admin'))} sx={radioClr} />} label={t<string>('admin')} />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        <Box className='basicModule' sx={{ mt: '30px', mb: '20px', }}>
                            <Stack>
                                <Typography
                                    variant="h5"
                                    component="h1"
                                    sx={{
                                        fontSize: '24px',
                                        lineHeight: '22px',
                                        fontWeight: '700',
                                        fontFamily: 'ubuntu',
                                        letterSpacing: '-0.96px',
                                    }}
                                    className="raise-ticket--typography title-small pmtext1"
                                >
                                    {t<string>('ProfileDetail')}

                                </Typography>
                            </Stack>
                        </Box>



                        {/* {type == '1' && <Box sx={{ display: 'flex' }}>
                        <Box sx={{ ...loaclInputGrid, flexBasis: 'calc((100% - 60px)/3)' }}>
                            <DropDownInput
                                register={{ ...register('userValue') }}
                                label={'adduseprodile'}
                                data={MasterData.map((d: any) => ({ name: d[apiVrbls.USER_MANAGMENT.NAME], value: d[apiVrbls.USER_MANAGMENT.EMAIL_ID] }))}
                                fieldName={'userValue'}
                                formState={formState}
                                typeName={'dropdown'}
                                onValueChange={(email: any) => { loaduserInfo(email) }}
                            />
                        </Box>
                    </Box>} */}

                        <Box className='basicModule'>
                            <Stack>
                                <Typography variant="h6" component="h2" className="labelText1">
                                    {t<string>('account')}
                                </Typography>
                                <Typography variant="h6" component="h2" className="dispalytext1">
                                    {user[apiVrbls.USER.ACCOUNT_NAME]}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box className='basicModule' >
                            <Stack className="profile-details addUser-details" style={{ width: '100%' }}>
                                <Grid container spacing={2} className="spacinglarg">
                                    <Grid item xs={3}>
                                        <Typography variant="h6" component="h2" className="labelText1">
                                            {t<string>('LegalEntity')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" component="h2" className="labelText1">
                                            {t<string>('ServiceAccess')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h6" component="h2" className="labelText1">
                                            {t<string>('addusermodule')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                    </Grid>
                                </Grid>
                                {fields.map((item: any, index) => {
                                    return (
                                        <Stack
                                            style={{ padding: '10px 30px 0px 35px !important' }}
                                            key={item.id}
                                            direction="column"
                                            className="profile-detail--container addUser-detail--container"
                                        >
                                            <Grid container spacing={2} className="">
                                                <Grid item xs={3}>
                                                    <DropDownInput
                                                        intiValue={item.entity}
                                                        disabled={disableds[index]}
                                                        readonly={disableds[index]}
                                                        short={true}
                                                        register={{ ...register(`profiles.${index}.entity`) }}
                                                        label={'adduserLegEntity'}
                                                        data={legalEntitiesInputs.map((d: any) => ({ name: d.name, value: d.id }))}
                                                        fieldName={'role'}
                                                        formState={formState}
                                                        typeName={'dropdown'}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <DropDownInput
                                                        intiValue={item.service}
                                                        disabled={disableds[index]}
                                                        readonly={disableds[index]}
                                                        short={true}
                                                        register={{ ...register(`profiles.${index}.service`) }}
                                                        label={'adduserservice'}
                                                        data={servicesInputs.map((d: any) => ({ name: d.name, value: d.id }))}
                                                        fieldName={'role'}
                                                        formState={formState}
                                                        typeName={'dropdown'}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <MultipleSelectInput
                                                        intiValue={item.module}
                                                        disabled={disableds[index]}
                                                        short={true}
                                                        register={{ ...register(`profiles.${index}.module`) }}
                                                        label={'addusermodule'}
                                                        data={modulesInputs.map((d: any) => ({ name: d.name, value: d.id }))}
                                                        fieldName={'role'}
                                                        formState={formState}
                                                        typeName={'dropdown'}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>

                                                    {!disableds[index] ? <Box className="profile-detail edit-delete-icons" style={{ position: 'relative', top: '9px' }}>
                                                        <IconButton
                                                            className="icon-right"
                                                            color="primary"
                                                            aria-label="edit user details"
                                                            onClick={() => { removeProfile(index) }}
                                                        >
                                                            <ClearIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            className="icon-right"
                                                            color="primary"
                                                            aria-label="edit user details"
                                                            onClick={() => { handleEditMode(index, item, true) }}
                                                        >
                                                            <DoneIcon />
                                                        </IconButton>
                                                    </Box> : <Box className="profile-detail edit-delete-icons" style={{ position: 'relative', top: '9px' }}>
                                                        <IconButton
                                                            className="icon-right"
                                                            color="primary"
                                                            aria-label="edit user details"
                                                            onClick={() => { removeProfile(index) }}
                                                        >
                                                            <DeleteOutlineIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            className="icon-right"
                                                            color="primary"
                                                            aria-label="edit user details"
                                                            onClick={() => { handleEditMode(index, item, false) }}
                                                        >
                                                            <ModeEditOutlinedIcon />
                                                        </IconButton>
                                                    </Box>}

                                                </Grid>
                                            </Grid>
                                        </Stack>

                                    )
                                })}
                                <Stack direction='row' justifyContent='flex-end' alignItems='center' className='pos-rel  add-new-button'>

                                    {duplication && <p className='erroText'>Legal entity and service access combination should not duplicate.</p>}
                                    <Button className={`${disableds.includes(false) ? 'disabledCs' : 'XXXXXXXX'}`} onClick={() => { addedNewProfile() }} variant='outlined' color='error' startIcon={<AddIcon />} sx={{
                                        borderRadius: '20px',
                                    }}>{t<string>('AddNew')}</Button>
                                </Stack>
                            </Stack>
                        </Box>

                    </div>

                    <Box className='sidebarCta-fixed' sx={{
                        mt: '96px',
                    }}>
                        <Stack direction="row" spacing={2}>
                            <Button
                                onClick={() => { SubmitEditUser() }}
                                className={`${(disableds.includes(false) || !formState.isValid) ? 'disabledCs' : 'XXXXXXXX'}`}
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
                                {t<string>('Update')}
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
                                onClick={handleeditUser}
                            >
                                {t<string>('cancel')}
                                <span style={{ display: 'none' }}>{JSON.stringify(disableds.includes(false))} , {JSON.stringify(!formState.isValid)}</span>
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <ModalInviteSent inviteSent={inviteSent} setinviteSent={setinviteSent} email={getValues().username} />
            <ModalTicketError data={{ text: "Unable to edit user" }} showError={showError} setShowError={setShowError} />

        </>
    )
}

export default EditUser
