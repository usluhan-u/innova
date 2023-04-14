import { Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../blocks';
import { BackgroundColor } from './BackgroundColor';
import { RichText } from './RichText';
import { Container } from './Container';

export interface ContentProps extends ContentType {}

export const Content = ({ columns, backgroundColor, width }: ContentProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <Container>
      <Flex justify="center" my={8}>
        <Flex alignItems="flex-start" w={width}>
          {columns.map((column) => (
            <Flex
              key={uuidv4()}
              w={column.width}
              justify={column.align}
              textAlign={column.textAlign}
            >
              <RichText content={column.content} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Container>
  </BackgroundColor>
);
