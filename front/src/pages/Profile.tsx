import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import Header from '@/components/Profile/Header';
import Menu from '@/components/Profile/Menu';
import ModifyModal from '@/components/Profile/ModifyModal';
import RecipeGrid from '@/components/Profile/RecipeGrid';
import { MemberProfileType, MenuType } from '@/types/member';
import { ProfileRecipeType } from '@/types/recipe';
import React, { useState } from 'react';

export default function Profile() {
  const [member, setMember] = useState<MemberProfileType>({
    id: '1',
    email: 'geon@gmail.com',
    nickname: '건빵',
    profile: { image: 'https://i.postimg.cc/x8VV5MyD/image.jpg', content: '이건소개글안녕나여나연' },
    sbti: 'sbti',
    grade: 'SECOND',
    exp: 0,
  });
  const [menu, setMenu] = useState<MenuType>('POST_RECIPE');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<ProfileRecipeType[]>([
    {
      recipeId: '1',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
    {
      recipeId: '2',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
    {
      recipeId: '3',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
    {
      recipeId: '4',
      image: 'https://i.postimg.cc/x8VV5MyD/image.jpg',
    },
  ]);
  return (
    <div>
      <TopNav />
      <Header member={member} setModalOpen={setModalOpen} />
      <Menu member={member} menu={menu} setMenu={setMenu} />
      <ModifyModal member={member} modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <RecipeGrid recipeList={recipeList} />
      <BottomNav />
    </div>
  );
}
