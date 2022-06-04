import { useCallback, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppHeader from './components/AppHeader';
import ImageAttributes from './components/ImageAttributes';
import ImageShowcase from './components/ImageShowcase';
import { generateImageUrl } from './utils';

import './App.css';

const globalMuiTheme = createTheme({
  palette: {
    primary: {
      main: '#5c6bc0',
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
      <AppHeader />
      <div className='app-content'>
        <ImageAttributes onUpdate={updateAttributes} />
        <ImageShowcase url={generateImageUrl(attributes)} />
      </div>
    </ThemeProvider>
  );
}

export default App;
