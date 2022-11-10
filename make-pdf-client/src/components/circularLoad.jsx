import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

export default function LinearIndeterminate() {
  return (
   
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
}