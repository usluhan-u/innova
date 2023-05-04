import { RichTextCustomElement } from 'payload/types';
import { Button } from './Button';
import { Element } from './Element';
import { withCheckCircle } from './plugin';

export const checkCircle: RichTextCustomElement = {
  name: 'check-circle',
  Button,
  Element,
  plugins: [withCheckCircle]
};
