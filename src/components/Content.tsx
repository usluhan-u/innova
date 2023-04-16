import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { ContentType } from '../blocks';
import { BackgroundColor } from './BackgroundColor';
import { RichText } from './RichText';
import { AutoPosition } from './AutoPosition';

export interface ContentProps extends ContentType {}

export const Content = ({ columns, backgroundColor, width }: ContentProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: `repeat(${columns.length}, 1fr)`
        }}
        gap={6}
      >
        {columns.map((column) => (
          <GridItem key={uuidv4()}>
            <Flex justify={width !== '100%' ? 'center' : 'normal'}>
              <Flex
                textAlign={{ base: 'justify', md: column.textAlign }}
                w={{ base: 'full', md: width }}
              >
                <RichText content={column.content} />
              </Flex>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </AutoPosition>
  </BackgroundColor>
);
