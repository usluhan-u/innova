import { LargeBodyButton } from './LargeBodyButton';
import { LargeBodyElement } from './LargeBodyElement';
import { withLargeBody } from './plugin';

export const largeBody = {
  name: 'large-body',
  Button: LargeBodyButton,
  Element: LargeBodyElement,
  plugins: [withLargeBody]
};
