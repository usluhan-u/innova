import { FiCheckCircle } from 'react-icons/fi';
import React from 'react';
import ListButton from 'payload/dist/admin/components/forms/field-types/RichText/elements/ListButton';

export const CheckCircleButton = () => (
  <ListButton format="check-circle">
    <FiCheckCircle />
  </ListButton>
);
