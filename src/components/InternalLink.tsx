import Link from 'next/link';

export interface InternalLinkProps {
  children: React.ReactNode | React.ReactNode[];
  slug: string;
}

export const InternalLink = ({ slug, children }: InternalLinkProps) => (
  <Link href="[...slug]" as={slug} scroll={false}>
    {children}
  </Link>
);
