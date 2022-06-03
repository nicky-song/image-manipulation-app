import { useCallback, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ImageAttributes from './components/ImageAttributes';
import ImageShowcase from './components/ImageShowcase';
import { generateImageUrl } from './utils';

import './App.css';

const globalMuiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        sx: { marginBottom: '25px' },
        InputLabelProps: { shrink: true },
      },
    },
    MuiSelect: {
      defaultProps: {
        sx: { marginBottom: '25px' },
      },
    },
  },
});

function App() {
  const [attributes, setAttributes] = useState(null);

  const updateAttributes = useCallback((data) => {
    setAttributes(data);
  }, []);

  return (
    <ThemeProvider theme={globalMuiTheme}>
      <AppBar className='app-header' position='static' sx={{ zIndex: 1 }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Image Manipulation
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='app-content'>
        <ImageAttributes onUpdate={updateAttributes} />
        <ImageShowcase url={generateImageUrl(attributes)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
