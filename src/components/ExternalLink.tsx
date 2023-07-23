import React from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';
import escapeHTML from 'escape-html';

export interface ExternalLinkProps extends LinkProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  newTab?: boolean;
}

export const ExternalLink = ({
  children,
  href,
  newTab,
  ...rest
}: ExternalLinkProps) => {
  const newTabProps = newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      as={NextLink}
      href={escapeHTML(href)}
      scroll={false}
      textDecoration="none"
      aria-label={href}
      _hover={{ textDecoration: 'none' }}
      {...newTabProps}
      {...rest}
    >
      {children}
    </Link>
  );
};
