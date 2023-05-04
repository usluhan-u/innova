import React from 'react';
import { chakra } from '@chakra-ui/react';

export interface BackgroundColorRadioProps {
  value: string;
  path: string;
  update: (args: { path: string; value: string }) => void;
  options: { value: string; label: string }[];
}

export const BackgroundColorRadio = ({
  options,
  path,
  update,
  value
}: BackgroundColorRadioProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    update({ path, value: event.target.value });

  const getBgColor = (value: string) => {
    const bgColorMap: Record<string, string> = {
      white: 'background.primary',
      gray: 'background.secondary'
    };

    return bgColorMap[value] || 'background.primary';
  };

  return (
    <>
      {options.map((option) => (
        <chakra.label key={option.value} display="inline-block">
          <chakra.input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
            display="none"
          />
          <chakra.div
            boxSize={24}
            borderRadius="50%"
            bgColor={getBgColor(option.value)}
            border={
              value === option.value
                ? '2px solid #000000'
                : '2px solid transparent'
            }
          />
        </chakra.label>
      ))}
    </>
  );
};
