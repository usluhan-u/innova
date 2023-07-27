import React from 'react';
import { InstantSearch, Hits, Highlight } from 'react-instantsearch-dom';
import {
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  useBoolean
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { MeiliSearch } from 'meilisearch';
import { SearchBox } from './SearchBox';

interface HitProps {
  hit: unknown;
}

export interface DesktopViewSearchBoxProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hit = ({ hit }: HitProps) => <Highlight hit={hit} />;

export const DesktopViewSearchBox = ({
  expanded,
  setExpanded
}: DesktopViewSearchBoxProps) => {
  const [isEditing, setIsEditing] = useBoolean();

  const client = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://localhost:7700',
    apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || ''
  });

  // const index = client.index('pages');

  return (
    <InstantSearch indexName="pages" searchClient={client}>
      <InputGroup
        w={expanded ? 'full' : 'fit-content'}
        sx={{
          '.chakra-popover__popper': {
            width: '100%'
          },
          '.chakra-popover__content': {
            width: '100%',
            minHeight: '10rem'
          }
        }}
      >
        <Popover
          isOpen={isEditing}
          onOpen={setIsEditing.on}
          onClose={setIsEditing.off}
          closeOnBlur={false}
          lazyBehavior="keepMounted"
          placement="bottom-start"
          isLazy
        >
          <PopoverAnchor>
            <>
              {expanded && (
                <>
                  <InputLeftElement pos="relative">
                    <Icon as={FiSearch} boxSize={5} />
                  </InputLeftElement>
                  <SearchBox />
                </>
              )}
            </>
          </PopoverAnchor>
          <PopoverTrigger>
            <InputRightElement
              pos="relative"
              onClick={() => setExpanded(!expanded)}
            >
              <Icon
                as={expanded ? IoClose : FiSearch}
                boxSize={expanded ? 7 : 5}
              />
            </InputRightElement>
          </PopoverTrigger>
          <PopoverContent>
            <Hits hitComponent={Hit} />
          </PopoverContent>
        </Popover>
      </InputGroup>
    </InstantSearch>
  );
};
