import { AspectRatio, ChakraProps } from '@chakra-ui/react';
import Image from 'next/image';
import { RichText } from './RichText';
import { MediaSize, MediaType } from '../blocks';

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

  return (
    <>
      {media.mimeType?.includes('video') ? (
        <AspectRatio {...getSize(size)} ratio={1}>
          <iframe title={media.filename} src={media.url} allowFullScreen />
        </AspectRatio>
      ) : (
        <AspectRatio {...getSize(size)} ratio={1}>
          <>
            <Image
              src={media.url}
              alt={media.alt}
              style={{ objectFit: 'cover' }}
              fill
              sizes="100%"
              priority={false}
            />
            <RichText content={caption} textAlign="center" />
          </>
        </AspectRatio>
      )}
    </>
  );
};
