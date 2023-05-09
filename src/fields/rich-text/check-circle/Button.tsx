import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import ListButton from 'payload/dist/admin/components/forms/field-types/RichText/elements/ListButton';

export const Button = () => (
  <ListButton format="check-circle">
    <FiCheckCircle />
  </ListButton>
);
