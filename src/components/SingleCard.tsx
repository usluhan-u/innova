import {
  Box,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  Flex,
  Image,
  Text
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { InternalLink } from './InternalLink';
import { CategoryType, PageType } from '../collections';
import { MediaTypeMediaType } from '../blocks';

export interface SingleCardProps {
  header: string;
  publishDate: string;
  category: CategoryType;
  media: MediaTypeMediaType;
  internalLink: {
    label: string;
    page: PageType;
  };
}

export const SingleCard = ({
  category,
  header,
  internalLink,
  publishDate,
  media
}: SingleCardProps) => (
  <ChakraCard w="md">
    <Image objectFit="cover" src={media.url} alt={media.alt} h="2xs" />
    <CardBody>
      <Text>{header}</Text>
      <Flex pt={2} gap={2} alignItems="center">
        <Text color="text.secondary">
          {format(new Date(publishDate), 'MMMM dd, yyyy')}
        </Text>
        <Box boxSize="2" borderRadius="full" bgColor="text.secondary" />
        <Text color="text.secondary">{category.label}</Text>
      </Flex>
    </CardBody>

    <CardFooter justify="space-between" flexWrap="wrap">
      <InternalLink
        href={internalLink.page.slug}
        color="text.blue"
        icon={<ArrowForwardIcon />}
      >
        {internalLink.label}
      </InternalLink>
    </CardFooter>
  </ChakraCard>
);
