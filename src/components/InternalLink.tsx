import { Link } from '@chakra-ui/next-js';
import { ChakraProps } from '@chakra-ui/react';
import escapeHTML from 'escape-html';

export interface InternalLinkProps extends ChakraProps {
  href: string;
  children: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode;
  color?: string;
  fontWeight?: string;
}

export const InternalLink = ({
  href,
  children,
  icon,
  color,
  fontWeight,
  ...rest
}: InternalLinkProps) => (
  <Link
    href={escapeHTML(href)}
    scroll={false}
    textDecoration="none"
    color={color}
    fontWeight={fontWeight}
    _hover={{ textDecoration: 'none' }}
    {...rest}
  >
    {children} {icon}
  </Link>
);
