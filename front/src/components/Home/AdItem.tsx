import React from 'react';
import { Paper, Button } from '@mui/material';
import { AdType } from './Ads';
type AdProps = {
  ad: AdType;
};

export default function AdItem({ ad }: AdProps) {
  return (
    <Paper style={{ width: '100%', height: '28vh', margin: '8px 0px' }}>
      <img src={ad.image} alt={ad.title} />
    </Paper>
  );
}
