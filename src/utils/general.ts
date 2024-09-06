import { RichTextContentType } from '../components';
import { extractTextValues } from './rich-text-to-string';

export enum MobileOS {
  IOS = 'ios',
  ANDROID = 'android'
}

const isServer = () => typeof window === 'undefined';

export const isMobileOS = (): boolean => {
  if (isServer()) return false;

  const { userAgent } = navigator;

  if (/android/i.test(userAgent)) {
    return true;
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return true;
  }

  return false;
};

export const calculateReadingDuration = (content: RichTextContentType[]) => {
  const wordsPerMinute = 225;
  const text = extractTextValues(content).join(' ');
  const words = text.trim().split(/\s+/).length;
  return Math.round(words / wordsPerMinute);
};
