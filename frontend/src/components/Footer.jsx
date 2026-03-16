import { Box, Container, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdLibraryMusic } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      bg="rgba(10,10,15,0.98)"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      py={10}
      mt={8}
    >
      <Container maxW="1200px" px={4}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
          gap={8}
          mb={8}
        >
          {/* Column 1 — Logo & Description */}
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3} flex={1}>
            <HStack spacing={2}>
              <Box color="pink.400" fontSize="22px"><MdLibraryMusic /></Box>
              <Text
                fontFamily="Syne, sans-serif"
                fontWeight="800"
                fontSize="lg"
                bgGradient="linear(to-r, pink.400, purple.400)"
                bgClip="text"
              >
                BKM Music
              </Text>
            </HStack>
            <Text fontSize="sm" color="whiteAlpha.500" maxW="220px" textAlign={{ base: 'center', md: 'left' }}>
              AI-generated music curated for every mood. Hit play and explore.
            </Text>
          </VStack>

          {/* Column 2 — Quick Links */}
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3} flex={1}>
            <Text
              fontFamily="Syne, sans-serif"
              fontWeight="700"
              fontSize="sm"
              color="whiteAlpha.800"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Quick Links
            </Text>
            <Link to="/">
              <Text fontSize="sm" color="whiteAlpha.500" _hover={{ color: 'pink.400' }} transition="color 0.2s">
                Home
              </Text>
            </Link>
            <Link to="/admin/login">
              <Text fontSize="sm" color="whiteAlpha.500" _hover={{ color: 'pink.400' }} transition="color 0.2s">
                Admin
              </Text>
            </Link>
          </VStack>

          {/* Column 3 — Connect */}
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3} flex={1}>
            <Text
              fontFamily="Syne, sans-serif"
              fontWeight="700"
              fontSize="sm"
              color="whiteAlpha.800"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Connect
            </Text>
            <HStack spacing={4}>
              <a href="https://github.com/beruwalage-krishan-maduwantha" target="_blank" rel="noreferrer">
                <Box
                  color="whiteAlpha.500"
                  _hover={{ color: 'pink.400' }}
                  transition="color 0.2s"
                  fontSize="20px"
                >
                  <FaGithub />
                </Box>
              </a>
              <a href="https://www.linkedin.com/in/krishan-maduwantha-a6181b302/" target="_blank" rel="noreferrer">
                <Box
                  color="whiteAlpha.500"
                  _hover={{ color: 'pink.400' }}
                  transition="color 0.2s"
                  fontSize="20px"
                >
                  <FaLinkedin />
                </Box>
              </a>
            </HStack>
            <Text fontSize="sm" color="whiteAlpha.500">
              Krishan Maduwantha
            </Text>
          </VStack>
        </Flex>

        {/* Bottom copyright bar */}
        <Box
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
          pt={6}
          textAlign="center"
        >
          <Text fontSize="sm" color="whiteAlpha.400">
            © {year} BKM Music Library. Made with{' '}
            <Box as="span" color="pink.400" display="inline"><FaHeart style={{ display: 'inline', marginBottom: '2px' }} /></Box>
            {' '}by Krishan Maduwantha. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;