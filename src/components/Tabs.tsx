import {
  VStack,
  Tabs as ChakraTabs,
  TabList as ChakraTablist,
  Tab as ChakraTab,
  TabPanels as ChakraTabPanels,
  TabPanel as ChakraTabPanel,
  Container
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { TabsType } from '../blocks';
import { RichText } from './RichText';
import { RenderBlocks } from './RenderBlocks';

export interface TabsProps extends TabsType {}

export const Tabs = ({ header, tabs, alignment }: TabsProps) => {
  const getAlignment = (alignment: string) => {
    const alignmentMap: Record<string, 'start' | 'end' | 'center'> = {
      left: 'start',
      center: 'center',
      right: 'end'
    };

    return alignmentMap[alignment] || alignmentMap.left;
  };

  return (
    <VStack spacing={16} alignItems="initial">
      {header && <RichText content={header.content} />}
      {header?.description && <RichText content={header.description} />}
      <ChakraTabs align={getAlignment(alignment)}>
        <ChakraTablist
          maxW={alignment === 'center' ? 'fit-content' : 'initial'}
        >
          {tabs.map((tab) => (
            <ChakraTab
              key={uuidv4()}
              color="text.secondary"
              fontWeight={500}
              fontSize="sm"
              _selected={{ color: 'text.primary' }}
            >
              {tab.title}
            </ChakraTab>
          ))}
        </ChakraTablist>
        <ChakraTabPanels textAlign="initial">
          {tabs.map((tab) => (
            <ChakraTabPanel key={uuidv4()}>
              <Container maxW="58rem">
                <RenderBlocks layout={tab.layout} paddingY="10" />
              </Container>
            </ChakraTabPanel>
          ))}
        </ChakraTabPanels>
      </ChakraTabs>
    </VStack>
  );
};
