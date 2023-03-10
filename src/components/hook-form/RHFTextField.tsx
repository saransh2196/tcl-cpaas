import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller, ControllerProps, FieldError } from 'react-hook-form'

export type RHFTextFieldProps = Omit<TextFieldProps,
  'name'> & {
    name: string
    parseError?: (error: FieldError) => string
    control?: Control<any>
  }

export default function RHFTextField({
  parseError,
  type,
  required,
  name,
  control,
  ...rest
}: RHFTextFieldProps): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) =>
        <TextField
          {...rest}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          type={type}
          error={invalid}
          helperText={error ? (typeof parseError === 'function' ? parseError(error) : error.message) : rest.helperText}
        />
      }
    />
  )
}