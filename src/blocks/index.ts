import { Content } from '../components';

export * from './content.block';
export * from './media-block.block';
export * from './media-content.block';
export * from './media-slider.block';

export const components = {
  content: Content,
  mediaBlock: () => null,
  mediaContent: () => null,
  mediaSlider: () => null
};
