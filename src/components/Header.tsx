import { InternalLink } from './GenericLink';
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
import { Menu as MenuType, Page as PageType } from '../payload-types';

export interface HeaderProps {
  menuList: MenuType[];
}

export const Header = ({ menuList }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container
      maxW="90%"
      h="70px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack alignItems="center" justifyContent="space-between" w="full">
        <HStack alignItems="center" spacing={32}>
          <InternalLink href="/">
            <Logo />
          </InternalLink>
          <HStack alignItems="center" spacing={16}>
            <Menu isOpen={isOpen}>
              {menuList.map((menu) => {
                return menu.group?.type === 'multiple' ? (
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
                                href={(subMenu.page as PageType).slug}
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
                        <InternalLink href="/">
                          <Text color="text.blue">
                            Tüm Ürünleri İnceleyin <ArrowForwardIcon />
                          </Text>
                        </InternalLink>
                      </VStack>
                    </MenuList>
                  </React.Fragment>
                ) : (
                  <InternalLink
                    key={uuidv4()}
                    href={(menu.page as PageType).slug}
                  >
                    {menu.label}
                  </InternalLink>
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
