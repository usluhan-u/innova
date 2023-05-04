import React from 'react';
import Link from 'next/link';

export interface InternalLinkProps {
  children: React.ReactNode | React.ReactNode[];
  slug: string;
  newTab?: boolean;
}

export const InternalLink = ({ slug, children, newTab }: InternalLinkProps) => {
  const newTabProps = newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link href={slug} as={slug} scroll={false} {...newTabProps}>
      {children}
    </Link>
  );
};
