import { Link } from '@chakra-ui/next-js';
import escapeHTML from 'escape-html';

export interface ExternalLinkProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
}

export const ExternalLink = ({ children, href }: ExternalLinkProps) => (
  <Link
    href={escapeHTML(href)}
    scroll={false}
    textDecoration="none"
    target="_blank"
    rel="noopener noreferrer"
    _hover={{ textDecoration: 'none' }}
  >
    {children}
  </Link>
);
