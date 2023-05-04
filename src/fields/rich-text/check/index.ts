import { RichTextCustomElement } from 'payload/types';
import { Button } from './Button';
import { Element } from './Element';
import { withCheck } from './plugin';

export const check: RichTextCustomElement = {
  name: 'check',
  Button,
  Element,
  plugins: [withCheck]
};
