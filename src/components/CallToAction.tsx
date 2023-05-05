import React from 'react';
import { ChakraProps } from '@chakra-ui/react';
import { CallToActionType } from '../fields';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';

export interface CallToActionProps
  extends Omit<CallToActionType, 'label'>,
    ChakraProps {
  children: React.ReactNode | React.ReactNode[];
}

export const CallToAction = ({
  children,
  type,
  page,
  url,
  newTab,
  ...rest
}: CallToActionProps) => (
  <>
    {type === 'page' && page && (
      <InternalLink slug={page.slug} newTab={newTab} {...rest}>
        {children}
      </InternalLink>
    )}
    {type === 'custom' && url && (
      <ExternalLink href={url} newTab={newTab} {...rest}>
        {children}
      </ExternalLink>
    )}
    {type !== 'page' && type !== 'custom' && <>{null}</>}
  </>
);
