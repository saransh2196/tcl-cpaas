import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RadioButtonsGroup({val1, val2, defaultVal}: any) {
  return (
    <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={defaultVal}
        className='radio_group'
      >
        <FormControlLabel value={val1} control={<Radio sx={{
          '&.Mui-checked': {
            color: '#d63548',
          },
        }} />} label={val1} />
        <FormControlLabel value={val2} control={<Radio sx={{
          '&.Mui-checked': {
            color: '#d63548',
          },
        }} />} label={val2} />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonsGroup;