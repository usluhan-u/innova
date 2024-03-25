import React from 'react';
import { Image } from '@chakra-ui/react';
import { MediaBlockType } from '../blocks';
import { Template } from './Template';
import { VideoPlayer } from './VideoPlayer';
import { isMobileOS } from '../utils';

interface MediaProps extends MediaBlockType {}

export const Media = ({ backgroundColor, media, width }: MediaProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    {media.mimeType.startsWith('image') && (
      <Image
        objectFit="fill"
        src={media.url}
        alt={media.alt}
        boxSize="full"
        borderRadius="lg"
      />
    )}
    {media.mimeType.startsWith('video') && (
      <VideoPlayer
        url={media.url}
        type={media.mimeType}
        controls={isMobileOS()}
        loop
        muted
        autoPlay
        playsInline
      />
    )}
  </Template>
);
