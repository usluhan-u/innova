import React from 'react';
import {
  Flex,
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuGroup as ChakraMenuGroup,
  MenuItem as ChakraMenuItem,
  Button,
  Divider,
  AccordionItem,
  Accordion,
  AccordionButton,
  AccordionPanel
} from '@chakra-ui/react';
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
              color="text.primary"
              fontWeight="normal"
              fontSize="sm"
              border="none"
              _hover={{ bgColor: 'transparent', color: 'text.blue' }}
              _active={{ bgColor: 'transparent' }}
            >
              {menuItem.label}
            </ChakraMenuButton>
            <ChakraMenuList>
              <Flex flexDir="column" m={6}>
                <Flex justify="space-between" gap={8}>
                  {menuItem.menuItemGroups?.map((menuItemGroup) => (
                    <ChakraMenuGroup
                      key={menuItemGroup.label}
                      title={menuItemGroup.label}
                      color="text.secondary.100"
                      fontWeight="medium"
                      fontSize="sm"
                    >
                      {menuItemGroup.subMenuItems?.map((subMenuItem) =>
                        subMenuItem.type === 'dropdown' ? (
                          <Accordion
                            key={subMenuItem.label}
                            borderColor="transparent"
                            allowToggle
                          >
                            <AccordionItem>
                              <AccordionButton
                                as={Button}
                                rightIcon={<FiChevronDown />}
                                color="text.primary"
                                fontWeight="normal"
                                fontSize="sm"
                                bgColor="transparent"
                                paddingInlineStart={3}
                                paddingInlineEnd={3}
                                _hover={{ bgColor: 'transparent' }}
                                _active={{ bgColor: 'transparent' }}
                              >
                                {subMenuItem.label}
                              </AccordionButton>
                              <AccordionPanel paddingTop={0} paddingBottom={0}>
                                <Flex flexDir="column">
                                  {subMenuItem.dropdownMenuItems?.map(
                                    (dropdownMenuItem) => (
                                      <ChakraMenuItem
                                        key={
                                          dropdownMenuItem.callToAction.label
                                        }
                                        color="text.primary"
                                        fontWeight="normal"
                                        fontSize="sm"
                                        bgColor="transparent"
                                        _hover={{ bgColor: 'transparent' }}
                                        _active={{ bgColor: 'transparent' }}
                                      >
                                        <CallToAction
                                          type={
                                            dropdownMenuItem.callToAction.type
                                          }
                                          page={
                                            dropdownMenuItem.callToAction.page
                                          }
                                          url={
                                            dropdownMenuItem.callToAction.url
                                          }
                                        >
                                          {dropdownMenuItem.callToAction.label}
                                        </CallToAction>
                                      </ChakraMenuItem>
                                    )
                                  )}
                                </Flex>
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        ) : (
                          <ChakraMenuItem
                            key={subMenuItem.callToAction.label}
                            color="text.primary"
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
                                  ? '2px solid #005a9b'
                                  : 'none'
                              }
                            >
                              {subMenuItem.callToAction.label}
                            </CallToAction>
                          </ChakraMenuItem>
                        )
                      )}
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
            fontWeight="normal"
            _hover={{ bgColor: 'transparent', color: 'text.blue' }}
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
      <NavMenu key={menuItem.label} menuItem={menuItem} />
    ))}
  </Flex>
);
