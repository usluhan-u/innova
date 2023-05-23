import React from 'react';
import { BackgroundColorType, WidthType } from '../fields';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { Width } from './Width';

export interface TemplateProps {
  backgroundColor: BackgroundColorType;
  width: WidthType;
  children: React.ReactNode | React.ReactNode[];
  maxWidth?: string;
}

export const Template = ({
  backgroundColor,
  width,
  children,
  maxWidth
}: TemplateProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Width value={width} max={maxWidth}>
        {children}
      </Width>
    </AutoPosition>
  </BackgroundColor>
);
