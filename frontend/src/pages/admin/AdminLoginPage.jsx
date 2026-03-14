import {
  Box, Button, Container, FormControl, FormLabel, Heading,
  Input, Text, useToast, VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdLock } from 'react-icons/md';
import API_BASE from '../../config';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({ title: 'Please fill all fields', status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        login(data.token, data.email);
        toast({ title: 'Welcome back!', status: 'success', duration: 2000, isClosable: true });
        navigate('/admin');
      } else {
        toast({ title: data.message, status: 'error', duration: 3000, isClosable: true });
      }
    } catch {
      toast({ title: 'Server error', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="420px" py={20}>
      <Box
        bg="rgba(255,255,255,0.04)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="2xl"
        p={8}
      >
        <VStack spacing={6}>
          <Box bgGradient="linear(to-r, brand.500, purple.500)"
            borderRadius="full" p={4} fontSize="2xl" color="white">
            <MdLock />
          </Box>
          <VStack spacing={1} textAlign="center">
            <Heading fontFamily="Syne, sans-serif" fontSize="2xl">Admin Login</Heading>
            <Text color="whiteAlpha.500" fontSize="sm">BKM Music Library</Text>
          </VStack>

          <VStack spacing={4} w="full">
            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.700">Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@bkmmusic.com"
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
                _hover={{ borderColor: 'brand.400' }}
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #ff2d87' }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.700">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
                _hover={{ borderColor: 'brand.400' }}
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #ff2d87' }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </FormControl>
            <Button
              w="full"
              bgGradient="linear(to-r, brand.500, purple.500)"
              color="white"
              _hover={{ bgGradient: 'linear(to-r, brand.400, purple.400)', transform: 'translateY(-1px)' }}
              onClick={handleLogin}
              isLoading={loading}
              loadingText="Logging in..."
              borderRadius="xl"
              fontWeight="700"
            >
              Login
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default AdminLoginPage;