/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichTextCustomElement } from 'payload/types';
import { withCheck } from './plugin';
import { Button } from './Button';
import { Element } from './Element';

export const check: RichTextCustomElement = {
  name: 'check',
  Button,
  Element,
  plugins: [withCheck]
};
