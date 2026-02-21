import React, { useState, useEffect } from 'react';
import { Typography, Stack, Button } from '@mui/material';

// 1. Import your new fetchImage function
import { fetchImage, exerciseOptions } from '../utils/fetchData'; 

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({ exerciseDetail }) => {
  const [imageUrl, setImageUrl] = useState(''); 

  useEffect(() => {
    let currentImageUrl = ''; // Keep track of the URL so we can clean it up later

    const getExerciseImage = async () => {
      if (!exerciseDetail?.id) return; 

      const imageDbUrl = `https://exercisedb.p.rapidapi.com/image?exerciseId=${exerciseDetail.id}&resolution=180`;
      
      try {
        // 2. Use your exact function to get the Blob URL
        currentImageUrl = await fetchImage(imageDbUrl, exerciseOptions);
        setImageUrl(currentImageUrl); 
      } catch (error) {
        console.error("Failed to fetch image:", error);
      }
    };

    getExerciseImage();

    // 3. THE CLEANUP: Prevent memory leaks when the component unmounts
    return () => {
      if (currentImageUrl) {
        URL.revokeObjectURL(currentImageUrl);
      }
    };
  }, [exerciseDetail]);

  // SAFE EARLY RETURN: Don't destructure until the data exists!
  if (!exerciseDetail || Object.keys(exerciseDetail).length === 0) {
    return <div>Loading...</div>;
  }

  const { bodyPart, name, target, equipment } = exerciseDetail; 

  const extraDetail = [
    { icon: BodyPartImage, name: bodyPart },
    { icon: TargetImage, name: target },
    { icon: EquipmentImage, name: equipment },
  ];

  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      
      {/* 4. RENDER THE IMAGE */}
      <img 
        src={imageUrl || 'https://via.placeholder.com/400?text=Loading+Image...'} 
        alt={name} 
        loading="lazy" 
        className="detail-image" 
      />
      
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
          {name}
        </Typography>
        <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
          Exercises keep you strong.{' '}
          <span style={{ textTransform: 'capitalize' }}>{name}</span> is one
          of the best <br /> exercises to target your {target}. It will help you improve your{' '}
          <br /> mood and gain energy.
        </Typography>
        
        {extraDetail?.map((item, index) => (
          <Stack key={`${item.name}-${index}`} direction="row" gap="24px" alignItems="center">
            <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={item.name} style={{ width: '50px', height: '50px' }} />
            </Button>
            <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;