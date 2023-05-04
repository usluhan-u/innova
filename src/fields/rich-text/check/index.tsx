/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichTextCustomElement } from 'payload/types';

import { FiCheck } from 'react-icons/fi';
import React from 'react';
import ListButton from 'payload/dist/admin/components/forms/field-types/RichText/elements/ListButton';
import { withCheck } from './plugin';

export const Button = () => (
  <ListButton format="check">
    <FiCheck />
  </ListButton>
);

export const Element = ({
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

export const check: RichTextCustomElement = {
  name: 'check',
  Button,
  Element,
  plugins: [withCheck]
};
