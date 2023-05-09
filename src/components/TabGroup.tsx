import React from 'react';
import {
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
        <Tabs align={alignment} orientation={orientation}>
          <TabList
            borderInlineStart={orientation === 'vertical' ? 'none' : 'inherit'}
            borderBottom={orientation === 'vertical' ? 'none' : '2px solid'}
            borderInlineEnd={orientation === 'vertical' ? 'none' : 'inherit'}
            borderRight={orientation === 'vertical' ? '2px solid' : 'none'}
            borderColor="inherit"
          >
            {items.map((item) => (
              <Tab
                key={uuidv4()}
                color="text.secondary.100"
                fontWeight="medium"
                fontSize="sm"
                _selected={{
                  borderInlineStart: 'none',
                  borderInlineEnd: 'inherit',
                  color: 'text.primary',
                  borderColor: 'background.blue'
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
