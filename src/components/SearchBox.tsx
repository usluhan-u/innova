import { useState } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

export interface SearchBoxProps {
  expanded: boolean;
  handleToggle: () => void;
  placeholder?: string;
}

export const SearchBox = ({
  placeholder,
  expanded,
  handleToggle
}: SearchBoxProps) => (
  <InputGroup w="full">
    {expanded && (
      <>
        <InputLeftElement
          children={<SearchIcon boxSize={5} />}
          pos="relative"
        />
        <Input variant="unstyled" placeholder={placeholder} />
      </>
    )}
    <InputRightElement
      onClick={handleToggle}
      children={
        expanded ? <CloseIcon boxSize={4} /> : <SearchIcon boxSize={5} />
      }
      pos="relative"
    />
  </InputGroup>
);
