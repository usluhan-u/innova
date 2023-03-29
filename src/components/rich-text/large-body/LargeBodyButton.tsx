import React from 'react';
import { ElementButton } from 'payload/components/rich-text';
import { LargeBodyIcon } from './LargeBodyIcon';

export interface LargeBodyButtonProps {
  path: string;
}

const baseClass = 'rich-text-large-body-button';

export const LargeBodyButton = ({ path }: LargeBodyButtonProps) => (
  <ElementButton className={baseClass} format="large-body">
    <LargeBodyIcon />
  </ElementButton>
);
