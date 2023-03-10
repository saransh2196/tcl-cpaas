import { FormControl, Box, IconButton, InputAdornment, InputLabel, TextField, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import useLocales from '../../../hooks/useLocales';
import ErrorIcon from '@mui/icons-material/Error';
import { Controller } from 'react-hook-form';
import ReactPhoneInput from 'react-phone-input-material-ui';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import 'react-phone-input-2/lib/material.css'
export const PhoneInputComp = ({
    fieldName,
    register,
    label,
    formState,
    intiValue = "",
    size = 'lg',
    short = false,
    onValueChange = () => { console.log(true) },
    readonly = false
}: any) => {
    const { t } = useLocales();
    const [local, setLocal] = useState<any>();

    const handleChange = (event: any) => {
        setLocal(event);
        // register.onChange({ name: fieldName, value: event });
        onValueChange(event)
    };
    const setEmpty = () => {
        const val = document.getElementById(fieldName)?.getElementsByTagName('input')[0].value;
        if (val == '' || val == null) {
            setLocal(undefined)
        }
    }
    useEffect(() => {
        setLocal(intiValue as string);
        setTimeout(() => {
            document.getElementById(fieldName)?.getElementsByTagName('input')[0].addEventListener('focusout', function () {
                setEmpty();
            })
        }, 1000);
        if (intiValue == '' || intiValue == null) {
            setLocal(undefined)
        }
    }, [])

    const getLabelTop = () => {
        if (size == 'sm') {
            return '-7px';
        } else {
            return '0px'
        }
    }

    return (
        <>
            <Box id="select-entity-form" className='commonInput' sx={{
                position: 'relative',
            }}>
                <FormControl id={fieldName} fullWidth sx={{
                    "& .special-label": {
                        pointerEvents: 'none',
                        // ...!short && { top: (local == '' || local == undefined || local == null) ? '0px' : '10px' },
                        ...local == undefined && {
                            ...size == 'sm' && {
                                top: '13px !important',
                                fontSize: '14px !important',
                            },
                            ...size == 'lg' && {
                                top: '22px !important',
                                fontSize: '16px !important',
                            },
                            color: 'black !important',
                        },
                        ...(local != undefined) && {
                            ...size == 'sm' && {
                                top: '5px !important',
                                fontSize: '11px !important',
                            },
                            ...size == 'lg' && {
                                top: '10px !important',
                                fontSize: '12px !important',
                            },
                         
                            color: 'rgba(0, 0, 0, 0.6) !important',
                        },
                        left: '57px !important',
                        fontFamily: 'ubuntu !important',
                    }
                }}>
                    <PhoneInput
                        onFocus={() => {
                            if (local == '' || local == null) {
                                setLocal('')
                            }
                        }}
                        placeholder=''
                        buttonStyle={{
                            color: 'green',
                        }}
                        inputStyle={{
                            display: 'flex',
                            order: 1,
                            width: '100%',
                            ...size == 'sm' && { height: '45px' },
                            ...size == 'lg' && { height: '63px' },
                            top: '9px',
                            border: 'none',
                            fontSize: '14px',
                            color: 'black'
                        }}
                        containerStyle={{
                            // display: 'block',
                            ...!readonly && { border: 'solid 1px #c4c4c4' },
                            borderRadius: '5px',
                            fontSize: '11px',
                            top: '4px',
                            color: 'rgba(0, 0, 0, 0.6) !important'
                        }}
                        enableAreaCodes={true}
                        id={fieldName}
                        disabled={readonly}
                        {...register}
                        value={local}
                        onChange={handleChange}
                        specialLabel={t<string>(label)}
                    />
                </FormControl>
                {formState && formState.touchedFields[fieldName] && formState.errors[fieldName] && (
                    <p className="text-error"
                        style={{
                            ...size == 'sm' && {
                                left: '-1px',
                                bottom: '-24px',
                                fontSize: '11px',
                            },

                        }}
                    > <span style={{ position: 'relative', top: '7px' }}><ErrorIcon /></span> {formState.errors[fieldName].message}</p>
                )}
            </Box>

        </>




    )
}
