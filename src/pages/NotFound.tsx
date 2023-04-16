import { Flex, Text } from '@chakra-ui/react';
import { CallToActionType } from '../fields';
import { ButtonCallToAction } from '../components';

export interface NotFoundProps {
  description?: string;
  detailedDescription?: string;
  callToAction?: CallToActionType;
}

export const NotFound = ({
  description,
  detailedDescription,
  callToAction
}: NotFoundProps) => (
  <Flex
    align="center"
    justify="center"
    flexDir="column"
    boxSize="full"
    gap={6}
    flexGrow={1}
  >
    <Flex flexDir="column" gap={2}>
      {description && (
        <Text color="text.primary" fontWeight="medium" fontSize={36}>
          {description}
        </Text>
      )}
      {detailedDescription && (
        <Text color="text.secondary.100" fontWeight="normal" fontSize={20}>
          {detailedDescription}
        </Text>
      )}
    </Flex>
    {callToAction && <ButtonCallToAction {...callToAction} />}
  </Flex>
);
