import { v4 as uuidv4 } from 'uuid';
import React from 'react';

export interface SliderProps {
  slides: React.ReactNode[];
}

export const Slider = ({ slides }: SliderProps) => (
  <>
    {slides.map((slide) => (
      <div key={uuidv4()}>{slide}</div>
    ))}
  </>
);
