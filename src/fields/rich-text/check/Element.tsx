/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export const CheckElement = ({
  attributes,
  children
}: {
  attributes: any;
  children: any;
}) => (
  <ul
    {...attributes}
    style={{
      listStyleImage: "url('/images/check.svg')",
      '[dataSlateNode="element"]': { margin: '0.625rem 0' }
    }}
  >
    {children}
  </ul>
);
