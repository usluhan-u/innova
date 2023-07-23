import React from 'react';
import { Center, Card, CardBody } from '@chakra-ui/react';
import { ImageTagGroupItemType } from '../blocks';
import { Image } from './Image';

export interface ImageTagProps {
  imageTag: ImageTagGroupItemType;
}

export const ImageTag = ({ imageTag }: ImageTagProps) => (
  <Card
    boxSize="full"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="border.primary"
    variant="outline"
  >
    <CardBody>
      <Center boxSize="full">
        <Image
          src={imageTag.image.url}
          alt={imageTag.image.alt}
          objectFit="contain"
          h="40"
        />
      </Center>
    </CardBody>
  </Card>
);
