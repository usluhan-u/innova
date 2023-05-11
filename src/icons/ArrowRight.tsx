import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export interface ArrowRightProps extends IconProps {}

export const ArrowRight = ({ ...rest }: ArrowRightProps) => (
  <Icon viewBox="0 0 24 24" color="text.light" {...rest}>
    <path
      fill="currentColor"
      d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
    />
  </Icon>
);
