import { Flex } from '@chakra-ui/react';

export interface BackgroundImageProps {
  url: string;
  children: React.ReactNode | React.ReactNode[];
}

export const BackgroundImage = ({ url, children }: BackgroundImageProps) => (
  <Flex
    w="full"
    minH="xs"
    bgImage={`url(${url})`}
    bgPos="center"
    bgRepeat="no-repeat"
    bgSize="cover"
  >
    {children}
  </Flex>
);
