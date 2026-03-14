import {
  Box, Flex, HStack, IconButton, Image, Tag, Text, VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdFavorite, MdFavoriteBorder, MdPlayArrow, MdPause } from 'react-icons/md';
import API_BASE from '../config';

const genreColors = {
  Pop: 'pink', Rock: 'red', 'Hip-Hop': 'orange', Electronic: 'cyan',
  Jazz: 'yellow', Classical: 'purple', 'R&B': 'teal', Ambient: 'blue', Other: 'gray',
};

const SongCard = ({ song, onPlay, isPlaying, sessionId }) => {
  const [likes, setLikes] = useState(song.likes || 0);
  const [liked, setLiked] = useState(song.likedBy?.includes(sessionId) || false);

  const coverFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(song.title)}&background=ff2d87&color=fff&size=200`;

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`${API_BASE}/api/songs/${song._id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
        setLiked(data.liked);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      bg="rgba(255,255,255,0.04)"
      border="1px solid"
      borderColor={isPlaying ? 'brand.500' : 'whiteAlpha.100'}
      borderRadius="2xl"
      overflow="hidden"
      cursor="pointer"
      onClick={() => onPlay(song)}
      transition="all 0.25s"
      _hover={{ transform: 'translateY(-4px)', borderColor: 'brand.400', bg: 'rgba(255,45,135,0.06)' }}
      role="group"
      position="relative"
    >
      {/* Cover */}
      <Box position="relative" overflow="hidden">
        <Image
          src={song.coverUrl || coverFallback}
          fallbackSrc={coverFallback}
          w="full" h="180px" objectFit="cover"
          transition="transform 0.4s"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
        {/* Play overlay */}
        <Flex
          position="absolute" inset={0}
          bg="blackAlpha.500"
          alignItems="center" justifyContent="center"
          opacity={isPlaying ? 1 : 0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.2s"
        >
          <Box
            bgGradient="linear(to-r, brand.500, purple.500)"
            borderRadius="full" p={3}
            boxShadow="0 0 30px rgba(255,45,135,0.5)"
          >
            {isPlaying ? <MdPause size={28} color="white" /> : <MdPlayArrow size={28} color="white" />}
          </Box>
        </Flex>

        {/* Genre tag */}
        <Tag
          position="absolute" top={2} left={2}
          size="sm" colorScheme={genreColors[song.genre] || 'gray'}
          fontSize="xs" fontWeight="600"
        >
          {song.genre}
        </Tag>
      </Box>

      {/* Info */}
      <Box p={4}>
        <VStack align="start" spacing={1} mb={3}>
          <Text fontFamily="Syne, sans-serif" fontWeight="700" fontSize="md" noOfLines={1}>
            {song.title}
          </Text>
          <Text fontSize="sm" color="whiteAlpha.600" noOfLines={1}>{song.artist}</Text>
        </VStack>

        <HStack justify="space-between" alignItems="center">
          {isPlaying && (
            <HStack spacing={1}>
              {[0, 1, 2].map(i => (
                <Box key={i} w="3px" bg="brand.400" borderRadius="full"
                  style={{
                    height: `${12 + i * 6}px`,
                    animation: `bounce${i} 0.8s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
              <style>{`
                @keyframes bounce0 { from { height: 8px } to { height: 18px } }
                @keyframes bounce1 { from { height: 14px } to { height: 8px } }
                @keyframes bounce2 { from { height: 10px } to { height: 20px } }
              `}</style>
            </HStack>
          )}
          <Box flex={1} />
          <HStack spacing={1}>
            <IconButton
              icon={liked ? <MdFavorite color="#ff2d87" /> : <MdFavoriteBorder />}
              variant="ghost" size="sm" onClick={handleLike}
              color={liked ? 'brand.400' : 'whiteAlpha.500'}
              _hover={{ color: 'brand.400' }} aria-label="Like"
            />
            <Text fontSize="xs" color="whiteAlpha.500">{likes}</Text>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default SongCard;