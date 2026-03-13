import {
  Box, Flex, HStack, IconButton, Image, Slider, SliderTrack,
  SliderFilledTrack, SliderThumb, Text, VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { MdSkipNext, MdSkipPrevious, MdPlayArrow, MdPause, MdClose, MdVolumeUp, MdVolumeMute } from 'react-icons/md';

const MusicPlayer = ({ song, onNext, onPrev, onClose }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [song]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume / 100;
    }
  }, [volume, muted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (val) => {
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setProgress(val);
    }
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const coverFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(song.title)}&background=ff2d87&color=fff&size=80`;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
        onLoadedMetadata={handleTimeUpdate}
      />
      <Box
        position="fixed" bottom={0} left={0} right={0} zIndex={200}
        bg="rgba(10,10,15,0.97)"
        backdropFilter="blur(30px)"
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
        px={{ base: 3, md: 8 }}
        py={3}
      >
        {/* Progress bar */}
        <Slider value={progress} min={0} max={duration || 1} onChange={handleSeek} mb={2} size="sm">
          <SliderTrack bg="whiteAlpha.200" h="3px">
            <SliderFilledTrack bgGradient="linear(to-r, brand.500, purple.400)" />
          </SliderTrack>
          <SliderThumb boxSize={3} bg="brand.400" />
        </Slider>

        <Flex alignItems="center" justifyContent="space-between">
          {/* Song info */}
          <HStack spacing={3} flex={1} minW={0}>
            <Image
              src={song.coverUrl || coverFallback}
              fallbackSrc={coverFallback}
              boxSize="44px"
              borderRadius="md"
              objectFit="cover"
              flexShrink={0}
            />
            <VStack align="start" spacing={0} minW={0}>
              <Text fontWeight="600" fontSize="sm" noOfLines={1} fontFamily="Syne, sans-serif">
                {song.title}
              </Text>
              <Text fontSize="xs" color="whiteAlpha.500" noOfLines={1}>{song.artist}</Text>
            </VStack>
          </HStack>

          {/* Controls */}
          <HStack spacing={2} flex={1} justify="center">
            <IconButton icon={<MdSkipPrevious size={22} />} variant="ghost" onClick={onPrev}
              color="whiteAlpha.700" _hover={{ color: 'brand.400' }} aria-label="Prev" size="sm" />
            <IconButton
              icon={isPlaying ? <MdPause size={26} /> : <MdPlayArrow size={26} />}
              onClick={togglePlay}
              borderRadius="full"
              bgGradient="linear(to-r, brand.500, purple.500)"
              color="white"
              _hover={{ transform: 'scale(1.08)' }}
              aria-label="Play/Pause"
              size="md"
            />
            <IconButton icon={<MdSkipNext size={22} />} variant="ghost" onClick={onNext}
              color="whiteAlpha.700" _hover={{ color: 'brand.400' }} aria-label="Next" size="sm" />
          </HStack>

          {/* Volume + time + close */}
          <HStack spacing={3} flex={1} justify="flex-end">
            <Text fontSize="xs" color="whiteAlpha.500" display={{ base: 'none', md: 'block' }}>
              {formatTime(progress)} / {formatTime(duration)}
            </Text>
            <IconButton icon={muted ? <MdVolumeMute /> : <MdVolumeUp />} variant="ghost"
              size="sm" color="whiteAlpha.600" onClick={() => setMuted(!muted)} aria-label="Mute"
              display={{ base: 'none', md: 'flex' }} />
            <Slider value={volume} min={0} max={100} onChange={setVolume} w="80px"
              display={{ base: 'none', md: 'flex' }}>
              <SliderTrack bg="whiteAlpha.200"><SliderFilledTrack bg="brand.400" /></SliderTrack>
              <SliderThumb boxSize={2} bg="white" />
            </Slider>
            <IconButton icon={<MdClose />} variant="ghost" size="sm"
              color="whiteAlpha.400" _hover={{ color: 'red.400' }} onClick={onClose} aria-label="Close" />
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default MusicPlayer;