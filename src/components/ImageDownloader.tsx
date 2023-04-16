import {
  Card,
  CardBody,
  CardFooter,
  Center,
  IconButton,
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
    >
      <CardBody>
        <Center boxSize="full">
          <Image
            objectFit="contain"
            src={imageDownloader.image.url}
            alt={imageDownloader.image.alt}
          />
        </Center>
      </CardBody>
      <CardFooter p="-9" justify="flex-end">
        <IconButton
          variant="ghost"
          aria-label="Download"
          icon={<FiDownload size="1em" />}
          color="background.blue"
          onClick={handleDownload}
        />
      </CardFooter>
    </Card>
  );
};
