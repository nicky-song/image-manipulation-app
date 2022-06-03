import React, { useId } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import HttpIcon from '@mui/icons-material/LanguageOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

function ImageShowcase(props) {
  const imageKey = useId();
  const imageUrl = props.url;
  if (!imageUrl) return <nobr />;

  const onOpenUrl = () => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className='image-showcase-wrapper'>
      <div>
        <TextField
          id='id-input-image-url'
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position='start'>
                <HttpIcon color='primary' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton color='primary' size='small' onClick={onOpenUrl}>
                  <LaunchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={imageUrl}
          fullWidth
        />
      </div>
      <div className='image-scrollview-wrapper'>
        <div className='image-wrapper no-select'>
          <img key={imageKey} src={imageUrl} alt='' />
        </div>
      </div>
    </div>
  );
}

export default React.memo(ImageShowcase);
