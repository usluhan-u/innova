import { Link } from '@chakra-ui/next-js';
import { ChakraProps } from '@chakra-ui/react';
import escapeHTML from 'escape-html';

export interface InternalLinkProps extends ChakraProps {
  href: string;
  children: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  color?: string;
}

export const InternalLink = ({
  href,
  children,
  icon,
  color,
  ...rest
}: InternalLinkProps) => (
  <Link
    {...rest}
    href={escapeHTML(href)}
    scroll={false}
    textDecoration="none"
    color={color}
    _hover={{ textDecoration: 'none' }}
  >
    {children} {icon}
  </Link>
);
