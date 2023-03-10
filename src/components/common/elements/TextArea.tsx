import { FormControl, Box, IconButton, InputAdornment, InputLabel, TextField, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import useLocales from '../../../hooks/useLocales';
import ErrorIcon from '@mui/icons-material/Error';
import { Controller } from 'react-hook-form';
export const TextArea = ({
    fieldName,
    register,
    label,
    formState,
    intiValue = ""
}: any) => {
    const { t } = useLocales();
    const [local, setLocal] = useState('');

    const handleChange = (event: any) => {
        setLocal(event.target.value as string);
        register.onChange(event)
    };
    useEffect(() => {
        setLocal(intiValue as string);
    }, [])
    return (
        <>
            <Box id="select-entity-form" className='commonInput' sx={{
                position: 'relative',
                '& .Mui-focused ~ label': {
                    top: '10px'
                },
                '& label': {
                    top: (local == '' || local == undefined || local == null) ? '0px' : '10px',
                    height: 'min-content',
                    backgroundColor: '#fff !important',
                },
                '& legend': {
                    display: 'none',
                },
                '& .MuiInputBase-root': {
                    height: '60px !important',
                }
            }}>
                <FormControl fullWidth>
                    <TextField
                        // multiline
                        // rows={10}
                        // maxRows={4}
                        className='input-field'
                        label={t<string>(label)}
                        {...register}
                        id={fieldName}
                        labelId="demo-simple-select-label"
                        value={local}
                        onChange={handleChange}
                        variant="outlined" />
                </FormControl>
                {formState && formState.touchedFields[fieldName] && formState.errors[fieldName] && (
                    <p className="text-error"> <span style={{ position: 'relative', top: '7px' }}><ErrorIcon /></span> {formState.errors[fieldName].message}</p>
                )}
            </Box>

        </>




    )
}
