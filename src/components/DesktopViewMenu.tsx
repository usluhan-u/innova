import React from 'react';
import {
  Flex,
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuGroup as ChakraMenuGroup,
  MenuItem as ChakraMenuItem,
  Button,
  Divider
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { MenuItemType, MenuType } from '../globals';
import { CallToAction } from './CallToAction';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface DesktopViewMenuProps {
  menu: MenuType;
}

interface NavMenuProps {
  menuItem: MenuItemType;
}

const NavMenu = ({ menuItem }: NavMenuProps) => {
  const router = useRouter();

  return (
    <ChakraMenu>
      <>
        {menuItem.type === 'multiple' && (
          <>
            <ChakraMenuButton
              as={Button}
              rightIcon={<FiChevronDown />}
              bgColor="transparent"
              color="text.gray.200"
              fontWeight="bold"
              fontSize="sm"
              border="none"
              _hover={{ bgColor: 'transparent', color: 'text.primary' }}
              _active={{ bgColor: 'transparent' }}
            >
              {menuItem.label}
            </ChakraMenuButton>
            <ChakraMenuList>
              <Flex flexDir="column" m={6}>
                <Flex justify="space-between" gap={8}>
                  {menuItem.menuItemGroups?.map((menuItemGroup) => (
                    <ChakraMenuGroup
                      key={uuidv4()}
                      title={menuItemGroup.label}
                      color="text.gray.200"
                      fontWeight="bold"
                      fontSize="sm"
                    >
                      {menuItemGroup.subMenuItems?.map((subMenuItem) => (
                        <ChakraMenuItem
                          key={uuidv4()}
                          color="text.gray.300"
                          fontWeight="normal"
                          fontSize="sm"
                          bgColor="transparent"
                          _hover={{ bgColor: 'transparent' }}
                          _active={{ bgColor: 'transparent' }}
                        >
                          <CallToAction
                            type={subMenuItem.callToAction.type}
                            page={subMenuItem.callToAction.page}
                            url={subMenuItem.callToAction.url}
                            borderBottom={
                              subMenuItem.callToAction.page?.slug ===
                                router.asPath.substring(1) ||
                              subMenuItem.callToAction.url ===
                                router.asPath.substring(1)
                                ? '2px solid #000000'
                                : 'none'
                            }
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
                        color="text.dark"
                        fontSize="sm"
                        fontWeight="medium"
                      />
                    </Flex>
                  )}
              </Flex>
            </ChakraMenuList>
          </>
        )}

        {menuItem.type === 'single' && (
          <Button
            bgColor="transparent"
            color="text.gray.200"
            fontWeight="bold"
            _hover={{ bgColor: 'transparent', color: 'text.primary' }}
          >
            <CallToAction {...menuItem.menuItem.callToAction} fontSize="sm">
              {menuItem.label}
            </CallToAction>
          </Button>
        )}
      </>
    </ChakraMenu>
  );
};

export const DesktopViewMenu = ({ menu }: DesktopViewMenuProps) => (
  <Flex w="full" align="center">
    {menu.menuItems?.map((menuItem) => (
      <NavMenu key={uuidv4()} menuItem={menuItem} />
    ))}
  </Flex>
);
