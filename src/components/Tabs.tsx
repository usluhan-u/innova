import {
  Tabs as ChakraTabs,
  TabList as ChakraTablist,
  Tab as ChakraTab,
  TabPanels as ChakraTabPanels,
  TabPanel as ChakraTabPanel,
  Container,
  Flex,
  useMediaQuery,
  Select
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { TabsType } from '../blocks';
import { RichText } from './RichText';
import { RenderBlocks } from './RenderBlocks';

export interface TabsProps extends TabsType {}

export const Tabs = ({ header, tabs, alignment, orientation }: TabsProps) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const [value, setValue] = React.useState(0);

  const getAlignment = (alignment: string) => {
    const alignmentMap: Record<string, 'start' | 'end' | 'center'> = {
      left: 'start',
      center: 'center',
      right: 'end'
    };

    return alignmentMap[alignment] || alignmentMap.left;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setValue(Number(event.target.value));

  return (
    <Flex flexDirection="column" gap={{ base: 6, md: 16 }} alignItems="initial">
      {header && <RichText content={header.content} />}
      {header?.description && <RichText content={header.description} />}
      {isLargerThanMd ? (
        <ChakraTabs align={getAlignment(alignment)} orientation={orientation}>
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
      ) : (
        <>
          <Select variant="filled" value={value} onChange={handleOnChange}>
            {tabs.map((tab, index) => (
              <option key={uuidv4()} value={index} aria-label={tab.title}>
                {tab.title}
              </option>
            ))}
          </Select>
          <RenderBlocks layout={tabs[value].layout} paddingY="5" />
        </>
      )}
    </Flex>
  );
};
