import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Center,
  Icon,
  Image
} from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import { ImageDownloaderGroupItemType } from '../blocks';

export interface ImageDownloaderProps {
  imageDownloader: ImageDownloaderGroupItemType;
}

export const ImageDownloader = ({ imageDownloader }: ImageDownloaderProps) => {
  const handleDownload = async () => {
    const { image } = imageDownloader;

    const response = await fetch(image.url);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = image.filename;
    link.click();
  };

  return (
    <Card
      boxSize="full"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.primary"
      variant="outline"
      onClick={handleDownload}
      _hover={{ cursor: 'pointer' }}
    >
      <CardBody>
        <Center boxSize="full">
          <Image
            objectFit="contain"
            src={imageDownloader.coverImage?.url || imageDownloader.image.url}
            alt={imageDownloader.coverImage?.alt || imageDownloader.image.alt}
          />
        </Center>
      </CardBody>
      <CardFooter p="2" justify="flex-end">
        <Icon as={FiDownload} fontSize="1rem" color="background.blue.100" />
      </CardFooter>
    </Card>
  );
};
