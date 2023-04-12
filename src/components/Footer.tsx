import { ChakraProps, Divider, Flex, chakra } from '@chakra-ui/react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import {
  FooterLinkGroupLinkType,
  FooterType,
  SocialMediaType
} from '../globals';
import { BackgroundColor } from './BackgroundColor';
import { LogoDark } from '../icons';
import { SocialMedia } from './SocialMedia';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';
import { RichText } from './RichText';

export interface FooterProps extends Pick<ChakraProps, 'marginTop'> {
  socialMedia: SocialMediaType;
  footer: FooterType;
}

export const Footer = ({ socialMedia, footer }: FooterProps) => {
  const renderLink = (link: FooterLinkGroupLinkType) => {
    if (link.callToAction.page) {
      return (
        <InternalLink href={link.callToAction.page}>
          {link.callToAction.label}
        </InternalLink>
      );
    }

    if (link.callToAction.url) {
      return (
        <ExternalLink href={link.callToAction.url}>
          {link.callToAction.label}
        </ExternalLink>
      );
    }

    return null;
  };

  return (
    <BackgroundColor bgColor="background.dark">
      <Flex flexDir="column" w="full" pt={10} pb={5}>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          justify={{ base: 'initial', md: 'space-between' }}
          color="text.light"
          gap={{ base: 8, md: 0 }}
        >
          <Flex
            justify={{ base: 'space-between', md: 'initial' }}
            gap={{ base: 6, md: 12 }}
          >
            {footer.linkGroups.map((linkGroup) => (
              <Flex key={uuidv4()} flexDir="column" color="text.light" gap={5}>
                {linkGroup.links.map((link) => (
                  <chakra.div
                    key={uuidv4()}
                    fontWeight={link.bold ? 'semibold' : 'normal'}
                  >
                    {renderLink(link)}
                  </chakra.div>
                ))}
              </Flex>
            ))}
          </Flex>
          <RichText content={footer.contact} />
        </Flex>
        <Divider my={8} />
        <Flex align="center" justify="space-between">
          <LogoDark />
          <Flex align="center" gap={2}>
            {socialMedia.facebook && (
              <SocialMedia icon={FaFacebookF} href={socialMedia.facebook} />
            )}
            {socialMedia.linkedIn && (
              <SocialMedia icon={FaLinkedinIn} href={socialMedia.linkedIn} />
            )}
            {socialMedia.youtube && (
              <SocialMedia icon={FaYoutube} href={socialMedia.youtube} />
            )}
            {socialMedia.twitter && (
              <SocialMedia icon={FaTwitter} href={socialMedia.twitter} />
            )}
            {socialMedia.instagram && (
              <SocialMedia icon={FaInstagram} href={socialMedia.instagram} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </BackgroundColor>
  );
};
