import { FormControl, Box, IconButton, InputAdornment, InputLabel, TextField, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import useLocales from '../../../hooks/useLocales';
import ErrorIcon from '@mui/icons-material/Error';
import { Controller } from 'react-hook-form';

export const CommonInput = ({
    fieldName,
    register,
    label,
    formState,
    intiValue = "",
    size = 'lg',
    onValueChange = () => { console.log(true) },
    readonly = false
}: any) => {
    const { t } = useLocales();
    const [local, setLocal] = useState('');

    const handleChange = (event: any) => {
        setLocal(event.target.value as string);
        register.onChange(event);
        onValueChange(event.target.value)
    };
    useEffect(() => {
        setLocal(intiValue as string);
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
                '& .Mui-focused ~ label': {
                    top: '10px',
                    ...size == 'lg' && { height: '1rem !important' },
                },
                '& label': {
                    top: (local == '' || local == undefined || local == null) ? getLabelTop() : '10px',
                    height: 'min-content',
                    backgroundColor: '#fff !important',
                    ...size == 'sm' && { fontSize: '14px !important' },
                },
                '& legend': {
                    display: 'none',
                },
                '& .MuiInputBase-root': {
                    ...size == 'sm' && { height: '45px !important' },
                    ...size == 'lg' && { height: '60px !important' },
                    color: 'black'
                },
                '& .MuiInputBase-root input': {
                    ...size == 'sm' && { top: '7px' },
                    position: 'relative',
                },
                '& .MuiInputBase-root .Mui-disabled': {
                    '-webkit-text-fill-color': 'black'
                },

                '.MuiFormControl-root .MuiTextField-root' : {
                    ...!readonly && size == 'sm' && {
                        border: 'solid 1px #B4BCC1 !important',
                        borderRadius: '5px'
                    }
                }

            }}>
                <FormControl fullWidth>
                    <TextField
                        sx={{
                            ...readonly && {
                                boxShadow: 'none',
                                '.MuiOutlinedInput-notchedOutline': { border: 0 }
                            }
                        }}
                        className='input-field'
                        label={t<string>(label)}
                        {...register}
                        id={fieldName}
                        disabled={readonly}
                        labelId="demo-simple-select-label"
                        value={local}
                        onChange={handleChange}
                        variant="outlined" />
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
