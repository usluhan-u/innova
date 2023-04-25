import {
  Flex,
  Accordion as ChakraAccordion,
  AccordionItem as ChakraAccordionItem,
  AccordionButton as ChakraAccordionButton,
  AccordionPanel as ChakraAccordionPanel,
  Box,
  Icon
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { AccordionType } from '../blocks';

interface AccordionProps extends AccordionType {}

export const Accordion = ({ items }: AccordionProps) => (
  <ChakraAccordion w="full" allowToggle>
    <Flex boxSize="full" flexDir="column" gap={4}>
      {items.map((item) => (
        <ChakraAccordionItem
          key={uuidv4()}
          border="none"
          borderRadius="lg"
          bgColor="background.primary"
          p={6}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <ChakraAccordionButton
                  _hover={{ bgColor: 'transparent' }}
                  gap={7}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    color="text.primary"
                    fontWeight="medium"
                    fontSize="xl"
                  >
                    {item.title}
                  </Box>
                  {isExpanded ? (
                    <Icon as={FiMinusCircle} boxSize={6} />
                  ) : (
                    <Icon as={FiPlusCircle} boxSize={6} />
                  )}
                </ChakraAccordionButton>
              </h2>
              <ChakraAccordionPanel
                pb={4}
                color="text.primary"
                fontWeight="normal"
                fontSize="md"
              >
                {item.content}
              </ChakraAccordionPanel>
            </>
          )}
        </ChakraAccordionItem>
      ))}
    </Flex>
  </ChakraAccordion>
);
