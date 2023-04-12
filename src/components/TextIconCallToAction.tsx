import { ChakraProps, Flex, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { CallToAction, CallToActionProps } from './CallToAction';

export interface TextIconCallToActionProps
  extends CallToActionProps,
    Pick<ChakraProps, 'color'> {
  icon: IconType;
}

export const TextIconCallToAction = ({
  label,
  type,
  page,
  url,
  icon,
  color
}: TextIconCallToActionProps) => (
  <Flex
    align="center"
    gap={2}
    color={color}
    // transitionProperty="all"
    // transitionDuration="100ms"
    // transitionTimingFunction="ease-in-out"
    // transition="all 100ms ease-in-out"
    // _hover={{ textDecoration: 'none', transform: 'translateX(0.15em)' }}
  >
    <CallToAction label={label} type={type} page={page} url={url} />
    <Icon as={icon} />
  </Flex>
);
