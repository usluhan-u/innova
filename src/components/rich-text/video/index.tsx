import { withVideo } from './plugin';
import { VideoElement } from './VideoElement';
import { VideoButton } from './VideoButton';

export const Video = {
  name: 'video',
  VideoButton,
  VideoElement,
  plugins: [withVideo]
};
