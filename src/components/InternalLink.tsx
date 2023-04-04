import { Link } from '@chakra-ui/next-js';
import escapeHTML from 'escape-html';

export interface InternalLinkProps {
  href: string;
  children: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  color?: string;
}

export const InternalLink = ({
  href,
  children,
  icon,
  color
}: InternalLinkProps) => (
  <Link
    href={escapeHTML(href)}
    scroll={false}
    textDecoration="none"
    color={color}
    _hover={{ textDecoration: 'none' }}
  >
    {children} {icon}
  </Link>
);
