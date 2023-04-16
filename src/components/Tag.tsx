import {
  Card as ChakraCard,
  CardBody as ChakraCardBody,
  CardHeader as ChakraCardHeader,
  CardFooter as ChakraCardFooter,
  Image,
  Box,
  Text,
  Flex,
  Center
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { TagGroupItemType } from '../blocks';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface TagProps {
  tag: TagGroupItemType;
}

export const Tag = ({ tag }: TagProps) => (
  <ChakraCard
    boxSize="full"
    overflow="hidden"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="border.primary"
    variant="outline"
    direction="column"
  >
    <ChakraCardHeader>
      <Flex align="center" gap={4}>
        <Center bgColor="background.secondary" borderRadius="lg" p={2}>
          <Box boxSize="48px">
            <Image objectFit="cover" src={tag.icon.url} alt={tag.icon.alt} />
          </Box>
        </Center>
        <Text color="text.primary" fontWeight="medium" fontSize="2xl">
          {tag.title}
        </Text>
      </Flex>
    </ChakraCardHeader>
    {tag.content && (
      <ChakraCardBody>
        <Text color="text.primary" fontWeight="normal" fontSize="md">
          {tag.content}
        </Text>
      </ChakraCardBody>
    )}
    {tag.callToActionToggle.enableCallToAction &&
      tag.callToActionToggle.callToAction && (
        <ChakraCardFooter>
          <TextIconCallToAction
            {...tag.callToActionToggle.callToAction}
            icon={FaArrowRight}
            color="text.blue"
          />
        </ChakraCardFooter>
      )}
  </ChakraCard>
);
