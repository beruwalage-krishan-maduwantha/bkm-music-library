import {
  Box, Button, Container, Flex, FormControl, FormLabel, Heading,
  HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, VStack,
  Tag, Text, useDisclosure, useToast, Badge,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../../context/AuthContext';
import API_BASE from '../../config';

const GENRES = ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Ambient', 'Other'];
const EMPTY = { title: '', artist: 'BKM', genre: 'Other', audioUrl: '', coverUrl: '', duration: '' };

const AdminDashboard = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useAuth();
  const toast = useToast();

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/songs`);
      const data = await res.json();
      if (data.success) setSongs(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSongs(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditingId(null); onOpen(); };
  const openEdit = (song) => {
    setForm({ title: song.title, artist: song.artist, genre: song.genre, audioUrl: song.audioUrl, coverUrl: song.coverUrl || '', duration: song.duration || '' });
    setEditingId(song._id);
    onOpen();
  };

  const handleSave = async () => {
    if (!form.title || !form.audioUrl) {
      toast({ title: 'Title and Audio URL are required', status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    setSaving(true);
    try {
      const url = editingId ? `${API_BASE}/api/songs/${editingId}` : `${API_BASE}/api/songs`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        toast({ title: editingId ? 'Song updated!' : 'Song added!', status: 'success', duration: 2000, isClosable: true });
        fetchSongs();
        onClose();
      } else {
        toast({ title: data.message, status: 'error', duration: 3000, isClosable: true });
      }
    } catch {
      toast({ title: 'Server error', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this song?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/songs/${id}`, { method: 'DELETE', headers: authHeaders });
      const data = await res.json();
      if (data.success) {
        toast({ title: 'Song deleted', status: 'info', duration: 2000, isClosable: true });
        setSongs(prev => prev.filter(s => s._id !== id));
      }
    } catch {
      toast({ title: 'Server error', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const coverFallback = (title) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=ff2d87&color=fff&size=80`;

  return (
    <Box pb={12}>
      <Box bg="rgba(255,255,255,0.03)" borderBottom="1px solid" borderColor="whiteAlpha.100" py={6}>
        <Container maxW="1200px">
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={0}>
              <Heading fontFamily="Syne, sans-serif" fontSize="2xl">Admin Dashboard</Heading>
              <Text color="whiteAlpha.500" fontSize="sm">{songs.length} songs in library</Text>
            </VStack>
            <Button
              leftIcon={<AddIcon />}
              bgGradient="linear(to-r, brand.500, purple.500)"
              color="white"
              _hover={{ bgGradient: 'linear(to-r, brand.400, purple.400)', transform: 'translateY(-1px)' }}
              borderRadius="xl"
              fontWeight="700"
              onClick={openAdd}
            >
              Add Song
            </Button>
          </Flex>
        </Container>
      </Box>

      <Container maxW="1200px" py={8}>
        {loading ? (
          <Text color="whiteAlpha.500">Loading...</Text>
        ) : songs.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="5xl" mb={4}>🎵</Text>
            <Text color="whiteAlpha.500" mb={4}>No songs yet. Add your first track!</Text>
            <Button onClick={openAdd} colorScheme="pink" variant="outline">Add Song</Button>
          </Box>
        ) : (
          <VStack spacing={3} align="stretch">
            {songs.map((song, i) => (
              <Flex
                key={song._id}
                bg="rgba(255,255,255,0.04)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                borderRadius="xl"
                p={4}
                align="center"
                gap={4}
                _hover={{ borderColor: 'whiteAlpha.200', bg: 'rgba(255,255,255,0.06)' }}
                transition="all 0.2s"
              >
                <Text color="whiteAlpha.300" fontSize="sm" w={6} textAlign="center">{i + 1}</Text>
                <Image
                  src={song.coverUrl || coverFallback(song.title)}
                  fallbackSrc={coverFallback(song.title)}
                  boxSize="48px" borderRadius="md" objectFit="cover" flexShrink={0}
                />
                <Box flex={1} minW={0}>
                  <Text fontFamily="Syne, sans-serif" fontWeight="700" noOfLines={1}>{song.title}</Text>
                  <Text fontSize="sm" color="whiteAlpha.500">{song.artist}</Text>
                </Box>
                <Tag size="sm" colorScheme="pink" display={{ base: 'none', md: 'flex' }}>{song.genre}</Tag>
                <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
                  <Badge colorScheme="pink" variant="subtle">♥ {song.likes}</Badge>
                </HStack>
                <HStack spacing={2}>
                  <IconButton icon={<EditIcon />} size="sm" variant="ghost"
                    color="whiteAlpha.600" _hover={{ color: 'brand.400' }}
                    onClick={() => openEdit(song)} aria-label="Edit" />
                  <IconButton icon={<DeleteIcon />} size="sm" variant="ghost"
                    color="whiteAlpha.600" _hover={{ color: 'red.400' }}
                    onClick={() => handleDelete(song._id)} aria-label="Delete" />
                </HStack>
              </Flex>
            ))}
          </VStack>
        )}
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
        <ModalContent bg="gray.900" border="1px solid" borderColor="whiteAlpha.200" borderRadius="2xl">
          <ModalHeader fontFamily="Syne, sans-serif">
            {editingId ? 'Edit Song' : 'Add New Song'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Song Title</FormLabel>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Midnight Drive" bg="whiteAlpha.100" borderColor="whiteAlpha.200"
                  _focus={{ borderColor: 'brand.500' }} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Artist</FormLabel>
                <Input value={form.artist} onChange={e => setForm({ ...form, artist: e.target.value })}
                  placeholder="BKM" bg="whiteAlpha.100" borderColor="whiteAlpha.200"
                  _focus={{ borderColor: 'brand.500' }} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Genre</FormLabel>
                <Select value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })}
                  bg="whiteAlpha.100" borderColor="whiteAlpha.200" _focus={{ borderColor: 'brand.500' }}>
                  {GENRES.map(g => <option key={g} value={g} style={{ background: '#1a1a2e' }}>{g}</option>)}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Audio URL</FormLabel>
                <Input value={form.audioUrl} onChange={e => setForm({ ...form, audioUrl: e.target.value })}
                  placeholder="https://storage.googleapis.com/... (.m4a or .mp3)"
                  bg="whiteAlpha.100" borderColor="whiteAlpha.200" _focus={{ borderColor: 'brand.500' }} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Cover Image URL <Text as="span" color="whiteAlpha.400">(optional)</Text></FormLabel>
                <Input value={form.coverUrl} onChange={e => setForm({ ...form, coverUrl: e.target.value })}
                  placeholder="https://... (image URL)"
                  bg="whiteAlpha.100" borderColor="whiteAlpha.200" _focus={{ borderColor: 'brand.500' }} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" color="whiteAlpha.700">Duration <Text as="span" color="whiteAlpha.400">(optional)</Text></FormLabel>
                <Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
                  placeholder="e.g. 3:45"
                  bg="whiteAlpha.100" borderColor="whiteAlpha.200" _focus={{ borderColor: 'brand.500' }} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={onClose} color="whiteAlpha.600">Cancel</Button>
            <Button
              bgGradient="linear(to-r, brand.500, purple.500)"
              color="white"
              _hover={{ bgGradient: 'linear(to-r, brand.400, purple.400)' }}
              onClick={handleSave}
              isLoading={saving}
              loadingText="Saving..."
              borderRadius="xl"
            >
              {editingId ? 'Save Changes' : 'Add Song'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;