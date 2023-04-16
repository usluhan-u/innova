import { Flex, Select } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  children: React.ReactNode | React.ReactNode[];
  options: DropdownOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown = ({
  children,
  options,
  value,
  onChange
}: DropdownProps) => (
  <Flex flexDir="column" gap={6}>
    <Select variant="filled" value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={uuidv4()} value={index} aria-label={option.label}>
          {option.label}
        </option>
      ))}
    </Select>
    {children}
  </Flex>
);
