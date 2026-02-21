import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Loader from './Loader';

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length) return <Loader />;

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
      <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} fontWeight={700} color="#000" mb="33px">
        Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name}</span> exercise videos
      </Typography>
      
      <Stack 
        sx={{ flexDirection: { lg: 'row' }, gap: { lg: '50px', xs: '30px' } }} 
        justifyContent="flex-start" 
        flexWrap="wrap" 
        alignItems="center"
      >
        {exerciseVideos?.slice(0, 3)?.map((item, index) => (
          <Box
            component="a" // Renders the Box as an <a> tag
            key={index}
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { lg: '360px', xs: '100%' }, // Consistent box width
              textDecoration: 'none', // Removes the default blue link underline
              borderRadius: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)', // Soft initial shadow
              overflow: 'hidden', // Ensures the image respects the rounded corners
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-10px)', // Lifts the box up when hovered
                boxShadow: '0 15px 30px rgba(0,0,0,0.15)', // Darkens shadow on hover
              }
            }}
          >
            <img 
              style={{ width: '100%', height: '202px', objectFit: 'cover' }} 
              src={item.video.thumbnails[0].url} 
              alt={item.video.title} 
            />
            
            {/* Text Container inside the Box */}
            <Box p="20px">
              <Typography 
                sx={{ 
                  fontSize: { lg: '20px', xs: '18px' }, 
                  lineHeight: 1.3, 
                  mb: '10px',
                  // Truncate text if the title is too long to keep boxes even
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }} 
                fontWeight={600} 
                color="#000"
              >
                {item.video.title}
              </Typography>
              <Typography fontSize="15px" color="#FF2625" fontWeight="bold">
                {item.video.channelName}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;