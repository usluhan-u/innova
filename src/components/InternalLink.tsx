import { Link } from '@chakra-ui/next-js';
import escapeHTML from 'escape-html';

export interface InternalLinkProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
}

export const InternalLink = ({ href, children }: InternalLinkProps) => (
  <Link
    href={escapeHTML(href)}
    scroll={false}
    textDecoration="none"
    _hover={{ textDecoration: 'none' }}
  >
    {children}
  </Link>
);
