import { CallToActionType } from '../fields';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';

export interface CallToActionProps extends Omit<CallToActionType, 'label'> {
  children: React.ReactNode | React.ReactNode[];
}

export const CallToAction = ({
  children,
  type,
  page,
  url
}: CallToActionProps) => (
  <>
    {type === 'page' && page && (
      <InternalLink href={page}>{children}</InternalLink>
    )}
    {type === 'custom' && url && (
      <ExternalLink href={url}>{children}</ExternalLink>
    )}
    {type !== 'page' && type !== 'custom' && <>{null}</>}
  </>
);
