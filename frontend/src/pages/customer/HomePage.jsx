import {
  Box, Button, Center, Container, Heading, HStack, Input,
  InputGroup, InputLeftElement, SimpleGrid, Spinner, Text, VStack, Wrap, WrapItem,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import SongCard from '../../components/SongCard';
import API_BASE from '../../config';

const GENRES = ['All', 'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Ambient', 'Other'];

// Stable session ID per browser tab
const SESSION_ID = Math.random().toString(36).slice(2);

const HomePage = ({ playSong, currentSong }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (genre !== 'All') params.append('genre', genre);
      if (search) params.append('search', search);
      const res = await fetch(`${API_BASE}/api/songs?${params}`);
      const data = await res.json();
      if (data.success) setSongs(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSongs(); }, [genre]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => fetchSongs(), 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Box pb="120px">
      {/* Hero */}
      <Box
        bgGradient="linear(to-br, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)"
        py={{ base: 12, md: 20 }}
        position="relative"
        overflow="hidden"
      >
        {/* Glow effect */}
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)"
          w="600px" h="300px" bg="brand.500" opacity={0.08} borderRadius="full" filter="blur(80px)" />

        <Container maxW="1200px">
          <VStack spacing={6} textAlign="center">
            <Heading
              fontFamily="Syne, sans-serif"
              fontWeight="800"
              fontSize={{ base: '3xl', md: '5xl' }}
              lineHeight={1.1}
              bgGradient="linear(to-r, white, whiteAlpha.600)"
              bgClip="text"
            >
              BKM Music Library
            </Heading>
            <Text color="whiteAlpha.600" fontSize={{ base: 'md', md: 'lg' }} maxW="500px">
              AI-generated music curated for every mood. Hit play and explore.
            </Text>

            {/* Search */}
            <InputGroup maxW="480px" w="full">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="whiteAlpha.400" />
              </InputLeftElement>
              <Input
                placeholder="Search songs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
                _hover={{ borderColor: 'brand.400' }}
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #ff2d87' }}
                borderRadius="xl"
                color="white"
              />
            </InputGroup>
          </VStack>
        </Container>
      </Box>

      <Container maxW="1200px" py={8}>
        {/* Genre filters */}
        <Wrap spacing={2} mb={8} justify="center">
          {GENRES.map(g => (
            <WrapItem key={g}>
              <Button
                size="sm"
                borderRadius="full"
                variant={genre === g ? 'solid' : 'outline'}
                bgGradient={genre === g ? 'linear(to-r, brand.500, purple.500)' : undefined}
                borderColor="whiteAlpha.300"
                color={genre === g ? 'white' : 'whiteAlpha.700'}
                _hover={{ borderColor: 'brand.400', color: 'brand.300' }}
                onClick={() => setGenre(g)}
                fontWeight="600"
              >
                {g}
              </Button>
            </WrapItem>
          ))}
        </Wrap>

        {/* Songs grid */}
        {loading ? (
          <Center h="300px"><Spinner size="xl" color="brand.400" thickness="3px" /></Center>
        ) : songs.length === 0 ? (
          <Center h="300px">
            <VStack spacing={3}>
              <Text fontSize="4xl">🎵</Text>
              <Text color="whiteAlpha.500" fontSize="lg">No songs found</Text>
              {genre !== 'All' && (
                <Button size="sm" variant="ghost" color="brand.400" onClick={() => setGenre('All')}>
                  Clear filter
                </Button>
              )}
            </VStack>
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
            {songs.map(song => (
              <SongCard
                key={song._id}
                song={song}
                onPlay={s => playSong(s, songs)}
                isPlaying={currentSong?._id === song._id}
                sessionId={SESSION_ID}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;