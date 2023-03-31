import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import Header from '@/components/Profile/Header';
import Menu from '@/components/Profile/Menu';
import ModifyModal from '@/components/Profile/ModifyModal';
import RecipeGrid from '@/components/Profile/RecipeGrid';
import { MemberProfileType, MenuType } from '@/types/member';
import { ProfileRecipeType } from '@/types/recipe';
import React, { useEffect, useState } from 'react';
import useMember from '@/hooks/memberHook';
import { useParams } from 'react-router-dom';
import { loginApi, otherMemberProfileApi } from '@/apis/api/member';
import { getRecipeListAPI } from '@/apis/api/recipeList';

export default function Profile() {
  const [member, setMember] = useState<MemberProfileType>();
  const [menu, setMenu] = useState<MenuType>('POST_RECIPE');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { memberData } = useMember();

  const { id } = useParams();
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

  useEffect(() => {
    if (id == memberData.id) {
      loginApi().then((data) => {
        setMember(data);
      });
    } else if (id) {
      otherMemberProfileApi(id).then((data) => {
        setMember(data);
      });
    }
    // 마이페이지에서 내가 작성한 레시피 뿌리기 - 수정필요
    // if (id) {
    //   getRecipeListAPI('', '', id).then((recipeData) => {
    //     setRecipeList(recipeData);
    //   });
    // }
  }, []);

  return (
    <div>
      <TopNav />
      {member && <Header member={member} setModalOpen={setModalOpen} />}
      {member && <Menu member={member} menu={menu} setMenu={setMenu} />}
      {member && <ModifyModal member={member} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      <RecipeGrid recipeList={recipeList} />
      <BottomNav />
    </div>
  );
}
