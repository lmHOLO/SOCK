import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import Header from '@/components/Profile/Header';
import Menu from '@/components/Profile/Menu';
import ModifyModal from '@/components/Profile/ModifyModal';
import GridItem from '@/components/Profile/GridItem';
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

  const { id } = useParams<string>();
  const [itemList, setItemList] = useState<ProfileGridItemType[]>([]);

  const handleMenuClick = (menu: MenuType) => {
    if (menu === 'LIKE_RECIPE') {
      id && getLikedRecipeListAPI(id).then(getLikedRecipeList).then(setItemList);
    } else if (menu === 'POST_RECIPE') {
      id && getMyRecipeListAPI(id).then(getMyRecipeList).then(setItemList);
    } else if (menu === 'LIKE_SNACK') {
      id && getLikedSnackListAPI(id).then(getLikedSnackList).then(setItemList);
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
    handleMenuClick('POST_RECIPE');
  }, [id, memberData.id]);

  return (
    <div>
      <TopNav />
      <audio autoPlay>
        <source src={require('@/assets/eating_cracker.mp3')} type='audio/mpeg'></source>
      </audio>
      {memberData.id === member.id && <PositionedMenu setModalOpen={setModalOpen} />}
      {member && <Header member={member} />}
      {member && <Menu member={member} menu={menu} handleMenuClick={handleMenuClick} />}
      {member && id && (
        <ModifyModal member={member} modalOpen={modalOpen} setModalOpen={setModalOpen} id={id} setMember={setMember} />
      )}
      <GridItem menu={menu} itemList={itemList} />
      <BottomNav />
    </div>
  );
}
