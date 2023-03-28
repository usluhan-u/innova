import { Link } from '@chakra-ui/next-js';

export interface GenericLinkProps {
  href: string;
  children: React.ReactNode | React.ReactNode[];
}

export const GenericLink = ({ href, children }: GenericLinkProps) => {
  return (
    <Link
      href={href}
      scroll={false}
      textDecoration="none"
      _hover={{ textDecoration: 'none' }}
    >
      {children}
    </Link>
  );
};
