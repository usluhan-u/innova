import {
  Card,
  CardBody,
  Heading,
  Stack,
  VStack,
  Text,
  Grid,
  GridItem,
  Avatar
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { SmallCardsType } from '../blocks';
import { RichText } from './RichText';

export interface SmallCardsProps extends SmallCardsType {}

export const SmallCards = ({ header, smallCards }: SmallCardsProps) => {
  const a = 1;

  return (
    <VStack gap={8}>
      {header && (
        <RichText content={header.content} textAlign={header.alignment} />
      )}
      <Grid templateColumns="repeat(4, 1fr)" gap={8}>
        {smallCards.map((smallCard) => (
          <GridItem key={uuidv4()}>
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
              <Avatar src={smallCard.media.url} borderRadius="none" />
              <Stack>
                <CardBody>
                  <Heading size="md">{smallCard.title}</Heading>
                  {smallCard.content && <Text py="4">{smallCard.content}</Text>}
                </CardBody>
              </Stack>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};
