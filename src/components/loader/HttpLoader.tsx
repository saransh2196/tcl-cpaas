import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const HttpLoader = () => {
  return (
    <div className="httpLoader">
      <CircularProgress disableShrink />
    </div>
  )
}

export default HttpLoader

