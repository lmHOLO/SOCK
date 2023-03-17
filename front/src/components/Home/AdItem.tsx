import React from 'react';
import { Paper } from '@mui/material';
import { Ad } from '@/components/types';
interface Props {
  ad: Ad;
}

export default function AdItem({ ad }: Props) {
  return (
    <Paper style={{ width: '100%', height: '28vh', margin: '8px 0px' }}>
      <img src={ad.image} alt={ad.title} />
    </Paper>
  );
}