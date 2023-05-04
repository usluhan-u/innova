/* eslint-disable @typescript-eslint/no-explicit-any */
import { RichTextCustomElement } from 'payload/types';

import { FiCheckCircle } from 'react-icons/fi';
import React from 'react';
import ListButton from 'payload/dist/admin/components/forms/field-types/RichText/elements/ListButton';
import { withCheckCircle } from './plugin';

export const Button = () => (
  <ListButton format="check-circle">
    <FiCheckCircle />
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
      listStyleImage: "url('/images/check-circle.svg')",
      '[dataSlateNode="element"]': { margin: '0.625rem 0' }
    }}
  >
    {children}
  </ul>
);

export const checkCircle: RichTextCustomElement = {
  name: 'check-circle',
  Button,
  Element,
  plugins: [withCheckCircle]
};
