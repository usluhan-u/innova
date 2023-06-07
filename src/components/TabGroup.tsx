import React from 'react';
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { TabGroupType } from '../blocks';
import { RenderBlocks } from './RenderBlocks';
import { Dropdown } from './Dropdown';
import { Template } from './Template';

export interface TabGroupProps extends TabGroupType {}

export const TabGroup = ({
  backgroundColor,
  items,
  alignment,
  orientation,
  width
}: TabGroupProps) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const [selectedDropdownValue, setSelectedDropdownValue] = React.useState(0);

  const getOptions = () =>
    items.map((item, index) => ({
      label: item.label,
      value: index.toString()
    }));

  const handleDropdownOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => setSelectedDropdownValue(Number(event.target.value));

  return (
    <Template backgroundColor={backgroundColor} width={width}>
      {isLargerThanMd ? (
        <Flex
          boxSize="full"
          justify={orientation === 'vertical' ? 'center' : 'inherit'}
        >
          <Tabs align={alignment} orientation={orientation} isFitted>
            <TabList
              borderInlineStart={
                orientation === 'vertical' ? 'none' : 'inherit'
              }
              borderBottom={orientation === 'vertical' ? 'none' : '2px solid'}
              borderInlineEnd={orientation === 'vertical' ? 'none' : 'inherit'}
              borderRight={orientation === 'vertical' ? '2px solid' : 'none'}
              borderColor="inherit"
              width="full"
              alignItems={orientation === 'vertical' ? 'flex-end' : 'inherit'}
            >
              {items.map((item) => (
                <Tab
                  key={uuidv4()}
                  color="text.secondary.100"
                  fontWeight="medium"
                  fontSize={orientation === 'vertical' ? 'xl' : 'sm'}
                  _selected={{
                    borderInlineStart: 'none',
                    borderInlineEnd: 'inherit',
                    color: 'text.primary',
                    borderColor: 'background.blue.100'
                  }}
                >
                  {item.label}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {items.map((item) => (
                <TabPanel key={uuidv4()}>
                  <RenderBlocks layout={item.layout} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Flex>
      ) : (
        <Dropdown
          options={getOptions()}
          value={selectedDropdownValue.toString()}
          onChange={handleDropdownOnChange}
        >
          <RenderBlocks layout={items[selectedDropdownValue].layout} />
        </Dropdown>
      )}
    </Template>
  );
};
