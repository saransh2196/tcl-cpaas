import { useState } from 'react'
import { BreadCrums } from '../common/elements/BreadCrum'
import { apiVrbls, breadCrums } from '../../utils/constants'
import {
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from '../../redux/store'
import { Password } from '../../types/authType'
import { changePassword } from '../../redux/slices/authSlice'
import { Typography } from '@mui/material'
import {
    Box,
    styled,
    Button,
    ButtonProps,
    FormGroup,
    FormControl,
} from '@mui/material'
import { FormProvider } from '../hook-form'
import { purple } from '@mui/material/colors'
import useLocales from '../../hooks/useLocales'

import { PrimaryInput } from '../common/elements/PrimaryInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordSchema, ForgotPasswordSchema } from '../../utils/yupschemas'
import { base64Encode } from '../../utils/Base64EncodeDecode'
import { useNavigate } from 'react-router-dom'
import ModalPassChanged from '../modals/ModalPassChanged'
import { ChangePasswordBody } from '../../utils/ApiRequestbody'

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


export const ChangePassword = ({ toggleTheme }: { toggleTheme: any }) => {
    const { dashBoardWidth } = useAppSelector((state: any) => state.common);
    const { user } = useAppSelector((state: any) => state.auth);
    const navigate = useNavigate()
    const [oldPassval, setOldPassVal] = useState('');
    const [newPassval, setNewPassVal] = useState('');
    const [cnfPass, setCnfPass] = useState('');
    const [success, setSuccess] = useState(false)

    const dispatch = useAppDispatch()
    const { t } = useLocales()

    const { register, handleSubmit, formState, control, getValues } = useForm<any>({
        mode: "onChange",
        resolver: yupResolver(changePasswordSchema),
    });
    const changePass = (d: any) => {
        try {
            const userPassword: Password = ChangePasswordBody({
                oldPassword: base64Encode(d.oldPassword),
                newPassword: base64Encode(d.newPass),
                username: user[apiVrbls.USER.EMAIL_ID]
            })
            dispatch(changePassword(userPassword))
            setSuccess(true)

        } catch (error) {
            console.error(error)
        }
    }
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div >
            <div className="Layout__content" style={{
                marginLeft: `${dashBoardWidth}`, width: `calc(100% - ${dashBoardWidth}.split('p')[0]}px`
            }}>
                <div className="content__header">
                    <BreadCrums data={breadCrums.CHANGE_PASSWORD} />
                </div>
                <Typography
                    className="helper__title"
                    variant="body1"
                    sx={{
                        fontFamily: 'ubuntu',
                        letterSpacing: 0,
                        opacity: 0.6,
                        mt: '20px',
                    }}
                >
                    {t<string>('changePasswordInstruction')}
                </Typography>

                {/* form starts here */}
                <Box sx={{ flexGrow: 1 }} id="login-form" className="account__form change-password-form">
                    <div className="form__inner">
                        <Box
                            sx={{ flexGrow: 1, paddingTop: '0 !important' }}
                            className="account__form__body"
                        >
                            <FormProvider onSubmit={handleSubmit((d) => changePass(d))}>
                                <FormGroup>
                                    {/* Email Input feilds */}
                                    <PrimaryInput
                                        register={{ ...register('oldPassword') }}
                                        label={'oldPassword'}
                                        classNameInput={"input-field"}
                                        fieldName={'password'}
                                        formState={formState}
                                        typeName={'password'}
                                        onInput={setOldPassVal}
                                        variantForInput={"standard"}
                                        sxForInput={{ width: 1, borderRadius: '10px !important', border: 'none !important' }}
                                        dataTestId='old-password-element'
                                    />
                                    <PrimaryInput
                                        register={{ ...register('newPass') }}
                                        label={'password'}
                                        classNameInput={"input-field"}
                                        fieldName={'newPass'}
                                        formState={formState}
                                        typeName={'password'}
                                        onInput={setNewPassVal}
                                        setpassword={true}
                                        variantForInput={"standard"}
                                        sxForInput={{ width: 1, borderRadius: '10px !important', border: 'none !important' }}
                                        dataTestId='new-password-element'
                                    />
                                    <PrimaryInput
                                        register={{ ...register('cnfPassword') }}
                                        label={'confirmPassword'}
                                        classNameInput={"input-field"}
                                        fieldName={'cnfPassword'}
                                        formState={formState}
                                        typeName={'password'}
                                        onInput={setCnfPass}
                                        variantForInput={"standard"}
                                        sxForInput={{ width: 1, borderRadius: '10px !important', border: 'none !important' }}
                                        dataTestId='confirm-password-element'
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
                                            className={`customBtn-01 ${((oldPassval != "") && (newPassval != "") && (newPassval == cnfPass) && !formState.errors.newPass) ? 'btn-enable-style' : 'no-pointers'} `}
                                            onClick={() => {
                                                setOpen(true);
                                            }}
                                        >
                                            {t<string>('done')}
                                        </ColorButton>
                                    </FormControl>
                                </FormGroup>
                            </FormProvider>
                        </Box>
                        {/* <Button href='/forgot-password'>Forgot Password?</Button> */}
                    </div>
                </Box>
            </div>
            {success ? <ModalPassChanged open={open} setOpen={setOpen} /> : ""}
        </div>
    )
}

export default ChangePassword
