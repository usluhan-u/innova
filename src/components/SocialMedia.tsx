import React from 'react';
import { IconType } from 'react-icons';
import { Circle, Icon } from '@chakra-ui/react';
import { ExternalLink } from './ExternalLink';

export interface SocialMediaProps {
  icon: IconType;
  href: string;
}

export const SocialMedia = ({ icon, href }: SocialMediaProps) => (
  <ExternalLink href={href}>
    <Circle bg="white" color="background.dark" size="32px">
      <Icon as={icon} />
    </Circle>
  </ExternalLink>
);
