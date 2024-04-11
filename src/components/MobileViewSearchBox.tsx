/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import {
  InstantSearch,
  connectSearchBox,
  connectStateResults
} from 'react-instantsearch-dom';
import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useBoolean
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { FaArrowRight } from 'react-icons/fa';
import { PageType } from '../collections';
import { InternalLink } from './InternalLink';

interface HitProps {
  hit: PageType;
}

interface HitsProps {
  searchState: any;
  searchResults: any;
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
        bgColor: 'background.dark',
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

const MobileSearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <Input
    type="search"
    value={currentRefinement}
    borderRadius="2.5rem"
    onChange={(event) => refine(event.currentTarget.value)}
  />
));

export const MobileViewSearchBox = () => {
  const [isEditing, setIsEditing] = useBoolean();

  const client = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://localhost:7700',
    process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || '',
    {
      requestConfig: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'X-Powered-By, X-Requested-With, Content-Type, Accept, Origin, Authorization',
          'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS'
        }
      }
    }
  );

  return (
    <InstantSearch indexName="pages" searchClient={client}>
      <InputGroup
        boxSize="full"
        // sx={{
        //   '.chakra-popover__popper': {
        //     width: '100%'
        //   },
        //   '.chakra-popover__content': {
        //     width: '100%',
        //     minHeight: '5rem'
        //   }
        // }}
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
          {/* <PopoverAnchor>
          </PopoverAnchor> */}
          <PopoverTrigger>
            <MobileSearchBox />
          </PopoverTrigger>
          <InputRightElement>
            <Icon as={FiSearch} />
          </InputRightElement>
          <PopoverContent p={3}>
            <Hits />
          </PopoverContent>
        </Popover>
      </InputGroup>
    </InstantSearch>
  );
};
