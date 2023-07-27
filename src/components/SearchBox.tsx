import React from 'react';
import { Input } from '@chakra-ui/react';
import { connectSearchBox } from 'react-instantsearch-dom';

interface SearchBoxProps {
  currentRefinement: string;
  refine: (value: string) => void;
}

export const SearchBox = connectSearchBox(
  ({ currentRefinement, refine }: SearchBoxProps) => (
    <Input
      type="search"
      variant="unstyled"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
    />
  )
);
