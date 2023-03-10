import { SyntheticEvent, useEffect, useState } from 'react'
import {
    Box,
    Stack,
    Badge,
    Avatar,
    Button,
    Grid,
} from '@mui/material'
import AvatarBg from '../../../assets/images/avatar-bg.png'
import { useSelector, useDispatch } from '../../../redux/store'
import { updateUserDetails } from '../../../redux/slices/accountSlice'
import { getuserInfo } from '../../../redux/slices/authSlice'
import useLocales from '../../../hooks/useLocales'
import { PhoneInputComp } from '../../common/elements/phoneInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userEditFormSchem } from '../../../utils/yupschemas'
import { CommonInput } from '../../common/elements/CommonInput'
import { DropDownInput } from "../../common/elements/DropDownInput"
import { apiVrbls, DefaultInputs } from '../../../utils/constants'
import { UpdateUserBody } from '../../../utils/ApiRequestbody'

const AccountAvatar = () => {
    const { t } = useLocales()
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.auth || {})
    const [firstname, setFirstname] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [timezone, setTimezone] = useState('')
    const [communication, setCommunication] = useState('')
    const [editable, setEditable] = useState<boolean>(true)

    const allCommunicationModes = DefaultInputs.allCommunicationModes;
    const allTimeZones = DefaultInputs.allTimeZones;

    const { register, formState, getValues, setValue } = useForm<any>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(userEditFormSchem),
    });

    useEffect(() => {
        dispatch(getuserInfo(user[apiVrbls.USER.MODULE.EMAIL_ID]))
        if (user) {
            setValue("firstname", user[apiVrbls.USER.MODULE.FIRST_NAME]);
            setValue("lastName", user[apiVrbls.USER.MODULE.LAST_NAME]);
            setValue("phoneNumber", user[apiVrbls.USER.MODULE.PHONE]);
            setValue("preferredCommunicationMode", user[apiVrbls.USER.MODULE.COMMUNICATON]);
            setValue("timezone", user[apiVrbls.USER.MODULE.TIMEZONE]);
            setFirstname(user[apiVrbls.USER.MODULE.FIRST_NAME]);
            setLastName(user[apiVrbls.USER.MODULE.LAST_NAME]);
            setPhoneNumber(user[apiVrbls.USER.MODULE.PHONE]);
            setTimezone(user[apiVrbls.USER.MODULE.TIMEZONE]);
            setCommunication(user[apiVrbls.USER.MODULE.COMMUNICATON]);
        }
    }, [dispatch])

    const isFormChanged = () => {
        return `${user[apiVrbls.USER.MODULE.FIRST_NAME]}-${user[apiVrbls.USER.MODULE.LAST_NAME]}-${user[apiVrbls.USER.MODULE.PHONE]}-${user[apiVrbls.USER.MODULE.TIMEZONE]}-${user[apiVrbls.USER.MODULE.COMMUNICATON]}` ==
            `${firstname}-${lastName}-${phoneNumber}-${timezone}-${communication}`
    }

    const editUserDetails = async (e: SyntheticEvent) => {
        const d = getValues();
        e.preventDefault()
        const body = {
            emailId: user[apiVrbls.USER.MODULE.EMAIL_ID],
            firstname: d.firstname,
            lastname: d.lastName,
            phoneNumber: phoneNumber,
            zoneinfo: d.timezone,
            preferredCommunicationMode: d.preferredCommunicationMode,
        }
        const apiBody = UpdateUserBody(body)
        await dispatch(updateUserDetails(apiBody))
        await dispatch(getuserInfo(user[apiVrbls.USER.MODULE.EMAIL_ID]))
        setEditable(true)
    }

    const resetDetails = () => {
        setEditable(!true)
    }
    return (
        <>
            <Box
                id="select-entity-form"
                className="bd-single-content"
                sx={{
                    bgcolor: '#fff',
                    height: 1,
                    borderRadius: '20px',
                    py: '52px',
                    px: '50px',
                    backgroundImage: `url(${AvatarBg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                }}
            >
                <Box
                    sx={{
                        mb: '36px',
                    }}
                >
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                            <Avatar className="avatar-initials"
                                sx={{
                                    width: '156px',
                                    height: '156px',
                                }}>
                                {/* <PersonSharpIcon /> */}
                                {`${user[apiVrbls.USER.MODULE.FIRST_NAME]}`.charAt(0) + `${user[apiVrbls.USER.MODULE.LAST_NAME]}`.charAt(0) || null}
                            </Avatar>
                        </Badge>
                    </Stack>
                </Box>
                <Box className='basicModule' ></Box>

                <form>
                    <Stack>
                        <Box>
                            <Box>
                                <Grid container spacing={2} className="">
                                    <Grid item xs={6} style={{ padding: '0px 10px' }}>
                                        <CommonInput
                                            size={'sm'}
                                            register={{ ...register('firstname') }}
                                            label={'firstName'}
                                            fieldName={'firstname'}
                                            formState={formState}
                                            readonly={editable}
                                            typeName={'dropdown'}
                                            intiValue={user[apiVrbls.USER.MODULE.FIRST_NAME]}
                                            onValueChange={setFirstname}
                                        />
                                    </Grid>
                                    <Grid item xs={6} style={{ padding: 0 }}>
                                        <CommonInput
                                            size={'sm'}
                                            register={{ ...register('lastName') }}
                                            label={'lastName'}
                                            fieldName={'lastName'}
                                            formState={formState}
                                            readonly={editable}
                                            typeName={'dropdown'}
                                            intiValue={user[apiVrbls.USER.MODULE.LAST_NAME]}
                                            onValueChange={setLastName}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ marginTop: '15px' }}>
                                <Grid container spacing={2} className="">
                                    <Grid item xs={6} style={{ padding: '0px 10px' }}>

                                        <DropDownInput
                                            readonly={editable}
                                            register={{ ...register('timezone') }}
                                            label={'timezone'}
                                            data={allTimeZones}
                                            fieldName={'timezone'}
                                            formState={formState}
                                            typeName={'dropdown'}
                                            intiValue={user[apiVrbls.USER.MODULE.TIMEZONE]}
                                            size={'sm'}
                                            onValueChange={setTimezone}
                                            short={true}
                                        />
                                    </Grid>
                                    <Grid item xs={6} style={{ padding: 0 }}>
                                        <DropDownInput
                                            readonly={editable}
                                            show={true}
                                            register={{ ...register('preferredCommunicationMode') }}
                                            label={'communication'}
                                            data={allCommunicationModes}
                                            fieldName={'preferredCommunicationMode'}
                                            formState={formState}
                                            typeName={'dropdown'}
                                            intiValue={user[apiVrbls.USER.MODULE.COMMUNICATON]}
                                            onValueChange={setCommunication}
                                            size={'sm'}
                                            short={true}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box style={{ marginTop: '15px' }}>
                                <Grid container spacing={2} className="">
                                    <Grid item xs={12} style={{ padding: '0px 0px 0px 10px' }}>
                                        <PhoneInputComp
                                            register={{ ...register('phoneNumber') }}
                                            label={'mobileNo'}
                                            fieldName={'phoneNumber'}
                                            formState={formState}
                                            typeName={'dropdown'}
                                            intiValue={user[apiVrbls.USER.MODULE.PHONE]}
                                            readonly={editable}
                                            onValueChange={(d: any) => {
                                                setValue('preferredCommunicationMode', getValues().preferredCommunicationMode, { shouldTouch: true })
                                                setPhoneNumber(d)
                                            }}
                                            size={'sm'}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Stack>
                    <span style={{ display: 'none' }}>{JSON.stringify(isFormChanged())},{JSON.stringify(!formState.isValid)}</span>
                    <Box className='basicModule' ></Box>
                    <Box className='basicModule' ></Box>
                    <Button
                        color="error"
                        variant="outlined"
                        type="button"
                        id="button-edit"
                        disabled={!editable ? (isFormChanged() || !formState.isValid) : false}
                        onClick={!editable ? editUserDetails : resetDetails}
                        sx={{
                            textTransform: 'uppercase',
                            borderRadius: '100px',
                            width: 1,
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
                        }}
                    >
                        {!editable ? t<string>('save') : t<string>('editPersonalDetails')}
                    </Button>
                </form>
            </Box>
        </>
    )
}

export default AccountAvatar
