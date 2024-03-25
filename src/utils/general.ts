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

export const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};
