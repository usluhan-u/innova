import React from 'react';
import {
  Button,
  Center,
  Divider,
  List,
  ListItem,
  Text,
  VStack
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { RxCaretRight } from 'react-icons/rx';
import { useRouter } from 'next/router';
import { FiArrowRight } from 'react-icons/fi';
import { MenuType } from '../globals';
import { MobileViewSearchBox } from './MobileViewSearchBox';
import { CallToActionType } from '../fields';

export interface MobileViewMenuProps {
  menu: MenuType;
  onClose: () => void;
}

interface CurrentListItem {
  label: string;
  callToAction?: CallToActionType;
  finalMenuCallToAction?: CallToActionType;
  subList?: CurrentListItem[];
}

interface CurrentList {
  title?: string;
  callToAction?: CallToActionType;
  items: CurrentListItem[];
}

interface MenuList {
  title?: string;
  label: string;
  callToAction?: CallToActionType;
  finalMenuCallToAction?: CallToActionType;
  subList?: MenuList[];
}

export const MobileViewMenu = ({ menu, onClose }: MobileViewMenuProps) => {
  const router = useRouter();

  const list: MenuList[] =
    menu?.menuItems?.map((menuItem) => ({
      label: menuItem.label,
      callToAction: menuItem.callToAction,
      subList: menuItem.menuItemGroups?.map((menuItemGroup) => ({
        title: menuItem.label,
        label: menuItemGroup.label,
        subList: menuItemGroup.subMenuItems?.map((subMenuItem) => ({
          title: menuItemGroup.label,
          label: subMenuItem.callToAction.label,
          finalMenuCallToAction: subMenuItem.callToAction
        }))
      }))
    })) ?? [];

  const [currentList, setCurrentList] = React.useState<CurrentList>(() => {
    const items = list.map((item) => ({
      label: item.label,
      subList: item.subList,
      callToAction: item.callToAction
    }));

    return {
      items
    };
  });

  const handleRouterPush = (callToAction: CallToActionType) => {
    onClose();
    router.push(
      callToAction.page?.slug || callToAction.url || router.asPath,
      callToAction.page?.slug || callToAction.url || router.asPath
    );
  };

  const handleOnClick =
    (listItem: CurrentListItem) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (listItem.subList) {
        setCurrentList({
          title: listItem.label,
          items: listItem.subList,
          callToAction: listItem.callToAction
        });
      } else if (listItem.finalMenuCallToAction) {
        handleRouterPush(listItem.finalMenuCallToAction);
      }
    };

  return (
    <VStack boxSize="full">
      <Center w="full" h="10">
        {currentList?.title ? (
          <Text color="text.secondary.100" fontSize="sm">
            {currentList.title}
          </Text>
        ) : (
          <MobileViewSearchBox />
        )}
      </Center>
      <List spacing={2} w="full">
        {currentList?.items.map((item) => (
          <ListItem key={uuidv4()}>
            <Button
              rightIcon={item.subList ? <RxCaretRight /> : undefined}
              w="full"
              variant="variant"
              fontWeight="normal"
              justifyContent="space-between"
              pos="relative"
              zIndex={2}
              px={0}
              fontSize="sm"
              onClick={handleOnClick(item)}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
      {currentList.callToAction &&
        Object.keys(currentList.callToAction).length > 0 && (
          <VStack mt={4} w="full" align="flex-start">
            <Divider borderBottomColor="black" mb={2} />
            <Button
              rightIcon={<FiArrowRight />}
              variant="link"
              color="text.blue"
              fontSize="sm"
              fontWeight="medium"
              mt={0}
              textDecoration="none"
              _focus={{ bgColor: 'transparent', textDecor: 'none' }}
              _active={{ bgColor: 'transparent', textDecor: 'none' }}
              onClick={() =>
                handleRouterPush(currentList.callToAction as CallToActionType)
              }
            >
              {currentList.callToAction.label}
            </Button>
          </VStack>
        )}
    </VStack>
  );
};
