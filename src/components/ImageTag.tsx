import { Center, Card as ChakraCard, Image } from '@chakra-ui/react';
import { ImageTagGroupItemType } from '../blocks';

export interface ImageTagProps {
  imageTag: ImageTagGroupItemType;
}

export const ImageTag = ({ imageTag }: ImageTagProps) => (
  <ChakraCard
    boxSize="full"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="border.primary"
    variant="outline"
  >
    <Center boxSize="full">
      <Image
        objectFit="contain"
        src={imageTag.image.url}
        alt={imageTag.image.alt}
      />
    </Center>
  </ChakraCard>
);
