import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPassword } from '../../redux/slices/authSlice'
import { Password } from '../../types/authType'
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from '../../redux/store'

import {
    Box,
    styled,
    Button,
    ButtonProps,
    FormGroup,
    FormControl,
    Typography
} from '@mui/material'
import { purple } from '@mui/material/colors'
import useLocales from '../../hooks/useLocales'
import { apiVrbls, appRoutes, typeVar } from '../../utils/constants'
import { base64Encode } from '../../utils/Base64EncodeDecode'
import { useNavigate } from 'react-router-dom'
import { PrimaryInput } from '../common/elements/PrimaryInput'
import { setPasswordSchema } from '../../utils/yupschemas'
import { FormProvider, RHFTextField } from '../hook-form'

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    height: '70px',
    width: '100%',
    borderRadius: '35px',
    mixBlendMode: 'luminosity',
    opacity: 0.5,
    '&:hover': {
        backgroundColor: purple[700],
    },
}))

interface State {
    amount: string
    password: string
    weight: string
    weightRange: string
    showPassword: boolean
}

const SetPassword = () => {
    const navigate = useNavigate()
    const [passval, setPassVal] = useState('');
    const [cnfPass, setcnfPass] = useState('');
    const { isError, isSuccess, message, user, resetmessage } = useAppSelector(
        (state: any) => state.auth || {}
    )
    const dispatch = useAppDispatch()
    const { t } = useLocales()

    if (resetmessage === "SUCCESS") {
        navigate(appRoutes.WELCOME)
    }
    const { register, handleSubmit, formState, control, getValues } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(setPasswordSchema),
    });
    const setPass = (d: any) => {
        try {
            const userPassword: Password = {
                newPassword: base64Encode(d.newPass),
                username: user[apiVrbls.USER.EMAIL_ID]
            }
            dispatch(resetPassword(userPassword))

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Box
                sx={{ flexGrow: 1 }}
                id="login-form"
                className="account__form login-form"
            >
                <div className="form__inner">
                    <Box sx={{ width: 1 }} className="account__form__header">
                        <h3 className="title">{t<string>('setPassword')}</h3>
                        <Typography
                            className="helper__title"
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'ubuntu',
                                letterSpacing: 0,
                                opacity: 0.6,
                            }}
                        >
                            {t<string>('generatePassword')}
                        </Typography>
                    </Box>
                    <Box sx={{ width: 1 }} className="account__form__error">
                        {/* <p className="error__msg">{message && message}</p> */}
                        <div style={{ position: 'relative', minHeight: '20px', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            {!formState.errors.newPass && !formState.errors.cnfPassword && passval != '' &&
                                <p className={passval !== cnfPass ? 'CnfPass error' : 'CnfPass success'}>
                                    {passval !== cnfPass ? `${t<string>('bothPasswordMustMatch')}` : `${t<string>('paswordsMatched')}`}
                                </p>
                            }
                        </div>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} className="account__form__body">
                        <FormProvider onSubmit={handleSubmit((d) => setPass(d))}>
                            <FormGroup>
                                <PrimaryInput
                                    register={{ ...register('newPass') }}
                                    label={'password'}
                                    classNameInput={"input-field"}
                                    fieldName={'newPass'}
                                    formState={formState}
                                    typeName={'password'}
                                    onInput={setPassVal}
                                    setpassword={true}
                                    variantForInput={"standard"}
                                    sxForInput={{ width: 1, borderRadius: '10px !important', border: 'none !important' }}
                                    dataTestId='password-element'
                                />
                                <PrimaryInput
                                    register={{ ...register('cnfPassword') }}
                                    label={'confirmPassword'}
                                    classNameInput={"input-field"}
                                    fieldName={'cnfPassword'}
                                    formState={formState}
                                    typeName={'password'}
                                    onInput={setcnfPass}
                                    variantForInput={"standard"}
                                    sxForInput={{ width: 1, borderRadius: '10px !important', border: 'none !important' }}
                                    dataTestId='confirm-password-element'
                                />
                                <FormControl
                                    className="input-wrapper submitBtn"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        position: 'relative',
                                        width: 1,
                                        marginTop: '50px',
                                    }}
                                >
                                    <ColorButton
                                        variant="contained"
                                        id="btn-enable-style"
                                        data-testid="button-element"
                                        type="submit"
                                        name="submit"
                                        sx={{
                                            fontSize: '18px',
                                            lineHeight: '21px',
                                            fontFamily: 'ubuntu',
                                            letterSpacing: '-0.72px',
                                        }}
                                        className={`customBtn-01 ${((passval != "") && (passval == cnfPass) && !formState.errors.newPass) ? 'btn-enable-style' : 'no-pointers'} `} >
                                        {t<string>('done')}
                                    </ColorButton>
                                </FormControl>
                            </FormGroup>
                        </FormProvider>
                    </Box>
                </div>
            </Box>
        </>
    )
}

export default SetPassword
