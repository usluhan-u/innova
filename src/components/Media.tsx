import { AspectRatio, ChakraProps } from '@chakra-ui/react';
import Image from 'next/image';
import { Media as MediaType } from '../payload-types';
import { RichText } from './RichText';

type size = 'normal' | 'wide' | 'fullscreen';

export interface MediaProps {
  blockType: 'media';
  media: MediaType;
  size?: size;
  caption?: unknown;
}

export const Media = ({ caption, media, size }: MediaProps) => {
  const getSize = (
    size?: size
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
            {caption && <RichText content={caption} textAlign="center" />}
          </>
        </AspectRatio>
      )}
    </>
  );
};
