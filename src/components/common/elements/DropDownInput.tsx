import {
  FormControl,
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Input
} from '@mui/material'
import { useEffect, useState } from 'react'
import useLocales from '../../../hooks/useLocales'
import ErrorIcon from '@mui/icons-material/Error'
import { Controller } from 'react-hook-form'

export const DropDownInput = ({
  fieldName,
  register,
  label,
  data = [],
  formState,
  short = false,
  disabled = false,
  intiValue = '',
  onValueChange = () => {
    console.log(true)
  },
  size = 'lg',
  readonly = false,
}: any) => {
  const { t } = useLocales()
  const [local, setLocal] = useState('')

  const handleChange = (event: any) => {
    setLocal(event.target.value as string)
    register.onChange(event)
    onValueChange(event.target.value)
  }

  useEffect(() => {
    setLocal(intiValue as string)
  }, [])
  return (
    <>
      <Box
        id="select-entity-form"
        sx={{
          position: 'relative',
          '& .Mui-focused ~ label': {
            top: '10px',
          },
          '& label': {
            ...(!short && {
              top:
                local == '' || local == undefined || local == null
                  ? '0px'
                  : '10px',
            }),
            ...(short && {
              top:
                local == '' || local == undefined || local == null
                  ? '-6px'
                  : '10px',
              fontSize: '14px !important',
            }),
            height: 'min-content',
            backgroundColor: '#fff !important',
          },
          '& legend': {
            display: 'none',
          },
          '& .MuiInputBase-root': {
            height: `${short ? '45px' : '60px'} !important`,
          },
          '& .MuiInputBase-root .MuiOutlinedInput-input': {
            ...(short && {
              fontSize: '13px !important',
              top: '2px',
              position: 'relative',
            }),
          },
          '& .MuiInputBase-root svg': {
            ...(disabled && {
              display: 'none',
            }),
            ...(readonly && {
              display: 'none',
            }),
          },
          '& .MuiSelect-nativeInput': {
            position: 'absolute !important',
          },
          '& .MuiInputBase-root input': {
            ...(size == 'sm' && { top: '7px' }),
            position: 'relative',
          },
          '.MuiFormControl-root .MuiOutlinedInput-root': {
            ...(!readonly &&
              (size == 'sm' || short) && {
                border: 'solid 1px #B4BCC1 !important',
                borderRadius: '5px',
              }),
          },
        }}
      >
        
        <FormControl fullWidth>
          <Select
            disabled={disabled || readonly}
            sx={{
              ...((disabled || readonly) && {
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
              }),
            }}
            {...register}
            id={fieldName}
            labelId="demo-simple-select-label"
            value={local}
            onChange={handleChange}
          >
            {data.map((d: any, i: any) => {
              return (
                <MenuItem key={`dataIndex${i}`} value={d.value}>
                  {d.name}
                </MenuItem>
              )
            })}
          </Select>

      {local==="1"?(<><InputLabel
          style={{ ...(short && { fontSize: '11px' }) }}
          id="demo-simple-select-label"
        >
          {t<string>("0string")}
        </InputLabel>
      <Input 
      /></>):null}
          
          

          {!disabled && (
            <InputLabel
              style={{ ...(short && { fontSize: '11px' }) }}
              id="demo-simple-select-label"
            >
              {t<string>(label)}
            </InputLabel>
          )}
        </FormControl>
        {data.map((ele: any) => {
          if (ele.value === local) {
            return ele.inputs.map((val: any) => (
              <input value={val.fieldName} key={val.fieldId}></input>
            ))
          }
        })}
        {formState &&
          formState.touchedFields[fieldName] &&
          formState.errors[fieldName] && (
            <p className="text-error">
              {' '}
              <span style={{ position: 'relative', top: '7px' }}>
                <ErrorIcon />
              </span>{' '}
              {formState.errors[fieldName].message}
            </p>
          )}
      </Box>
    </>
  )
}
