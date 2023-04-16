import {
  Card as ChakraCard,
  CardBody as ChakraCardBody,
  Image
} from '@chakra-ui/react';
import { ImageTagGroupItemType } from '../blocks';

export interface ImageTagProps {
  imageTag: ImageTagGroupItemType;
}

export const ImageTag = ({ imageTag }: ImageTagProps) => (
  <ChakraCard
    boxSize="full"
    overflow="hidden"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="border.primary"
    variant="outline"
    align="center"
    px={7}
    py={6}
  >
    <ChakraCardBody
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={0}
    >
      <Image
        objectFit="contain"
        src={imageTag.image.url}
        alt={imageTag.image.alt}
      />
    </ChakraCardBody>
  </ChakraCard>
);
