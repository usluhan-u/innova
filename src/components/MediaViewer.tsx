import { AspectRatio, ChakraProps } from '@chakra-ui/react';
import Image from 'next/image';
import { RichText, RichTextNode } from './RichText';
import { MediaTypeMediaType } from '../blocks';

export interface MediaViewerProps {
  caption?: RichTextNode[];
  media: MediaTypeMediaType;
  size: ChakraProps;
}

export const MediaViewer = ({ caption, media, size }: MediaViewerProps) => (
  <>
    {media.mimeType?.includes('video') ? (
      <AspectRatio {...size} ratio={16 / 9}>
        <iframe title={media.filename} src={media.url} allowFullScreen />
      </AspectRatio>
    ) : (
      <AspectRatio {...size} ratio={16 / 9}>
        <>
          <Image
            src={media.url}
            alt={media.alt}
            style={{ objectFit: 'cover' }}
            fill
            sizes="100%"
            priority={false}
            className="rounded-xl"
          />
          {caption && <RichText content={caption} textAlign="center" />}
        </>
      </AspectRatio>
    )}
  </>
);
