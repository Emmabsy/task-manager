import { Box,Flex,Avatar,Button,Menu,MenuButton,useDisclosure, useColorModeValue,Stack,useColorMode, WrapItem} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>

        <Box bg={useColorModeValue('blue.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
             <WrapItem>
             <Avatar   boxSize='1.5em' name='Oshigaki Kisame' src='https://bit.ly/broken-link' />
            </WrapItem>

          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <Button
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  
                </Button>
                
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>










    </div>
  )
}

export default Navbar