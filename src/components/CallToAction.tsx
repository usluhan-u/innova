import { Button, ThemeTypings } from '@chakra-ui/react';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';
import { CallToActionType } from '../blocks';

export interface CallToActionProps extends CallToActionType {
  backgroundColor?: ThemeTypings['colorSchemes'];
}

export const CallToAction = ({
  backgroundColor = 'blue',
  url,
  type,
  newTab,
  label
}: CallToActionProps) => (
  <>
    {type === 'internal' && (
      <InternalLink href="[...slug]">
        <Button colorScheme={backgroundColor}>{label}</Button>
      </InternalLink>
    )}
    {type === 'external' && url && (
      <ExternalLink href={url} newTab={newTab}>
        <Button colorScheme={backgroundColor}>{label}</Button>
      </ExternalLink>
    )}
  </>
);
