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
import { ArrowForwardIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import {
  Menu as MenuType,
  Link as LinkType,
  Page as PageType
} from '../payload-types';

export interface HeaderProps {
  menus: MenuType[];
}

export const Header = ({ menus }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  menus = [];

  const detectMenuLink = (link?: string | LinkType) => {
    if (!link) {
      return '/';
    }

    if (typeof link === 'string') {
      return link;
    }

    return link.type === 'page' ? (link.page as PageType).slug : link.url;
  };

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
                return menu.group?.type === 'dropdown' ? (
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
                      {menu.label}
                    </MenuButton>
                    <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                      <HStack spacing={8} alignItems="normal" padding="20px">
                        {menu.group.menuGroups?.map((menuGroup) => (
                          <MenuGroup
                            key={uuidv4()}
                            title={menuGroup.label}
                            color="text.secondary"
                            fontWeight={500}
                          >
                            {menuGroup.subMenus?.map((subMenu) => (
                              <MenuItem
                                key={uuidv4()}
                                as="a"
                                href={detectMenuLink(subMenu.link)}
                                color="text.primary"
                                fontWeight={400}
                                _hover={{ backgroundColor: 'transparent' }}
                              >
                                {subMenu.label}
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
                  <GenericLink
                    key={uuidv4()}
                    href={detectMenuLink(menu.group?.link)}
                  >
                    {menu.label}
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
