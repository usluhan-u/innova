import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink,
  Flex,
  Image,
  Text
} from '@chakra-ui/react';
import { Breadcrumb } from '@payloadcms/plugin-nested-docs/dist/types';
import { v4 as uuidv4 } from 'uuid';
import { FaArrowRight } from 'react-icons/fa';
import { HeroType } from '../fields';
import { Container } from './Container';
import { BackgroundImage } from './BackgroundImage';
import { ButtonCallToAction } from './ButtonCallToAction';
import { LinkButtonCallToAction } from './LinkButtonCallToAction';

export interface HeroProps extends HeroType {
  breadcrumbs?: Breadcrumb[];
  activeSlug: string;
}

export const Hero = ({
  bgImage,
  subtitle,
  title,
  enableCallToAction,
  callToAction,
  logo,
  breadcrumbs,
  enableBottomCallToActions,
  bottomCallToActions,
  activeSlug
}: HeroProps) => (
  <BackgroundImage url={bgImage.url}>
    <Container>
      <Flex
        flexDir="column"
        color="text.light"
        h="full"
        justify="space-between"
      >
        <Flex align="center" justify="space-between" mt={10}>
          <ChakraBreadcrumb>
            {breadcrumbs?.map((breadcrumb, index) => (
              <ChakraBreadcrumbItem
                key={uuidv4()}
                textColor={
                  index === breadcrumbs.length - 1 ? 'text.light' : 'text.gray'
                }
                isCurrentPage={index === breadcrumbs.length - 1}
              >
                <ChakraBreadcrumbLink href={breadcrumb.url}>
                  {breadcrumb.label}
                </ChakraBreadcrumbLink>
              </ChakraBreadcrumbItem>
            ))}
          </ChakraBreadcrumb>
          <Flex align="center" gap={6}>
            {logo && <Image src={logo?.url} alt={logo?.alt} />}
            {enableCallToAction && callToAction && (
              <ButtonCallToAction
                {...callToAction}
                rightIcon={<FaArrowRight />}
              />
            )}
          </Flex>
        </Flex>
        <Flex flexDir="column">
          <Text fontWeight="semibold" fontSize="4xl">
            {title}
          </Text>
          <Text fontWeight="medium" fontSize="2xl">
            {subtitle}
          </Text>
        </Flex>
        <Flex align="center" gap={6}>
          {enableBottomCallToActions &&
            bottomCallToActions?.map((bottomCallToAction) => (
              <LinkButtonCallToAction
                key={uuidv4()}
                {...bottomCallToAction.callToAction}
                active={
                  bottomCallToAction.callToAction.page?.slug === activeSlug ||
                  bottomCallToAction.callToAction.url === activeSlug
                }
              />
            ))}
        </Flex>
      </Flex>
    </Container>
  </BackgroundImage>
);
