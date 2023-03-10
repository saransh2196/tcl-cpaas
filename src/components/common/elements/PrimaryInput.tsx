import { FormControl, Box, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import useLocales from '../../../hooks/useLocales'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { useEffect, useState } from 'react'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ErrorIcon from '@mui/icons-material/Error';
import { validateEmail } from '../../../utils/helpers'
import DoneIcon from '@mui/icons-material/Done';
import BigCheck from '../icons/bigCheck'
import ModerateCheck from '../icons/moderateCheck'
import CheckIcon from '@mui/icons-material/Check'
import LinearProgress from '@mui/material/LinearProgress'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    underline: {
        "&&&:before": {
            borderBottom: "solid 1px"
        },
        "&&:after": {
            borderBottom: "none !important"
        }
    }
});
export const PrimaryInput = ({ onChange, sxForInput, classNameInput, register, variantForInput, label, formState, fieldName, typeName, onInput, valueForInput, dataTestId, setpassword = false }: any) => {
    const { t } = useLocales();
    const classes = useStyles();
    const [val, setVal] = useState('');
    const [toolTipOpen, settoolTipOpen] = useState(false)
    const [values, setValues] = useState<any>({ showPassword: (typeName == 'email' || 'text') ? true : false })
    const getClassName = () => {
        if (typeName == 'email') {
            return "input-wrapper yes-margin";
        } else if (typeName == 'password') {
            return "input-wrapper password-checkHide no-margin"
        }
    }

    useEffect(() => {
        if (typeName === 'password') {
            setValues({ ...values, showPassword: !values.showPassword })
        }
    }, [])

    const iconstyle = { opacity: 0.5 }

    const getIcon = () => {
        if (typeName == 'email') {
            return <MailOutlineIcon id="mail-icon" style={iconstyle} />;
        } else if (typeName == 'password') {
            return <LockOpenIcon id="unlock-icon" style={iconstyle} />;
        } else {
            return null
        }
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const handlePasteChange = (e: any) => {
        e.preventDefault()
    }

    const passStrengthPerc = () => {
        let percent = 0;
        if (`${val}`.length >= 5) {
            percent = percent + 10
        }
        if (/[A-Z]/.test(val)) {
            percent = percent + 20
        }
        if (/[a-z]/.test(val)) {
            percent = percent + 20
        }
        if (/[@#&]/.test(val)) {
            percent = percent + 20
        }
        if (`${val}`.length >= 8) {
            percent = percent + 30
        }
        return percent;
    }

    const getbarColor = () => {
        if (passStrengthPerc() > 80) {
            return 'success'
        } else if (passStrengthPerc() >= 60) {
            return 'warning'
        } else if (passStrengthPerc() <= 59) {
            return 'error'
        }
    }

    return (
        <>
            <FormControl
                className={getClassName()}
                data-margin={true}
                id={fieldName}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    position: 'relative',
                    width: 1,
                    margin: '20px 0px',
                }}
            >
                <InputLabel
                    htmlFor={fieldName}
                    id="label__icon"
                    className="label__icon"
                >
                    {getIcon()}
                </InputLabel>
                <TextField
                    spellcheck="false"
                    className={classNameInput}
                    id={fieldName}
                    defaultValue={valueForInput}
                    onInput={(e: any) => {
                        setVal(e.target.value);
                        try {
                            if (setpassword == true) {
                                settoolTipOpen(true)
                            } else {
                                settoolTipOpen(false)
                            }
                            onInput(e.target.value);
                        } catch { }
                    }}
                    onChange={onChange}
                    label={t<string>(label)}
                    variant={variantForInput}
                    type={values.showPassword ? 'text' : 'password'}
                    {...register}
                    autoComplete="false"
                    onPaste={handlePasteChange}
                    sx={sxForInput}
                    InputProps={
                        {
                            ...(typeName === 'password') && {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            className="password-toggle"
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {!values.showPassword ? (
                                                <VisibilityOffOutlinedIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                            'data-testid': dataTestId,
                            autoComplete: 'off',
                            classes: classes
                            // disableUnderline: true
                        }
                    }
                />
                {formState.touchedFields[fieldName] && formState.errors[fieldName] && (
                    <p className="text-error"> <span style={{ position: 'relative', top: '7px' }}><ErrorIcon /></span> {formState.errors[fieldName].message}</p>
                )}
                {toolTipOpen &&
                    <div className="tooltipCustom">
                        <button
                            onClick={() => { settoolTipOpen(false) }}
                            id="tooltip-close"
                            type="button"
                            className="tooltipClose"
                        >{' '} <CloseIcon /></button>
                        <div className="tooltipContent">
                            <p className="tooltipTitle">Password must have</p>
                            <ul className="tooltioList">
                                <li id="uppercase" className="tooltipList-item">
                                    <span className="tooltip-icon">
                                        {/[A-Z]/.test(val) ? <BigCheck /> : <CheckIcon />}
                                    </span>
                                    <span className="tooltip-text">Upper</span>
                                </li>
                                <li id="lowercase" className="tooltipList-item">
                                    <span className="tooltip-icon">
                                        {/[a-z]/.test(val) ? <BigCheck /> : <CheckIcon />}
                                    </span>
                                    <span className="tooltip-text">Lower Case</span>
                                </li>
                                <li id="symbol" className="tooltipList-item">
                                    <span className="tooltip-icon" >
                                        {/[@#&]/.test(val) ? <BigCheck /> : <CheckIcon />}
                                    </span>
                                    <span className="tooltip-text">Symbol (@#&)</span>
                                </li>
                                <li className="tooltipList-item">
                                    <span className="tooltip-icon" id="atleastTick">
                                        {`${val}`.length >= 8 ? <BigCheck /> : <CheckIcon />}
                                    </span>
                                    <span className="tooltip-text">
                                        At least 8 characters
                                    </span>
                                </li>
                            </ul>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <p className="tooltipTitle StrengthTitle">
                                    Password Strength:{' '}
                                    {(passStrengthPerc() > 0 && passStrengthPerc() <= 60) && <span style={{ color: '#d32f2f' }}> Low  </span>}
                                    {(passStrengthPerc() > 60 && passStrengthPerc() <= 80) && <span style={{ color: '#ed6c02' }}> Moderate  </span>}
                                    {(passStrengthPerc() > 80 && passStrengthPerc() <= 100) && <span style={{ color: '#green' }}> High  </span>}
                                </p>
                                <LinearProgress
                                    variant="determinate"
                                    color={getbarColor()}
                                    value={passStrengthPerc()}
                                />
                            </Box>
                        </div>
                    </div>
                }
            </FormControl>
        </>




    )
}
