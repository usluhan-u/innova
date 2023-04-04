import { Card, CardBody, Heading, Stack, Text, Avatar } from '@chakra-ui/react';
import { MediaTypeMediaType } from '../blocks';

export interface SingleSmallCardProps {
  title: string;
  content?: string;
  media: MediaTypeMediaType;
}

export const SingleSmallCard = ({
  title,
  content,
  media
}: SingleSmallCardProps) => (
  <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow="hidden"
    variant="outline"
    alignItems="center"
    justifyContent="space-between"
    py="8"
    px="4"
    borderRadius={8}
    w="20rem"
    h="7rem"
    _hover={{ boxShadow: '2xl' }}
  >
    <Avatar src={media.url} borderRadius="none" />
    <Stack>
      <CardBody>
        <Heading size="md">{title}</Heading>
        {content && <Text py="4">{content}</Text>}
      </CardBody>
    </Stack>
  </Card>
);
