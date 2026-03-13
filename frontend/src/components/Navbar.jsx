import { Box, Container, Flex, HStack, Text, Button, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdLibraryMusic } from 'react-icons/md';
import { FiSettings, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { isAdmin, adminEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      position="sticky" top={0} zIndex={100}
      bg="rgba(10,10,15,0.85)"
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Container maxW="1200px" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link to="/">
            <HStack spacing={2}>
              <Box color="brand.400" fontSize="24px"><MdLibraryMusic /></Box>
              <Text
                fontFamily="Syne, sans-serif"
                fontWeight="800"
                fontSize="xl"
                letterSpacing="tight"
                bgGradient="linear(to-r, brand.400, purple.400)"
                bgClip="text"
              >
                BKM Music
              </Text>
            </HStack>
          </Link>

          <HStack spacing={3}>
            {isAdmin ? (
              <>
                <Link to="/admin">
                  <Button size="sm" variant="ghost" leftIcon={<FiSettings />} color="whiteAlpha.800">
                    Dashboard
                  </Button>
                </Link>
                <Menu>
                  <MenuButton>
                    <Avatar size="sm" name={adminEmail} bg="brand.500" />
                  </MenuButton>
                  <MenuList bg="gray.900" borderColor="whiteAlpha.200">
                    <MenuItem bg="gray.900" icon={<FiLogOut />} onClick={handleLogout} color="red.400">
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Link to="/admin/login">
                <Button size="sm" variant="outline" borderColor="whiteAlpha.300" color="whiteAlpha.700"
                  _hover={{ borderColor: 'brand.400', color: 'brand.400' }}>
                  Admin
                </Button>
              </Link>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;