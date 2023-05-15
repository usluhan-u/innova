import React from 'react';
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink,
  Flex,
  Image,
  Select,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { Breadcrumb } from '@payloadcms/plugin-nested-docs/dist/types';
import { v4 as uuidv4 } from 'uuid';
import { FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { CallToActionGroupType, HeroType } from '../fields';
import { BackgroundImage } from './BackgroundImage';
import { ButtonCallToAction } from './ButtonCallToAction';
import { LinkButtonCallToAction } from './LinkButtonCallToAction';
import { DotSlider } from './DotSlider';
import { AutoPosition } from './AutoPosition';

export interface HeroProps extends HeroType {
  breadcrumbs?: Breadcrumb[];
  activeSlug: string;
}

interface CallToActionGroupDesktopViewProps {
  activeSlug: string;
  callToActionGroup?: CallToActionGroupType[];
}

const CallToActionGroupDesktopView = ({
  callToActionGroup,
  activeSlug
}: CallToActionGroupDesktopViewProps) => (
  <Flex gap={8}>
    {callToActionGroup?.map((item) => (
      <LinkButtonCallToAction
        key={uuidv4()}
        {...item.callToAction}
        active={
          item.callToAction.page?.slug === activeSlug ||
          item.callToAction.url === activeSlug
        }
      />
    ))}
  </Flex>
);

interface CallToActionGroupMobileViewProps
  extends CallToActionGroupDesktopViewProps {}

const CallToActionGroupMobileView = ({
  activeSlug,
  callToActionGroup
}: CallToActionGroupMobileViewProps) => {
  const router = useRouter();

  return (
    <Select
      variant="filled"
      value={activeSlug}
      color="text.primary"
      bgColor="background.gray.primary"
      borderRadius="3xl"
      border="none"
      py={4}
      onChange={(e) => router.push(e.target.value)}
      _focus={{ bgColor: 'background.gray.primary' }}
    >
      {callToActionGroup?.map((item) => (
        <option
          key={uuidv4()}
          value={item.callToAction.page?.slug || item.callToAction.url}
          aria-label={item.callToAction.label}
        >
          {item.callToAction.label}
        </option>
      ))}
    </Select>
  );
};

export const Hero = ({
  backgroundImage,
  description: subtitle,
  title,
  logo,
  breadcrumbs,
  callToAction,
  callToActionGroup,
  activeSlug,
  type,
  slider
}: HeroProps) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {type === 'default' && (
        <BackgroundImage url={backgroundImage.url}>
          <AutoPosition>
            <Flex
              w="full"
              minH="2xs"
              flexDir="column"
              color="text.light"
              justify="space-between"
              gap={{ base: 2, md: 0 }}
            >
              <Flex
                flexDir={{ base: 'column', md: 'row' }}
                align={{ base: 'flex-start', md: 'center' }}
                justify="space-between"
                gap={4}
              >
                <ChakraBreadcrumb>
                  {breadcrumbs?.map((breadcrumb, index) => (
                    <ChakraBreadcrumbItem
                      key={uuidv4()}
                      fontWeight="normal"
                      fontSize="sm"
                      textColor={
                        index === breadcrumbs.length - 1
                          ? 'text.light'
                          : 'text.gray'
                      }
                      isCurrentPage={index === breadcrumbs.length - 1}
                    >
                      <ChakraBreadcrumbLink href={breadcrumb.url}>
                        {breadcrumb.label}
                      </ChakraBreadcrumbLink>
                    </ChakraBreadcrumbItem>
                  ))}
                </ChakraBreadcrumb>
                <Flex
                  flexDir={{ base: 'column', md: 'row' }}
                  align={{ base: 'flex-start', md: 'center' }}
                  gap={4}
                >
                  {logo && <Image src={logo?.url} alt={logo?.alt} />}
                  {callToAction && Object.keys(callToAction).length > 0 && (
                    <ButtonCallToAction
                      {...callToAction}
                      rightIcon={<FiArrowRight />}
                    />
                  )}
                </Flex>
              </Flex>
              <Flex flexDir="column" gap={{ base: 4, md: 0 }}>
                <Text
                  fontWeight="semibold"
                  fontSize={{ base: '2xl', md: '4xl' }}
                >
                  {title}
                </Text>
                {subtitle && (
                  <Text
                    fontWeight="medium"
                    fontSize={{ base: 'md', md: '2xl' }}
                  >
                    {subtitle}
                  </Text>
                )}
              </Flex>
              <Flex>
                {callToActionGroup &&
                  Object.keys(callToActionGroup).length > 0 && (
                    <>
                      {isLargerThanMd ? (
                        <CallToActionGroupDesktopView
                          callToActionGroup={callToActionGroup}
                          activeSlug={activeSlug}
                        />
                      ) : (
                        <CallToActionGroupMobileView
                          callToActionGroup={callToActionGroup}
                          activeSlug={activeSlug}
                        />
                      )}
                    </>
                  )}
              </Flex>
            </Flex>
          </AutoPosition>
        </BackgroundImage>
      )}
      {type === 'home' && slider && (
        <DotSlider blockType="dotSlider" slider={slider} />
      )}
    </>
  );
};
