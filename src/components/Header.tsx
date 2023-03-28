import { GenericLink } from './GenericLink';
import { Logo } from '../icons';
import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
  VStack,
  Text
} from '@chakra-ui/react';
import { MenuType } from '../collections';
import { ArrowForwardIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { menuData } from '../data';

export interface HeaderProps {
  menus: MenuType[];
}

export const Header = ({ menus }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  menus = menuData;

  return (
    <Container
      maxW="90%"
      h="70px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack alignItems="center" justifyContent="space-between" w="100%">
        <HStack alignItems="center" spacing={32}>
          <GenericLink href="/">
            <Logo />
          </GenericLink>
          <HStack alignItems="center" spacing={16}>
            <Menu isOpen={isOpen}>
              {menus.map((menu) => {
                return menu.menu.type === 'dropdown' ? (
                  <React.Fragment key={uuidv4()}>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      onMouseEnter={onOpen}
                      backgroundColor="transparent"
                      color="text.primary"
                      fontWeight={400}
                      _hover={{
                        backgroundColor: 'transparent',
                        color: 'text.blue'
                      }}
                      _active={{
                        backgroundColor: 'transparent'
                      }}
                    >
                      {menu.title}
                    </MenuButton>
                    <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                      <HStack spacing={8} alignItems="normal" padding="20px">
                        {menu.menu.subMenus?.map((subMenu) => (
                          <MenuGroup
                            key={uuidv4()}
                            title={subMenu.label}
                            color="text.secondary"
                            fontWeight={500}
                          >
                            {subMenu.subMenuItems.map((subMenuItem) => (
                              <MenuItem
                                key={uuidv4()}
                                as="a"
                                href={subMenuItem.link}
                                color="text.primary"
                                fontWeight={400}
                                _hover={{ backgroundColor: 'transparent' }}
                              >
                                {subMenuItem.label}
                              </MenuItem>
                            ))}
                          </MenuGroup>
                        ))}
                      </HStack>
                      <VStack alignItems="normal" p={8}>
                        <Divider borderBottomColor="black" />
                        <GenericLink href="/">
                          <Text color="text.blue">
                            Tüm Ürünleri İnceleyin <ArrowForwardIcon />
                          </Text>
                        </GenericLink>
                      </VStack>
                    </MenuList>
                  </React.Fragment>
                ) : (
                  <GenericLink key={uuidv4()} href={menu.menu.link || ''}>
                    {menu.title}
                  </GenericLink>
                );
              })}
            </Menu>
          </HStack>
        </HStack>
        <Box>Search/Language</Box>
      </HStack>
    </Container>
  );
};
