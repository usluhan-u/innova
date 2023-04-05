import { Box, Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { Slider } from './Slider';
import { CallToAction } from './CallToAction';
import { RichText } from './RichText';
import { HomeHeroSliderSlideType, HomeHeroType } from '../collections';
import { MediaViewer } from './MediaViewer';

export interface HomeHeroSliderProps extends HomeHeroType {}

interface SlideProps extends HomeHeroSliderSlideType {}

interface SliderWrapperProps {
  children: React.ReactNode | React.ReactNode[];
}

const Slide = ({ title, content, callToAction, media }: SlideProps) => (
  <Box pos="relative">
    <MediaViewer media={media} size={{ w: 'full', h: 'full' }} />
    <Flex
      flexDirection="column"
      gap={4}
      pos="absolute"
      bottom={{ base: '20%', md: '55%' }}
      left={{ base: '5%', md: '7%' }}
      textAlign="left"
      w={{ base: 'sm', md: 'xl' }}
      color="white"
    >
      {title && <RichText content={title} />}
      {content && <RichText content={content} />}
      {callToAction && <CallToAction {...callToAction} />}
    </Flex>
  </Box>
);

const SliderWrapper = ({ children }: SliderWrapperProps) => (
  <Flex
    w="full"
    flexDirection="column"
    pos="relative"
    overflow="hidden"
    sx={{
      '& .slick-dots': {
        position: 'absolute',
        bottom: { base: '7%', md: '5%' },
        left: { base: '5%', md: '7%' },
        textAlign: 'left',
        '& li': {
          '&.slick-active': {
            '& button': { backgroundColor: '#ffffff' }
          },
          '& button': {
            backgroundColor: '#8699a6',
            boxSize: { base: '0.5rem', md: '0.7rem' },
            padding: 0,
            borderRadius: '100%',
            border: 'none',
            textIndent: '-9999px',
            '&:hover': { backgroundColor: '#ffffff' }
          }
        }
      }
    }}
  >
    {children}
  </Flex>
);

export const HomeHeroSlider = ({ slides }: HomeHeroSliderProps) => {
  const getSliderSlides = (items: HomeHeroSliderSlideType[]) =>
    items.map((item) => <Slide {...item} key={uuidv4()} />);

  return (
    <SliderWrapper>
      <Slider slides={getSliderSlides(slides)} />
    </SliderWrapper>
  );
};
