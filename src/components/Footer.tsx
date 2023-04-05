import { Divider, Flex, Icon, Circle, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Link } from '@chakra-ui/next-js';
import escapeHTML from 'escape-html';
import { FooterType, SocialMediaType } from '../globals';
import { Template } from './Template';
import { InternalLink } from './InternalLink';
import { LogoDark } from '../icons';
import { RichText } from './RichText';

export interface FooterProps {
  socialMedia?: SocialMediaType;
  footer?: FooterType;
}

interface SocialMediaIconProps {
  icon: IconType;
  href: string;
}

const SocialMedia = ({ icon, href }: SocialMediaIconProps) => (
  <Link
    href={escapeHTML(href)}
    scroll={false}
    textDecoration="none"
    target="_blank"
    rel="noopener noreferrer"
    _hover={{ textDecoration: 'none' }}
  >
    <Circle bg="white" color="background.footer" size="32px">
      <Icon as={icon} />
    </Circle>
  </Link>
);

export const Footer = ({ socialMedia, footer }: FooterProps) => {
  const { asPath } = useRouter();

  return (
    <Template backgroundColor="background.footer">
      <Flex flexDirection="column" pt="2rem" pb="4rem" w="full">
        {footer && (
          <Flex color="white" justifyContent="space-between">
            <Flex gap={16}>
              {footer.linkGroups?.map((linkGroup) => (
                <Flex key={uuidv4()} flexDirection="column" gap={4}>
                  {linkGroup.links.map((link) =>
                    link.url ? (
                      <InternalLink
                        key={uuidv4()}
                        href={link.url}
                        fontWeight={link.bold ? 'bold' : 'normal'}
                      >
                        {link.label}
                      </InternalLink>
                    ) : (
                      <Text
                        key={uuidv4()}
                        fontWeight={link.bold ? 'bold' : 'normal'}
                      >
                        {link.label}
                      </Text>
                    )
                  )}
                </Flex>
              ))}
            </Flex>
            <RichText content={footer.otherInfo} />
          </Flex>
        )}
        <Divider my={8} />
        <Flex alignItems="center" justifyContent="space-between">
          <InternalLink href={asPath}>
            <LogoDark />
          </InternalLink>
          {socialMedia && (
            <Flex alignItems="center" gap={2}>
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
          )}
        </Flex>
      </Flex>
    </Template>
  );
};
