import React from 'react';
import { Icon, IconProps } from '@chakra-ui/react';

export interface ArrowLeftProps extends IconProps {}

export const ArrowLeft = ({ ...rest }: ArrowLeftProps) => (
  <Icon viewBox="0 0 24 24" color="text.light" {...rest}>
    <path
      fill="currentColor"
      d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
    />
  </Icon>
);
