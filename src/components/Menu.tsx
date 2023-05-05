import {
  Flex,
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuGroup as ChakraMenuGroup,
  MenuItem as ChakraMenuItem,
  Button,
  Divider,
  useDisclosure
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { MenuItemType, MenuType } from '../globals';
import { CallToAction } from './CallToAction';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface MenuProps {
  menu: MenuType;
}

export const Menu = ({ menu }: MenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderMenuItem = (menuItem: MenuItemType) => {
    if (menuItem.type === 'multiple') {
      return (
        <>
          <ChakraMenuButton
            as={Button}
            rightIcon={<FiChevronDown />}
            bgColor="transparent"
            color="text.primary"
            fontWeight="normal"
            onMouseEnter={onOpen}
            _hover={{ bgColor: 'transparent', color: 'text.blue' }}
            _active={{ bgColor: 'transparent' }}
          >
            {menuItem.label}
          </ChakraMenuButton>
          <ChakraMenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            <Flex flexDir="column" m={6}>
              <Flex justify="space-between" gap={8}>
                {menuItem.menuItemGroups?.map((menuItemGroup) => (
                  <ChakraMenuGroup
                    key={uuidv4()}
                    title={menuItemGroup.label}
                    color="text.secondary.100"
                    fontWeight="medium"
                  >
                    {menuItemGroup.subMenuItems?.map((subMenuItem) => (
                      <ChakraMenuItem
                        key={uuidv4()}
                        color="text.primary"
                        fontWeight="normal"
                        _hover={{ bgColor: 'transparent' }}
                        _active={{ bgColor: 'transparent' }}
                      >
                        <CallToAction
                          type={subMenuItem.callToAction.type}
                          page={subMenuItem.callToAction.page}
                          url={subMenuItem.callToAction.url}
                        >
                          {subMenuItem.callToAction.label}
                        </CallToAction>
                      </ChakraMenuItem>
                    ))}
                  </ChakraMenuGroup>
                ))}
              </Flex>
              {menuItem.callToAction &&
                Object.keys(menuItem.callToAction).length > 0 && (
                  <Flex flexDir="column" mt={4}>
                    <Divider borderBottomColor="black" mb={4} />
                    <TextIconCallToAction
                      label={menuItem.callToAction.label}
                      type={menuItem.callToAction.type}
                      page={menuItem.callToAction.page}
                      url={menuItem.callToAction.url}
                      icon={FiArrowRight}
                      color="text.blue"
                    />
                  </Flex>
                )}
            </Flex>
          </ChakraMenuList>
        </>
      );
    }

    if (menuItem.type === 'single' && menuItem.menuItem) {
      return (
        <CallToAction {...menuItem.menuItem.callToAction}>
          {menuItem.label}
        </CallToAction>
      );
    }

    return null;
  };

  return (
    <Flex w="full" align="center" gap={8}>
      <ChakraMenu isOpen={isOpen}>
        {menu.menuItems?.map((menuItem) => (
          <React.Fragment key={uuidv4()}>
            {renderMenuItem(menuItem)}
          </React.Fragment>
        ))}
      </ChakraMenu>
    </Flex>
  );
};
