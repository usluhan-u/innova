import React from 'react';
import { Image } from '@chakra-ui/react';
import { MediaBlockType } from '../blocks';
import { Template } from './Template';

interface MediaProps extends MediaBlockType {}

export const Media = ({ backgroundColor, media, width }: MediaProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <Image
      objectFit="cover"
      src={media.url}
      alt={media.alt}
      boxSize="full"
      borderRadius="lg"
    />
  </Template>
);
