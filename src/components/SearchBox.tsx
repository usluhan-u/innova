import React from 'react';
import { Input } from '@chakra-ui/react';
import { connectSearchBox } from 'react-instantsearch-dom';

interface SearchBoxProps {
  currentRefinement: string;
  refine: (value: string) => void;
}

const Search = React.forwardRef(
  (props: SearchBoxProps, ref: React.ForwardedRef<HTMLInputElement>) => (
    <Input
      border="1p solid red"
      variant="unstyled"
      w="full"
      value={props.currentRefinement}
      ref={ref}
      onChange={(event) => props.refine(event.currentTarget.value)}
    />
  )
);

export const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <Search currentRefinement={currentRefinement} refine={refine} />
));
