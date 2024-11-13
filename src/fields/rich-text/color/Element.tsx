/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra } from '@chakra-ui/react';
import React from 'react';

export const Element = ({
  attributes,
  children,
  element
}: {
  attributes: any;
  children: any;
  element: any;
}) => (
  <chakra.span {...attributes} color={element.color || 'inherit'}>
    {children}
  </chakra.span>
);
