import { RichTextCustomElement } from 'payload/types';
import { CheckCircleButton } from './Button';
import { CheckCircleElement } from './Element';
import { withCheckCircle } from './plugin';

export const checkCircle: RichTextCustomElement = {
  name: 'check-circle',
  Button: CheckCircleButton,
  Element: CheckCircleElement,
  plugins: [withCheckCircle]
};
