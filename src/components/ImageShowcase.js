import React, { useId } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

function ImageShowcase(props) {
  const imageKey = useId();
  const imageUrl = props.url;
  if (!imageUrl) return <nobr />;

  return (
    <div className='image-showcase-wrapper'>
      <div>
        <TextField
          id='id-input-image-url'
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position='start'>
                <LanguageIcon color='primary' />
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
