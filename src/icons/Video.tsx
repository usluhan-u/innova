import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export interface VideoProps extends IconProps {}

export const Video = ({ ...rest }: VideoProps) => (
  <Icon viewBox="0 0 32 32" {...rest}>
    <rect
      fill="#333333"
      x="2.03"
      y="4.94"
      width="19.93"
      height="13.63"
      rx="2.9"
    />
    <polygon fill="#ffffff" points="15.34 11.76 10 8.67 10 14.84 15.34 11.76" />
  </Icon>
);
