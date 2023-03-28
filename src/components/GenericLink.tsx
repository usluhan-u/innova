import { Link } from '@chakra-ui/next-js';

export interface GenericLinkProps {
  href: string;
  children: React.ReactNode | React.ReactNode[];
}

export const GenericLink = ({ href, children }: GenericLinkProps) => {
  return (
    <Link href={href} scroll={false}>
      {children}
    </Link>
  );
};
