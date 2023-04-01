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
import { getMyRecipeList } from '@/apis/services/profile';
import { getLikedRecipeListAPI, getMyRecipeListAPI } from '@/apis/api/profile';

export default function Profile() {
  const [member, setMember] = useState<MemberProfileType>({
    id: '',
    email: '',
    nickname: '',
    profile: { image: '', content: '' },
    sbti: '',
    grade: '',
    exp: 0,
  });
  const [menu, setMenu] = useState<MenuType>('POST_RECIPE');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { memberData } = useMember();

  const { id } = useParams();
  const [recipeList, setRecipeList] = useState<ProfileRecipeType[]>([]);
  useEffect(() => {
    handleMenuClick('POST_RECIPE');
  }, []);

  const handleMenuClick = (menu: MenuType) => {
    if (menu === 'LIKE_RECIPE') {
      getLikedRecipeListAPI(memberData.id).then(setRecipeList);
    } else if (menu === 'POST_RECIPE') {
      getMyRecipeListAPI(memberData.id).then(getMyRecipeList).then(setRecipeList);
    } else if (menu === 'LIKE_SNACK') {
    }
    setMenu(menu);
  };

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
      {member && <Menu member={member} menu={menu} handleMenuClick={handleMenuClick} />}
      {member && id && (
        <ModifyModal member={member} modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} setMember={setMember} />
      )}
      <RecipeGrid recipeList={recipeList} />
      <BottomNav />
    </div>
  );
}
