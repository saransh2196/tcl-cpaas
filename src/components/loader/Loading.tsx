import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div className="preloader">
      <CircularProgress disableShrink />
    </div>
  )
}

export default Loading

