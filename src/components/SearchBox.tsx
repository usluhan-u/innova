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
        <InputLeftElement pos="relative">
          <SearchIcon boxSize={5} />
        </InputLeftElement>
        <Input variant="unstyled" placeholder={placeholder} />
      </>
    )}
    <InputRightElement onClick={handleToggle} pos="relative">
      {expanded ? <CloseIcon boxSize={4} /> : <SearchIcon boxSize={5} />}
    </InputRightElement>
  </InputGroup>
);
