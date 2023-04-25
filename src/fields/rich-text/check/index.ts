import { RichTextCustomElement } from 'payload/types';
import { CheckButton } from './Button';
import { CheckElement } from './Element';
import { withCheck } from './plugin';

export const check: RichTextCustomElement = {
  name: 'check',
  Button: CheckButton,
  Element: CheckElement,
  plugins: [withCheck]
};
