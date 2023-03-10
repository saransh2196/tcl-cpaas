import { useEffect, useState } from 'react'
import { login, resetLoginParms } from '../../redux/slices/authSlice'
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from '../../redux/store'
import { Link, useNavigate } from 'react-router-dom'
import {
    Box,
    styled,
    Button,
    ButtonProps,
    FormGroup,
    FormControl,
} from '@mui/material'
import { purple } from '@mui/material/colors'
import useLocales from '../../hooks/useLocales'
import { getFromLocalStorage, setInLocalStorage } from '../../hooks/useLocalStorage'
import { apiVrbls, appRoutes, localStorageVar } from '../../utils/constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { PrimaryInput } from '../common/elements/PrimaryInput'
import { validateEmail } from '../../utils/helpers'
import { LoginFormSchema } from '../../utils/yupschemas'
import { FormProvider, RHFTextField } from '../hook-form'
import { useTranslation } from 'react-i18next'
import { base64Encode } from '../../utils/Base64EncodeDecode'
import { LoginBody } from '../../utils/ApiRequestbody'



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

const Login = () => {
    const { i18n } = useTranslation()
    const { t } = useLocales()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user, isError, isAuthenticated, resetmessage } = useAppSelector((state: any) => state.auth || {})
    const [showError, setShowError] = useState(false)
    const [val, setVal] = useState('')

    useEffect(() => {
        setInLocalStorage('i18nextLng', 'English')
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(resetLoginParms())
        }
        if (getFromLocalStorage(localStorageVar.TOKEN_VAR) && getFromLocalStorage(localStorageVar.TOKEN_VAR) !== null) {
            if (user) {
                if (user[apiVrbls.USER.IS_LOGGED_IN_FIRST]) {
                    navigate(appRoutes.SET_PASSWORD)
                } else {
                    navigate(appRoutes.DASHBOARD)
                }
            }
        }
    }, [user, navigate, isAuthenticated, dispatch])

    const { register, handleSubmit, formState, control, getValues } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(LoginFormSchema),
    });
    const DoLogin = (d: any) => {
        const userDetails: any = LoginBody({
            username: d.user,
            password: base64Encode(d.password),
        })
        try {
            dispatch(login(userDetails, setShowError))
        } catch (error) {
            error ? setShowError(true) : ""
        }
    }

    return (
        <>
            <Box
                sx={{ flexGrow: 1 }}
                id="login-form"
                className="account__form login-form">
                <div className="form__inner">
                    <Box sx={{ width: 1 }} className="account__form__header">
                        <h3 className="title">{t<string>('login')}</h3>
                        {/* <span className="box-help-text">{t<string>('enterEmailIdPassword')}</span> */}
                    </Box>
                    <Box sx={{ width: 1 }} className="account__form__error">
                        <p className="error__msg">
                            {showError ? (<p>{t<string>('yourEmailIdPasswordNotMatch')}</p>) : ('')}
                        </p>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} className="account__form__body">
                        <FormProvider onSubmit={handleSubmit((d) => DoLogin(d))}>
                            <FormGroup>
                                {/* Email id Input */}
                                <PrimaryInput
                                    register={{ ...register('user') }}
                                    classNameInput={"input-field"}
                                    label={'enterYourEmailID'}
                                    fieldName={'user'}
                                    formState={formState}
                                    typeName={'email'}
                                    onInput={setVal}
                                    variantForInput={"standard"}
                                    sxForInput={{ width: 1, borderRadius: '10px !important', border: 'none !important' }}
                                    dataTestId='email-element'
                                />
                                {/* Password Input */}
                                <PrimaryInput
                                    register={{ ...register('password') }}
                                    classNameInput={"input-field"}
                                    label={'password'}
                                    fieldName={'password'}
                                    formState={formState}
                                    typeName={'password'}
                                    variantForInput={"standard"}
                                    sxForInput={{ width: 1, borderRadius: '10px !important', border: 'none !important' }}
                                    dataTestId='password-element'
                                />
                                <FormControl
                                    className="input-wrapper password-checkHide no-margin fp-margin"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        position: 'relative',
                                        width: 1,
                                        margin: '20px 0px',
                                    }}>
                                    <Link
                                        to={appRoutes.FORGOT_PASSWORD}
                                        id={appRoutes.FORGOT_PASSWORD}
                                        className="forgot-password"
                                        style={{ width: 'max-content', fontFamily: 'ubuntu' }}>
                                        {t<string>('forgotPassword')}
                                    </Link>
                                </FormControl>
                                {/* Login Button */}
                                <FormControl
                                    className="input-wrapper submitBtn"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        position: 'relative',
                                        width: 1,
                                        marginTop: '50px',
                                    }}>
                                    <ColorButton
                                        type="submit"
                                        id="btn-enable-style"
                                        data-testid="button-element"
                                        variant="contained"
                                        className={`customBtn-01 ${(validateEmail(val)) ? 'btn-enable-style' : 'no-pointers'} `}
                                        sx={{
                                            fontSize: '18px',
                                            lineHeight: '21px',
                                            fontFamily: 'ubuntu',
                                            letterSpacing: '-0.72px',
                                        }}
                                    >
                                        {t<string>('loginBtn')}
                                    </ColorButton>
                                </FormControl>
                            </FormGroup>
                        </FormProvider>
                    </Box>
                </div>
            </Box>
            {/* {showError ? <ModalLoginError showError={showError} setShowError={setShowError} /> : null} */}
        </>
    )
}
export default Login
