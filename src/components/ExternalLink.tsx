import { ArrowForwardIcon } from '@chakra-ui/icons';
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
    fontWeight={500}
    fontSize="14px"
    color="text.blue"
    scroll={false}
    textDecoration="none"
    target={newTab ? '_blank' : '_self'}
    rel="noopener noreferrer"
    _hover={{ textDecoration: 'none' }}
    transitionProperty="all"
    transitionDuration="100ms"
    transitionTimingFunction="ease-in-out"
    className="transition-all duration-100 ease-in-out hover:tracking-[0.15em]"
  >
    {children} <ArrowForwardIcon />
  </Link>
);
