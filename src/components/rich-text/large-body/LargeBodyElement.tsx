import React from 'react';

export interface LargeBodyElementProps {
  attributes: any;
  element: any;
  children?: React.ReactNode;
}

const baseClass = 'rich-text-large-body';

export const LargeBodyElement = ({
  attributes,
  children
}: LargeBodyElementProps) => (
  <span {...attributes}>
    <div className={baseClass}>{children}</div>
  </span>
);
