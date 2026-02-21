import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, CircularProgress, Box } from '@mui/material';

// Import the fetch logic and headers here
import { fetchImage, exerciseOptions } from '../utils/fetchData';

const ExerciseCard = ({ exercise }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let objectUrl;

    const getExerciseImage = async () => {
      try {
        // Added https:// and removed the inline API key since exerciseOptions handles the headers securely
        const url = `https://exercisedb.p.rapidapi.com/image?exerciseId=${exercise.id}&resolution=180`;
        
        objectUrl = await fetchImage(url, exerciseOptions);
        setImageUrl(objectUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    getExerciseImage();

    // Cleanup to prevent memory leaks
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [exercise.id]);

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      
      {/* Show a loading spinner while the image is being fetched */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <img src={imageUrl} alt={exercise.name} loading="lazy" />
      )}

      <Stack direction="row">
        <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.bodyPart}
        </Button>
        <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
          {exercise.target}
        </Button>
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;