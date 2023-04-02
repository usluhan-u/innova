import { Button, ThemeTypings } from '@chakra-ui/react';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './GenericLink';

export interface CallToActionProps {
  blockType: 'callToAction';
  label: string;
  url: string;
  type: 'page' | 'custom';
  newTab?: boolean;
  backgroundColor: ThemeTypings['colorSchemes'];
}

export const CallToAction = ({
  backgroundColor = 'blue',
  url,
  type,
  newTab,
  label
}: CallToActionProps) => {
  const isRelative = url.startsWith('/');

  return (
    <>
      {(type === 'page' || isRelative) && (
        <InternalLink href="[...slug]">
          <Button colorScheme={backgroundColor}>{label}</Button>
        </InternalLink>
      )}
      {type === 'custom' && (
        <ExternalLink href={url} newTab={newTab}>
          <Button colorScheme={backgroundColor}>{label}</Button>
        </ExternalLink>
      )}
    </>
  );
};
