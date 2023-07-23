import React from 'react';
import { MediaBlockType } from '../blocks';
import { Template } from './Template';
import { Image } from './Image';

interface MediaProps extends MediaBlockType {}

export const Media = ({ backgroundColor, media, width }: MediaProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <Image
      src={media.url}
      alt={media.alt}
      objectFit="cover"
      h="6xl"
      borderRadius="lg"
    />
  </Template>
);
