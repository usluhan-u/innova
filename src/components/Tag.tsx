import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Box,
  Text,
  Flex,
  Center
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { TagGroupItemType } from '../blocks';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface TagProps {
  tag: TagGroupItemType;
}

export const Tag = ({ tag }: TagProps) => (
  <Card
    w={{ base: 'full', md: 'xs' }}
    overflow="hidden"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="border.primary"
    variant="outline"
  >
    <CardBody>
      <Center>
        <Flex flexDir="column" gap={4}>
          <Flex align="center" gap={4}>
            <Center bgColor="background.secondary" borderRadius="lg" p={2}>
              <Box boxSize="48px">
                <Image
                  objectFit="cover"
                  src={tag.icon.url}
                  alt={tag.icon.alt}
                />
              </Box>
            </Center>
            <Text color="text.primary" fontWeight="medium" fontSize="2xl">
              {tag.title}
            </Text>
          </Flex>
          {tag.content && (
            <Text color="text.primary" fontWeight="normal" fontSize="md">
              {tag.content}
            </Text>
          )}
        </Flex>
      </Center>
    </CardBody>
    {tag.callToAction.enable && tag.callToAction.callToAction && (
      <CardFooter>
        <TextIconCallToAction
          {...tag.callToAction.callToAction}
          icon={FiArrowRight}
          color="text.blue"
        />
      </CardFooter>
    )}
  </Card>
);
