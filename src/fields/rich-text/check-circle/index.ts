/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichTextCustomElement } from 'payload/types';
import { withCheckCircle } from './plugin';
import { Button } from './Button';
import { Element } from './Element';

export const checkCircle: RichTextCustomElement = {
  name: 'check-circle',
  Button,
  Element,
  plugins: [withCheckCircle]
};
