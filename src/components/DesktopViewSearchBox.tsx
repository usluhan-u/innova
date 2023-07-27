/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { InstantSearch, connectStateResults } from 'react-instantsearch-dom';
import {
  HStack,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useBoolean
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { v4 as uuidv4 } from 'uuid';
import { FaArrowRight } from 'react-icons/fa';
import { SearchBox } from './SearchBox';
import { InternalLink } from './InternalLink';
import { PageType } from '../collections';

interface HitProps {
  hit: PageType;
}

interface HitsProps {
  searchState: any;
  searchResults: any;
}

export interface DesktopViewSearchBoxProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hit = ({ hit }: HitProps) => (
  <InternalLink slug={hit.slug}>
    <HStack
      align="center"
      justify="space-between"
      boxSize="full"
      bgColor="background.secondary"
      p="3"
      borderRadius="lg"
      _hover={{
        bgColor: 'background.blue.100',
        color: 'text.light'
      }}
    >
      <VStack boxSize="full" align="flex-start" spacing={0}>
        <Text>{hit.hero?.title}</Text>
        <Text>{hit.hero?.description}</Text>
      </VStack>
      <Icon as={FaArrowRight} />
    </HStack>
  </InternalLink>
);

const Hits = connectStateResults(
  ({ searchResults, searchState }: HitsProps) => {
    const validQuery = searchState.query?.length >= 1;

    return (
      <>
        {searchResults?.hits.length > 0 && validQuery && (
          <List spacing={3}>
            {searchResults.hits.map((hit: PageType) => (
              <ListItem key={uuidv4()}>
                <Hit hit={hit} />
              </ListItem>
            ))}
          </List>
        )}
      </>
    );
  }
);

export const DesktopViewSearchBox = ({
  expanded,
  setExpanded
}: DesktopViewSearchBoxProps) => {
  const [isEditing, setIsEditing] = useBoolean();

  const client = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://localhost:7700',
    process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || '',
    {}
  );

  const handleExpanded =
    (value: boolean) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      setExpanded(value);
    };

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
              onClick={handleExpanded(!expanded)}
            >
              <Icon
                as={expanded ? IoClose : FiSearch}
                boxSize={expanded ? 7 : 5}
              />
            </InputRightElement>
          </PopoverTrigger>
          <PopoverContent p={3}>
            <Hits />
          </PopoverContent>
        </Popover>
      </InputGroup>
    </InstantSearch>
  );
};
