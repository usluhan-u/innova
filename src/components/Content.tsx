import React from 'react';
import { ContentType } from '../blocks';
import { Grid, GridItem } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { RichText } from './rich-text';

const colStyles = {
  oneThird: {
    cols: 4
  },
  half: {
    cols: 6
  },
  twoThirds: {
    cols: 8
  },
  full: {
    cols: 12
  }
};

export const Content = ({ columns, type }: ContentType) => {
  return (
    <Grid templateColumns={`repeat(${columns.length}, 1fr)`} gap={12}>
      {columns?.map((column) => (
        <GridItem key={uuidv4()} w="100%" justifyContent={column.alignment}>
          <RichText content={column.content} />
        </GridItem>
      ))}
    </Grid>
    // <div className={classes.content}>
    //   <Gutter left right>
    //     <BackgroundColor color={backgroundColor}>
    //       <Padding top={paddingTop} bottom={paddingBottom}>
    //         <GridContainer className={classes.gridContainer}>
    //           {accentLine && (
    //             <div
    //               className={[
    //                 classes.accentLine,
    //                 classes[`accentLine-${accentLineAlignment}`]
    //               ]
    //                 .filter(Boolean)
    //                 .join(' ')}
    //             />
    //           )}
    //           <Grid>
    //             {columns?.map((col, i) => (
    //               <Cell
    //                 key={i}
    //                 className={classes[`align-${col.alignment}`]}
    //                 {...colStyles[col.width]}
    //                 colsM={8}
    //               >
    //                 <RichText content={col.content} />
    //               </Cell>
    //             ))}
    //           </Grid>
    //         </GridContainer>
    //       </Padding>
    //     </BackgroundColor>
    //   </Gutter>
    // </div>
  );
};
