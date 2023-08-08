/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Configure,
  Index,
  InstantSearch,
  connectInfiniteHits
} from 'react-instantsearch-dom';
import {
  Flex,
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
import { FaArrowRight } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { SearchBox } from './SearchBox';
import { InternalLink } from './InternalLink';
import { PageType, PostType } from '../collections';

interface HitProps {
  hit: PageType | PostType;
}

export interface DesktopViewSearchBoxProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hit = ({ hit }: HitProps) => {
  const groupSlug: string | undefined = (hit as PostType).group?.slug;

  return (
    hit.slug && (
      <InternalLink slug={groupSlug ? `${groupSlug}/${hit.slug}` : hit.slug}>
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
            <Text w={{ md: '44rem', xl: '100rem' }} isTruncated>
              {hit.hero?.title}
            </Text>
            <Text w={{ md: '44rem', xl: '100rem' }} isTruncated>
              {hit.hero?.description}
            </Text>
          </VStack>
          <Icon as={FaArrowRight} />
        </HStack>
      </InternalLink>
    )
  );
};

const Hits = connectInfiniteHits(({ hasMore, hits, refineNext }) => {
  // const { hits, isLastPage, showMore } = useInfiniteHits();
  const sentinelRef = React.useRef(null);

  React.useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore) {
            refineNext();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }

    return () => {};
  }, [hasMore, refineNext]);

  return (
    <>
      {hits.length > 0 && (
        <List spacing={3}>
          {hits.map((hit) => (
            <ListItem key={uuidv4()}>
              <Hit hit={hit} />
            </ListItem>
          ))}
          <ListItem ref={sentinelRef} aria-hidden="true" />
        </List>
      )}
    </>
  );
});

export const DesktopViewSearchBox = ({
  expanded,
  setExpanded
}: DesktopViewSearchBoxProps) => {
  const [isEditing, setIsEditing] = useBoolean();
  const searchBoxRef = React.useRef<any>(null);

  const meiliSearchClient = instantMeiliSearch(
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

  const client = {
    ...meiliSearchClient,
    search(requests: any) {
      if (requests.every(({ params }: { params: any }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: ''
          }))
        });
      }

      return meiliSearchClient.search(requests);
    }
  };

  const handleExpanded =
    (value: boolean) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      searchBoxRef.current?.focus();
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
            overflowY: 'auto',
            width: '100%',
            minH: '5rem',
            maxH: '25rem'
          }
        }}
      >
        <Popover
          isOpen={isEditing}
          onOpen={setIsEditing.on}
          onClose={setIsEditing.off}
          initialFocusRef={searchBoxRef}
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
                  <SearchBox ref={searchBoxRef} />
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
            <Flex flexDir="column" gap={3}>
              <Index indexName="pages">
                <Configure />
                <Hits />
              </Index>
              <Index indexName="blogs">
                <Configure />
                <Hits />
              </Index>
              <Index indexName="posts">
                <Configure />
                <Hits />
              </Index>
            </Flex>
          </PopoverContent>
        </Popover>
      </InputGroup>
    </InstantSearch>
  );
};
