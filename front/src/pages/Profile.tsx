import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import Header from '@/components/Profile/Header';
import Menu from '@/components/Profile/Menu';
import ModifyModal from '@/components/Profile/ModifyModal';
import RecipeGrid from '@/components/Profile/GridItem';
import { MemberProfileType, MenuType, ProfileGridItemType } from '@/types/member';
import React, { useEffect, useState } from 'react';
import useMember from '@/hooks/memberHook';
import { useParams } from 'react-router-dom';
import { loginApi, otherMemberProfileApi } from '@/apis/api/member';

import { getLikedSnackList, getMyRecipeList, getLikedRecipeList } from '@/apis/services/profile';
import { getLikedRecipeListAPI, getLikedSnackListAPI, getMyRecipeListAPI } from '@/apis/api/profile';
import PositionedMenu from '@/components/Profile/PositionedMenu';

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
  const [itemList, setItemList] = useState<ProfileGridItemType[]>([]);
  useEffect(() => {
    handleMenuClick('POST_RECIPE');
  }, []);

  const handleMenuClick = (menu: MenuType) => {
    if (menu === 'LIKE_RECIPE') {
      getLikedRecipeListAPI(memberData.id).then(getLikedRecipeList).then(setItemList);
    } else if (menu === 'POST_RECIPE') {
      getMyRecipeListAPI(memberData.id).then(getMyRecipeList).then(setItemList);
    } else if (menu === 'LIKE_SNACK') {
      getLikedSnackListAPI(memberData.id).then(getLikedSnackList).then(setItemList);
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
      {memberData.id === member.id && <PositionedMenu setModalOpen={setModalOpen} />}
      {member && <Header member={member} setModalOpen={setModalOpen} />}
      {member && <Menu member={member} menu={menu} handleMenuClick={handleMenuClick} />}
      {member && id && <ModifyModal member={member} modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} setMember={setMember} />}
      <RecipeGrid menu={menu} itemList={itemList} />
      <BottomNav />
    </div>
  );
}
