import React from 'react';
import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

export interface InternalLinkProps extends LinkProps {
  children: React.ReactNode | React.ReactNode[];
  slug: string;
  newTab?: boolean;
}

export const InternalLink = ({
  slug,
  children,
  newTab,
  ...rest
}: InternalLinkProps) => {
  const newTabProps = newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      href={slug}
      as={NextLink}
      scroll={false}
      _hover={{ textDecoration: 'none' }}
      {...newTabProps}
      {...rest}
    >
      {children}
    </Link>
  );
};
