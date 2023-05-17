/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra } from '@chakra-ui/react';
import React from 'react';

export const Element = ({
  attributes,
  children
}: {
  attributes: any;
  children: any;
}) => (
  <chakra.ul
    {...attributes}
    listStyleImage="url('/images/check.svg')"
    sx={{ '[dataSlateNode="element"]': { margin: '0.625rem 0' } }}
  >
    {children}
  </chakra.ul>
);
