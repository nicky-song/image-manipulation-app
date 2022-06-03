import { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChromePicker } from 'react-color';

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

export default function ColorPicker(props) {
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
