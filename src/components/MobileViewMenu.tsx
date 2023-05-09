import {
  Button,
  useDisclosure,
  List,
  ListItem,
  SlideFade
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { RxCaretRight } from 'react-icons/rx';
import { MenuType } from '../globals';

export interface MobileViewMenuProps {
  menu: MenuType;
}

// interface NavMenuProps {
//   menuItem: MenuItemType;
// }

// const NavMenu = ({ menuItem }: NavMenuProps) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <ChakraMenu isOpen={isOpen}>
//       <>
//         {menuItem.type === 'multiple' && (
//           <>
//             <ChakraMenuButton
//               as={Button}
//               rightIcon={<FiChevronDown />}
//               bgColor="transparent"
//               color="text.primary"
//               fontWeight="normal"
//               border="none"
//               onMouseEnter={onOpen}
//               _hover={{ bgColor: 'transparent', color: 'text.blue' }}
//               _active={{ bgColor: 'transparent' }}
//             >
//               {menuItem.label}
//             </ChakraMenuButton>
//             <ChakraMenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
//               <Flex flexDir="column" m={6}>
//                 <Flex justify="space-between" gap={8}>
//                   {menuItem.menuItemGroups?.map((menuItemGroup) => (
//                     <ChakraMenuGroup
//                       key={uuidv4()}
//                       title={menuItemGroup.label}
//                       color="text.secondary.100"
//                       fontWeight="medium"
//                     >
//                       {menuItemGroup.subMenuItems?.map((subMenuItem) => (
//                         <ChakraMenuItem
//                           key={uuidv4()}
//                           color="text.primary"
//                           fontWeight="normal"
//                           _hover={{ bgColor: 'transparent' }}
//                           _active={{ bgColor: 'transparent' }}
//                         >
//                           <CallToAction
//                             type={subMenuItem.callToAction.type}
//                             page={subMenuItem.callToAction.page}
//                             url={subMenuItem.callToAction.url}
//                           >
//                             {subMenuItem.callToAction.label}
//                           </CallToAction>
//                         </ChakraMenuItem>
//                       ))}
//                     </ChakraMenuGroup>
//                   ))}
//                 </Flex>
//                 {menuItem.callToAction &&
//                   Object.keys(menuItem.callToAction).length > 0 && (
//                     <Flex flexDir="column" mt={4}>
//                       <Divider borderBottomColor="black" mb={4} />
//                       <TextIconCallToAction
//                         label={menuItem.callToAction.label}
//                         type={menuItem.callToAction.type}
//                         page={menuItem.callToAction.page}
//                         url={menuItem.callToAction.url}
//                         icon={FiArrowRight}
//                         color="text.blue"
//                       />
//                     </Flex>
//                   )}
//               </Flex>
//             </ChakraMenuList>
//           </>
//         )}

//         {menuItem.type === 'single' && (
//           <CallToAction {...menuItem.menuItem.callToAction}>
//             {menuItem.label}
//           </CallToAction>
//         )}
//       </>
//     </ChakraMenu>
//   );
// };

export const MobileViewMenu = ({ menu }: MobileViewMenuProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <List spacing={3} w="full">
        {menu.menuItems?.map((menuItem) => (
          <ListItem key={uuidv4()}>
            <Button
              rightIcon={<RxCaretRight />}
              w="full"
              variant="variant"
              fontWeight="normal"
              justifyContent="space-between"
              pos="relative"
              zIndex={2}
              px={0}
              onClick={onToggle}
            >
              {menuItem.label}
            </Button>
            {/* <NavMenu menuItem={menuItem} /> */}
          </ListItem>
        ))}
      </List>
      <SlideFade in={isOpen}>SlideFade</SlideFade>
    </>
  );
};
