export const IMAGE_LINKS = [
  'https://assets.imgix.net/examples/butterfly.jpg',
  'https://assets.imgix.net/unsplash/pineneedles.jpg',
  'https://assets.imgix.net/unsplash/motorbike.jpg',
  'https://assets.imgix.net/unsplash/mountains.jpg',
];

export const PARAMS = {
  txtAlign: [
    'unset',
    'top,left',
    'top,center',
    'top,right',
    'middle,left',
    'middle,center',
    'middle,right',
    'bottom,left',
    'bottom,center',
    'bottom,right',
  ],
  blendMode: [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
  ],
};

export const DEFAULT_ATTRIBUTES = {
  src: IMAGE_LINKS[0],
  txt: 'Your sample text here',
  w: 640,
  blend: '4400bb',
  'txt-color': 'ffffff',
  'txt-align': 'middle,center',
  'txt-size': 48,
  'blend-mode': 'normal',
  'blend-alpha': 50,
};
