import React from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { BackgroundImage } from './BackgroundImage';
import { TextIconCallToAction } from './TextIconCallToAction';
import { Template } from './Template';
import { FlippableCardType } from '../blocks';
import { RichText } from './RichText';

interface UnstyledFlippableCardProps
  extends Omit<FlippableCardType, 'backgroundColor' | 'width'> {}

interface FlippableCardProps extends FlippableCardType {}

export const UnstyledFlippableCard = ({
  type,
  customData,
  post
}: UnstyledFlippableCardProps) => {
  const { locale } = useRouter();
  const [flipped, setFlipped] = React.useState(false);

  return (
    <Box
      pos="relative"
      bgColor="background.primary"
      h="64"
      w="full"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <Flex pos="relative" boxSize="full">
        <Flex
          boxSize="full"
          pos="relative"
          transform={`rotateY(${flipped ? 180 : 0}deg)`}
          transition="all 1s ease-in-out"
          cursor="pointer"
          sx={{
            backfaceVisibility: 'hidden'
          }}
        >
          {type === 'custom' && customData && (
            <BackgroundImage url={customData.featuredImage.url} />
          )}

          {type === 'post' && post && (
            <BackgroundImage url={post.featuredImage.url} />
          )}
        </Flex>
        <VStack
          boxSize="full"
          align="stretch"
          justify="space-between"
          pos="absolute"
          transform={`rotateY(${flipped ? 0 : -180}deg)`}
          transition="all 1s ease-in-out"
          cursor="pointer"
          overflow="hidden"
          p="8"
          sx={{
            backfaceVisibility: 'hidden'
          }}
        >
          {type === 'custom' && customData && (
            <RichText content={customData.content} />
          )}

          {type === 'post' && post && (
            <>
              {post.category && (
                <Text fontWeight="bold">{post.category.name}</Text>
              )}
              {post.name && (
                <Box maxW="100%" overflow="hidden">
                  <Text overflow="hidden" textOverflow="ellipsis" noOfLines={5}>
                    {post.name}
                  </Text>
                </Box>
              )}
              <TextIconCallToAction
                label={locale === 'tr' ? 'Detaylı Bilgi' : 'Read More'}
                type="page"
                page={{
                  slug: `${post.group.slug}/${post.slug}`,
                  name: post.name,
                  breadcrumbs: post.breadcrumbs,
                  meta: post.meta,
                  localizedSlugs: post.localizedSlugs
                }}
                color="text.dark"
                icon={FiArrowRight}
              />
            </>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export const FlippableCard = ({
  backgroundColor,
  width,
  type,
  customData,
  post
}: FlippableCardProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <UnstyledFlippableCard
      type={type}
      customData={customData}
      post={post}
      blockType="flippableCard"
    />
  </Template>
);
