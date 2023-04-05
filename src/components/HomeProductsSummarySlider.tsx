import { Box, Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Slider } from './Slider';
import { CallToAction } from './CallToAction';
import { RichText } from './RichText';
import {
  HomeHeroSliderSlideType,
  HomeProductsSummaryType
} from '../collections';
import { MediaViewer } from './MediaViewer';

export interface HomeProductsSummarySliderProps
  extends HomeProductsSummaryType {}

interface SlideProps extends HomeHeroSliderSlideType {}

interface SliderWrapperProps {
  children: React.ReactNode | React.ReactNode[];
}

const Slide = ({ title, content, callToAction, media }: SlideProps) => (
  <Box pos="relative" h="md">
    <MediaViewer media={media} size={{ w: 'full', h: 'full' }} />
    <Flex
      flexDirection="column"
      gap={4}
      pos="absolute"
      bottom={{ base: '5%', md: '10%' }}
      left={{ base: '5%', md: '5%' }}
      textAlign="left"
      w="full"
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
    // h="md"
    flexDirection="column"
    pos="relative"
    // overflow="hidden"
    // sx={{
    //   '& .slick-dots': {
    //     position: 'absolute',
    //     bottom: { base: '7%', md: '5%' },
    //     left: { base: '5%', md: '7%' },
    //     textAlign: 'left',
    //     '& li': {
    //       '&.slick-active': {
    //         '& button': { backgroundColor: '#ffffff' }
    //       },
    //       '& button': {
    //         backgroundColor: '#8699a6',
    //         boxSize: { base: '0.5rem', md: '0.7rem' },
    //         padding: 0,
    //         borderRadius: '100%',
    //         border: 'none',
    //         textIndent: '-9999px',
    //         '&:hover': { backgroundColor: '#ffffff' }
    //       }
    //     }
    //   }
    // }}
  >
    {children}
  </Flex>
);

const PrevArrow = () => <ChevronLeftIcon size="lg" />;

const NextArrow = () => <ChevronRightIcon size="lg" />;

export const HomeProductsSummarySlider = ({
  slides,
  title
}: HomeProductsSummarySliderProps) => {
  const getSliderSlides = (items: HomeHeroSliderSlideType[]) =>
    items.map((item) => <Slide {...item} key={uuidv4()} />);

  return (
    <>
      <RichText
        content={title}
        marginBottom="2%"
        marginTop="3%"
        marginLeft="5%"
      />
      <SliderWrapper>
        <Slider
          slides={getSliderSlides(slides)}
          slidesToShow={3}
          slidesToScroll={3}
          dots={false}
          fade={false}
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 1
              }
            }
          ]}
          arrows
        />
      </SliderWrapper>
    </>
  );
};
