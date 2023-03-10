import { FormControl, Box, IconButton, InputAdornment, InputLabel, TextField, Select, MenuItem, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import useLocales from '../../../hooks/useLocales';
import ErrorIcon from '@mui/icons-material/Error';
import { Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import { getoverFlowwithWidth } from '../../../utils/helpers';

export const MultipleSelectInput = ({
  fieldName,
  register,
  label,
  data = [],
  formState,
  short = false,
  disabled = false,
  intiValue = "",
}: any) => {
  const { t } = useLocales();
  const [local, setLocal] = useState<any[]>([]);

  const [tootltipStatus, handleTooltip] = useState(false);
  const [isOpne, setisopen] = useState(false);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    // const transformValue = value.map((c: any) => {
    //   return data.filter((a: any) => a.value == c)[0]
    // });
    setLocal(value);
    // register.onChange({ target: { ...event.target, value: transformValue } });
  };

  useEffect(() => {
    setLocal(intiValue);
  }, [])
  return (
    <>
      <Box id="select-entity-form" sx={{
        position: 'relative',
        '& .Mui-focused ~ label': {
          top: '10px'
        },
        '& label': {
          ...!short && { top: (local.length == 0 || local == undefined || local == null) ? '0px' : '10px' },
          ...short && { top: (local.length == 0 || local == undefined || local == null) ? '-4px' : '10px' },
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
          ...short && {
            fontSize: '13px !important',
            top: '2px',
            position: 'relative'
          }
        },
        '& .MuiInputBase-root svg': {
          ...disabled && {
            display: 'none'
          }
        },
        '.MuiFormControl-root .MuiOutlinedInput-root': {
          ...!disabled && {
            border: 'solid 1px #B4BCC1 !important',
            borderRadius: '5px'
          }
        }
      }}>

        <FormControl fullWidth>

          <Select
            onMouseEnter={() => { handleTooltip(true) }}
            onMouseLeave={() => { handleTooltip(false) }}
            onMouseClick={() => { handleTooltip(false) }}
            multiple
            disabled={disabled}
            sx={{
              ...disabled && {
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 }
              }
            }}
            {...register}
            id={fieldName}
            labelId="demo-simple-select-label"
            value={local}
            renderValue={(selected: any) => selected.map((d: any) => data.filter((c: any) => c.value == d)[0].name).join(", ")}
            onChange={handleChange}
            onClose={() => {
              setisopen(false);
              handleTooltip(false)
            }}
            onOpen={() => {
              setisopen(true);
              handleTooltip(false)
            }}
          >
            {data.map((d: any, i: any) => {
              return <MenuItem key={`dataIndex${i}`} value={d.value}>
                <Checkbox sx={{
                  '&, &.Mui-checked': {
                    color: '#D63548',
                  }
                }} checked={local.indexOf(d.value) > -1} />
                {d.name}
              </MenuItem>
            })}
          </Select>
          <span style={{ position: 'absolute', left: '50px', top: '23px' }}>
            <Tooltip title={local.map((d: any) => data.filter((c: any) => c.value == d)[0].name).join(", ")} open={tootltipStatus && !isOpne}><span></span></Tooltip>
          </span>
          {!disabled && <InputLabel style={{ ...short && { fontSize: '13px' } }} id="demo-simple-select-label">{t<string>(label)}</InputLabel>}

        </FormControl>
        {formState && formState.touchedFields[fieldName] && formState.errors[fieldName] && (
          <p className="text-error"> <span style={{ position: 'relative', top: '7px' }}><ErrorIcon /></span> {formState.errors[fieldName].message}</p>
        )}
      </Box>
    </>
  )
}
