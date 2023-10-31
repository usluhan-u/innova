import { ChakraProps, chakra } from '@chakra-ui/react';
import React from 'react';

interface VideoPlayerProps
  extends Pick<
      React.ComponentProps<'video'>,
      'controls' | 'loop' | 'muted' | 'autoPlay' | 'playsInline'
    >,
    Pick<React.ComponentProps<'source'>, 'type'>,
    Pick<ChakraProps, 'pos'> {
  url: string;
}

export const VideoPlayer = ({
  controls,
  url,
  loop,
  muted,
  autoPlay,
  playsInline,
  type,
  pos
}: VideoPlayerProps) => (
  <chakra.video
    w="full"
    h="full"
    pos={pos}
    controls={controls}
    loop={loop}
    muted={muted}
    autoPlay={autoPlay}
    playsInline={playsInline}
  >
    <track kind="captions" />
    <source src={url} type={type} />
    Your browser does not support the video tag.
  </chakra.video>
);
