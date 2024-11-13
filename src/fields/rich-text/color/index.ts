import { RichTextCustomElement } from 'payload/types';
import { withColor } from './plugin';
import { Button } from './Button';
import { Element } from './Element';

export const color: RichTextCustomElement = {
  name: 'color',
  Button,
  Element,
  plugins: [withColor]
};
