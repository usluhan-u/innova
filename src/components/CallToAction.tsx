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
  url,
  newTab
}: CallToActionProps) => (
  <>
    {type === 'page' && page && (
      <InternalLink slug={page.slug} newTab={newTab}>
        {children}
      </InternalLink>
    )}
    {type === 'custom' && url && (
      <ExternalLink href={url} newTab={newTab}>
        {children}
      </ExternalLink>
    )}
    {type !== 'page' && type !== 'custom' && <>{null}</>}
  </>
);
