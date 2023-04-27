import NextLink from 'next/link';
import { chakra } from '@chakra-ui/react';
import escapeHTML from 'escape-html';

export interface ExternalLinkProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  newTab?: boolean;
}

const Link = chakra(NextLink);

export const ExternalLink = ({ children, href, newTab }: ExternalLinkProps) => {
  const newTabProps = newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      href={escapeHTML(href)}
      scroll={false}
      textDecoration="none"
      {...newTabProps}
      _hover={{ textDecoration: 'none' }}
    >
      {children}
    </Link>
  );
};
