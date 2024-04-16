import React from 'react';
import { ChakraProps, Divider, Flex, chakra } from '@chakra-ui/react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { renderToStaticMarkup } from 'react-dom/server';
import { FooterType, SocialMediaType } from '../globals';
import { FooterBackground, LogoDark } from '../icons';
import { SocialMedia } from './SocialMedia';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';
import { RichText } from './RichText';
import { Container } from './Container';
import { BackgroundImage } from './BackgroundImage';

export interface FooterProps extends Pick<ChakraProps, 'marginTop'> {
  socialMedia: SocialMediaType;
  footer: FooterType;
}

export const Footer = ({ socialMedia, footer }: FooterProps) => {
  const svgString = encodeURIComponent(
    renderToStaticMarkup(<FooterBackground />)
  );

  return (
    <BackgroundImage url={`data:image/svg+xml,${svgString}`}>
      <Container>
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
              {footer.linkGroups?.map((linkGroup) => (
                <Flex
                  key={uuidv4()}
                  flexDir="column"
                  color="text.light"
                  gap={5}
                >
                  {linkGroup.links.map((link) => (
                    <chakra.div
                      key={uuidv4()}
                      fontWeight={link.bold ? 'semibold' : 'normal'}
                    >
                      {link.callToAction &&
                        Object.keys(link.callToAction).length > 0 && (
                          <>
                            {link.callToAction.page && (
                              <InternalLink
                                slug={link.callToAction.page.slug}
                                fontSize="sm"
                              >
                                {link.callToAction.label}
                              </InternalLink>
                            )}
                            {link.callToAction.url && (
                              <ExternalLink
                                href={link.callToAction.url}
                                fontSize="sm"
                              >
                                {link.callToAction.label}
                              </ExternalLink>
                            )}
                          </>
                        )}
                    </chakra.div>
                  ))}
                </Flex>
              ))}
            </Flex>
            {footer.contact && (
              <RichText content={footer.contact} color="text.light" />
            )}
          </Flex>
          <Divider my={8} />
          <Flex align="center" justify="space-between">
            <LogoDark />
            <Flex align="center" gap={2}>
              {socialMedia.facebook && (
                <SocialMedia icon={FaFacebookF} href={socialMedia.facebook} />
              )}
              {socialMedia.linkedIn && (
                <SocialMedia icon={FaLinkedin} href={socialMedia.linkedIn} />
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
      </Container>
    </BackgroundImage>
  );
};
