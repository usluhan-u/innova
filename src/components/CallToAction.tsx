import { CallToActionType } from '../fields';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';

export interface CallToActionProps extends CallToActionType {}

export const CallToAction = ({ label, type, page, url }: CallToActionProps) => (
  <>
    {type === 'page' && page && (
      <InternalLink href={page}>{label}</InternalLink>
    )}
    {type === 'custom' && url && (
      <ExternalLink href={url}>{label}</ExternalLink>
    )}
    {type !== 'page' && type !== 'custom' && <>{null}</>}
  </>
);
