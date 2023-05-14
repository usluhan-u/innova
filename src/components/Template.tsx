import React from 'react';
import { BackgroundColorType, WidthType } from '../fields';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { Width } from './Width';

export interface TemplateProps {
  backgroundColor: BackgroundColorType;
  width: WidthType;
  children: React.ReactNode | React.ReactNode[];
}

export const Template = ({
  backgroundColor,
  width,
  children
}: TemplateProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Width value={width}>{children}</Width>
    </AutoPosition>
  </BackgroundColor>
);
