import React from 'react';
import { Center, Card, CardBody, Image } from '@chakra-ui/react';
import { ImageTagGroupItemType } from '../blocks';

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
          objectFit="fill"
          src={imageTag.image.url}
          alt={imageTag.image.alt}
        />
      </Center>
    </CardBody>
  </Card>
);
