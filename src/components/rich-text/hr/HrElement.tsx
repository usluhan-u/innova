import React from 'react';

export interface HrElementProps {
  children: React.ReactNode;
  attributes: any;
  element: any;
}

const baseClass = 'rich-text-hr';

export const HrElement = ({ attributes, children }: HrElementProps) => (
  <div contentEditable={false}>
    <span {...attributes} className={baseClass}>
      <hr className={baseClass} />
      {children}
    </span>
  </div>
);
