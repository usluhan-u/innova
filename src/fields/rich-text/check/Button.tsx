import React from 'react';
import { FiCheck } from 'react-icons/fi';
import ListButton from 'payload/dist/admin/components/forms/field-types/RichText/elements/ListButton';

export const Button = () => (
  <ListButton format="check">
    <FiCheck />
  </ListButton>
);
