import { FiCheck } from 'react-icons/fi';
import React from 'react';
import ListButton from 'payload/dist/admin/components/forms/field-types/RichText/elements/ListButton';

export const CheckButton = () => (
  <ListButton format="check">
    <FiCheck />
  </ListButton>
);
