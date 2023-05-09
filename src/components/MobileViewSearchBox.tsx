import React from 'react';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { InstantSearch, Hits, Highlight } from 'react-instantsearch-dom';
import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

interface HitProps {
  hit: unknown;
}

const Hit = ({ hit }: HitProps) => <Highlight hit={hit} />;

export const MobileViewSearchBox = () => {
  const meiliSearchClient = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://localhost:7700',
    process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || ''
  );

  return (
    <InstantSearch indexName="" searchClient={meiliSearchClient}>
      <InputGroup w="full">
        <InputRightElement>
          <Icon as={FiSearch} />
        </InputRightElement>
        <Input borderRadius="2.5rem" />
      </InputGroup>
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};
