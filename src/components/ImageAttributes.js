import React, { useCallback, useEffect, useState } from 'react';
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChromePicker } from 'react-color';
import { debounce } from 'lodash';

import { IMAGE_LINKS, PARAMS, DEFAULT_ATTRIBUTES } from '../utils/constants';

const popover = {
  position: 'absolute',
  zIndex: '2',
};

const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
};

const ColorButton = styled(Button)((props) => ({
  color: props.theme.palette.getContrastText(props.overlay),
  backgroundColor: props.overlay,
  '&:hover': {
    backgroundColor: props.overlay,
  },
}));

function ColorPicker(props) {
  const [openPicker, setOpenPicker] = useState(false);

  const onOpenPicker = () => {
    setOpenPicker(true);
  };

  const onClosePicker = () => {
    setOpenPicker(false);
  };

  return (
    <div>
      <ColorButton
        id={`id-attr-${props.name.toLowerCase().replaceAll(' ', '-')}`}
        variant='contained'
        overlay={`#${props.value}`}
        onClick={onOpenPicker}
      >
        {props.name}: #{props.value}
      </ColorButton>
      {openPicker ? (
        <div style={popover}>
          <div style={cover} onClick={onClosePicker} />
          <ChromePicker
            color={`#${props.value}`}
            disableAlpha={true}
            onChangeComplete={props.onChangeValue}
          />
        </div>
      ) : null}
    </div>
  );
}

function ImageAttributes(props) {
  const [src, setSrc] = useState(DEFAULT_ATTRIBUTES.src);
  const [text, setText] = useState(DEFAULT_ATTRIBUTES.txt);
  const [width, setWidth] = useState(DEFAULT_ATTRIBUTES.w);
  const [blend, setBlend] = useState(DEFAULT_ATTRIBUTES.blend);
  const [textColor, setTextColor] = useState(DEFAULT_ATTRIBUTES['txt-color']);
  const [textAlign, setTextAlign] = useState(DEFAULT_ATTRIBUTES['txt-align']);
  const [textSize, setTextSize] = useState(DEFAULT_ATTRIBUTES['txt-size']);
  const [blendMode, setBlendMode] = useState(DEFAULT_ATTRIBUTES['blend-mode']);
  const [blendAlpha, setBlendAlpha] = useState(DEFAULT_ATTRIBUTES['blend-alpha']);
  const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTES);

  const [error, setError] = useState({
    widthError: false,
    textSizeError: false,
    blendAlphaError: false,
  });

  const debounced = useCallback(debounce(props.onUpdate, 350), []);

  useEffect(() => {
    debounced(attributes);
  }, [attributes]);

  const onChangeSrc = (e) => {
    const value = e.target.value;
    setSrc(value);
    setAttributes((attrs) => ({ ...attrs, src: value }));
  };

  const onChangeText = (e) => {
    const value = e.target.value;
    setText(value);
    setAttributes((attrs) => ({ ...attrs, txt: value.trim() }));
  };

  const onChangeWidth = (e) => {
    const value = e.target.value;
    setWidth(value);

    if (value < 1 || value > 9999) {
      setError((err) => ({ ...err, widthError: true }));
    } else {
      setError((err) => ({ ...err, widthError: false }));
      setAttributes((attrs) => ({ ...attrs, w: value }));
    }
  };

  const onChangeBlend = (color) => {
    const value = color.hex.slice(1);
    setBlend(value);
    setAttributes((attrs) => ({ ...attrs, blend: value }));
  };

  const onChangeTextColor = (color) => {
    const value = color.hex.slice(1);
    setTextColor(value);
    setAttributes((attrs) => ({ ...attrs, 'txt-color': value }));
  };

  const onChangeTextAlign = (e) => {
    const value = e.target.value;
    setTextAlign(value);
    setAttributes((attrs) => ({ ...attrs, 'txt-align': value }));
  };

  const onChangeTextSize = (e) => {
    const value = e.target.value;
    setTextSize(value);

    if (value < 1 || value > 256) {
      setError((err) => ({ ...err, textSizeError: true }));
    } else {
      setError((err) => ({ ...err, textSizeError: false }));
      setAttributes((attrs) => ({ ...attrs, 'txt-size': value }));
    }
  };

  const onChangeBlendMode = (e) => {
    const value = e.target.value;
    setBlendMode(value);
    setAttributes((attrs) => ({ ...attrs, 'blend-mode': value }));
  };

  const onChangeBlendAlpha = (e) => {
    const value = e.target.value;
    setBlendAlpha(value);

    if (value < 0 || value > 100) {
      setError((err) => ({ ...err, blendAlphaError: true }));
    } else {
      setError((err) => ({ ...err, blendAlphaError: false }));
      setAttributes((attrs) => ({ ...attrs, 'blend-alpha': value }));
    }
  };

  return (
    <div className='image-attributes-wrapper'>
      <FormControl>
        <InputLabel id='id-attr-src-label'>Image Source</InputLabel>
        <Select id='id-attr-src' value={src} label='Image Source' onChange={onChangeSrc}>
          {IMAGE_LINKS.map((link) => {
            const fileName = link.split('/').pop();
            return (
              <MenuItem key={fileName} value={link}>
                {fileName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField id='id-attr-text' label='Text' value={text} onChange={onChangeText} />
      <TextField
        id='id-attr-width'
        label='Image Width'
        type='number'
        value={width}
        InputProps={{
          endAdornment: <InputAdornment position='end'>px</InputAdornment>,
        }}
        error={error.widthError}
        helperText={error.widthError ? 'Enter a value between 1 and 9999' : null}
        onChange={onChangeWidth}
      />
      <div style={{ display: 'flex', marginBottom: '25px' }}>
        <ColorPicker name='Blend Color' value={blend} onChangeValue={onChangeBlend} />
        &nbsp;&nbsp;
        <ColorPicker name='Text Color' value={textColor} onChangeValue={onChangeTextColor} />
      </div>
      <FormControl>
        <InputLabel id='id-attr-label-text-align'>Text Alignment</InputLabel>
        <Select
          id='id-attr-text-align'
          value={textAlign}
          label='Text Alignment'
          onChange={onChangeTextAlign}
        >
          {PARAMS.txtAlign.map((alignment) => (
            <MenuItem key={alignment} value={alignment}>
              {alignment}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id='id-attr-text-size'
        label='Text Size'
        type='number'
        value={textSize}
        InputProps={{
          endAdornment: <InputAdornment position='end'>px</InputAdornment>,
        }}
        error={error.textSizeError}
        helperText={error.textSizeError ? 'Enter a value between 1 and 256' : null}
        onChange={onChangeTextSize}
      />
      <FormControl>
        <InputLabel id='id-attr-label-blend-mode'>Blend Mode</InputLabel>
        <Select
          id='id-attr-blend-mode'
          value={blendMode}
          label='Blend Mode'
          onChange={onChangeBlendMode}
        >
          {PARAMS.blendMode.map((bm) => (
            <MenuItem key={bm} value={bm}>
              {bm}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id='id-attr-blend-alpha'
        label='Blend Alpha'
        type='number'
        value={blendAlpha}
        error={error.blendAlphaError}
        helperText={error.blendAlphaError ? 'Enter a value between 0 and 100' : null}
        onChange={onChangeBlendAlpha}
      />
    </div>
  );
}

export default React.memo(ImageAttributes);
