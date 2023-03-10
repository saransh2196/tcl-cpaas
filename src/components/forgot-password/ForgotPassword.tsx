import { useEffect, useState } from 'react'
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from '../../redux/store'
import { Email } from '../../types/authType'
import { forgotPassword, resetForgotPaswordPrms } from '../../redux/slices/authSlice'
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
import ModalMail from '../modals/ModalMail'
import { PrimaryInput } from '../common/elements/PrimaryInput'
import { validateEmail } from '../../utils/helpers'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ForgotPasswordSchema } from '../../utils/yupschemas'
import { FormProvider, RHFTextField } from '../hook-form'
import { foirGotPasswordBody } from '../../utils/ApiRequestbody'

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

const ForgotPassword = () => {

    const { forgotPassEmail } = useAppSelector((state: any) => state.auth)
    const dispatch = useAppDispatch()
    const { t } = useLocales()
    const [val, setVal] = useState('')

    const { register, handleSubmit, formState, getValues } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(ForgotPasswordSchema),
    });
    const forgotPass = (d: any) => {
        const emailData: any = foirGotPasswordBody({ email: getValues().user })
        dispatch(forgotPassword(emailData))
    }

    useEffect(() => {
        dispatch(resetForgotPaswordPrms())
    }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1 }} id="login-form" className="account__form">
                <div className="form__inner">
                    <Box sx={{ width: 1 }} className="account__form__header">
                        <h3 className="title">{t<string>('forgotPassword')}</h3>
                        <span className="box-help-text">{t<string>('forgotPassHelpTxt')}</span>
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, paddingTop: '0 !important' }}
                        className="account__form__body"
                    >
                        <FormProvider onSubmit={handleSubmit((d) => forgotPass(d))}>
                            <FormGroup>
                                {/* Email Input feilds */}
                                <PrimaryInput
                                    register={{ ...register('user') }}
                                    label={'enterYourRegisteredEmailId'}
                                    classNameInput={"input-field"}
                                    fieldName={'user'}
                                    formState={formState}
                                    typeName={'email'}
                                    onInput={setVal}
                                    variantForInput={"standard"}
                                    sxForInput={{ width: 1, borderRadius: '10px !important', border: 'none !important' }}
                                    dataTestId='email-element'
                                />
                                {/* submit button */}
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
                                        {t<string>('getLink')}
                                    </ColorButton>
                                </FormControl>
                            </FormGroup>
                        </FormProvider>
                    </Box>
                </div>
            </Box>
            <ModalMail modalData={{ email: getValues().user, action: forgotPass }} open={forgotPassEmail} setOpen={(status: any) => { dispatch(resetForgotPaswordPrms()) }} />
        </>
    )
}

export default ForgotPassword
