import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import AdItem from '@/components/Home/AdItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AdType } from '@/components/types';
export default function Ads() {
  // 나중에 api로 받기
  const [adList, setAdList] = useState<AdType[]>([
    {
      id: 1,
      image: 'https://i.postimg.cc/DypC9rTC/2019-10-01-155730.jpg',
      link: '/',
      title: '첫번째 광고',
    },
    {
      id: 2,
      image: 'https://i.postimg.cc/mD4VYVYr/2020-10-28-134358.jpg',
      link: '/',
      title: '두번째 광고',
    },
  ]);
  return (
    <Carousel NextIcon={<ChevronRightIcon />} PrevIcon={<ChevronLeftIcon />}>
      {adList.map((ad) => (
        <AdItem key={ad.id} ad={ad} />
      ))}
    </Carousel>
  );
}
