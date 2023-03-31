import { Link } from '@chakra-ui/next-js';
import escapeHTML from 'escape-html';

export interface ExternalLinkProps {
  href: string;
  newTab?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export const ExternalLink = ({ href, newTab, children }: ExternalLinkProps) => (
  <Link
    href={escapeHTML(href)}
    scroll={false}
    textDecoration="none"
    target={newTab ? '_blank' : '_self'}
    rel="noopener noreferrer"
    _hover={{ textDecoration: 'none' }}
  >
    {children}
  </Link>
);
