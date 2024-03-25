import React, { Suspense, lazy } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Box,
  Text,
  Flex,
  Center,
  ChakraProps
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { Player } from '@lottiefiles/react-lottie-player';
import useHover from '@react-hook/hover';
import NoSSR from 'react-no-ssr';
import { TagGroupItemType } from '../blocks';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface TagProps extends ChakraProps {
  tag: TagGroupItemType;
}

const LottiePlayer = lazy(() => import('./LottieAnimation'));

export const Tag = ({ tag, ...rest }: TagProps) => {
  const lottieRef = React.createRef<Player>();
  const cardRef = React.useRef(null);

  const isHovering = useHover(cardRef);

  React.useEffect(() => {
    if (tag.imageType === 'lottie' && lottieRef.current) {
      if (isHovering) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isHovering, lottieRef, tag.imageType]);

  return (
    <Card
      ref={cardRef}
      w="full"
      overflow="hidden"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.primary"
      variant="outline"
      {...rest}
    >
      <CardBody>
        <Flex flexDir="column" gap={4}>
          <Flex align="center" gap={4}>
            <Center bgColor="background.secondary" borderRadius="lg" p={2}>
              <Box boxSize="48px">
                {tag.imageType === 'icon' && tag.icon && (
                  <Image
                    objectFit="fill"
                    src={tag.icon.url}
                    alt={tag.icon.alt}
                    boxSize="full"
                  />
                )}
                {tag.imageType === 'lottie' && tag.lottie && (
                  <NoSSR>
                    <Suspense>
                      <LottiePlayer src={tag.lottie.url} ref={lottieRef} />
                    </Suspense>
                  </NoSSR>
                )}
              </Box>
            </Center>
            <Text color="text.primary" fontWeight="medium" fontSize="md">
              {tag.title}
            </Text>
          </Flex>
          {tag.content && (
            <Text color="text.primary" fontWeight="normal" fontSize="md">
              {tag.content}
            </Text>
          )}
        </Flex>
      </CardBody>
      {tag.callToAction && Object.keys(tag.callToAction).length > 0 && (
        <CardFooter>
          <TextIconCallToAction
            {...tag.callToAction}
            icon={FiArrowRight}
            color="text.dark"
          />
        </CardFooter>
      )}
    </Card>
  );
};
