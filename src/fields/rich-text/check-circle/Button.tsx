import { FiCheckCircle } from 'react-icons/fi';
import React from 'react';
import ListButton from 'payload/dist/admin/components/forms/field-types/RichText/elements/ListButton';

export const Button = () => (
  <ListButton format="check-circle">
    <FiCheckCircle />
  </ListButton>
);
