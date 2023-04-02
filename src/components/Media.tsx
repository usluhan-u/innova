import { ChakraProps } from '@chakra-ui/react';
import { MediaSize, MediaType } from '../blocks';
import { MediaViewer } from './MediaViewer';

export interface MediaProps extends MediaType {}

export const Media = ({ caption, media, size }: MediaProps) => {
  const getSize = (
    size?: MediaSize
  ): Pick<ChakraProps, 'maxW' | 'w' | 'h' | 'pos' | 'overflow'> => {
    const sizeMap: Record<string, ChakraProps> = {
      normal: { maxW: 'full', w: 'full' },
      wide: { maxW: 'full', w: 'full' },
      fullscreen: { h: '100vh', pos: 'relative', overflow: 'hidden' }
    };

    return (size && sizeMap[size]) || sizeMap.normal;
  };

  return <MediaViewer media={media} size={getSize(size)} />;
};
