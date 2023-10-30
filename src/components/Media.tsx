import React from 'react';
import { Image, chakra } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { MediaBlockType } from '../blocks';
import { Template } from './Template';

interface MediaProps extends MediaBlockType {}

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const VideoPlayer = chakra(ReactPlayer);

export const Media = ({ backgroundColor, media, width }: MediaProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    {media.mimeType.startsWith('image') && (
      <Image
        objectFit="cover"
        src={media.url}
        alt={media.alt}
        boxSize="full"
        borderRadius="lg"
      />
    )}
    {media.mimeType.startsWith('video') && (
      <VideoPlayer
        width="100%"
        height="100%"
        url={media.url}
        volume={0}
        muted
        playing
        loop
        sx={{
          '&': {
            width: '100% !important',
            height: '100% !important',

            '& > video': {
              objectFit: 'cover'
            }
          }
        }}
      />
    )}
  </Template>
);
