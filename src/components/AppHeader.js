import { AppBar, Toolbar, Typography } from '@mui/material';

export default function AppHeader() {
  return (
    <AppBar className='app-header' position='static' sx={{ zIndex: 1 }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Image Manipulation
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
