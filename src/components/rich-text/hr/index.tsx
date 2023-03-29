import { HrButton } from './HrButton';
import { HrElement } from './HrElement';
import { withHR } from './plugin';

export const Hr = {
  name: 'hr',
  Button: HrButton,
  Element: HrElement,
  plugins: [withHR]
};
