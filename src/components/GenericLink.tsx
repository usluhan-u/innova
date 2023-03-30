import { Link } from '@chakra-ui/next-js';
import escapeHTML from 'escape-html';

export interface GenericLinkProps {
  href: string;
  children: React.ReactNode | React.ReactNode[];
}

export const GenericLink = ({ href, children }: GenericLinkProps) => {
  return (
    <Link
      href={escapeHTML(href)}
      scroll={false}
      textDecoration="none"
      _hover={{ textDecoration: 'none' }}
    >
      {children}
    </Link>
  );
};
