import React, { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isActiveInServer } from "../../config";
import invokeAPI, { invokeFileUpload } from "../../lib/restAPI";
import { clearReviseData, setAppState } from "../../modules/actions/appInfo";
import { getUserInfoThunk } from "../../modules/thunk/appInfo";
import Body from "./body/Body";
import Header from "./Header";
import { MyPageTemplateProps, updateUserInfoArgs } from "./myPageTypes";
import { RootState } from "../../redux/slice";

const MyPageTemplateBlock = styled.div`
  display: flex;
  flex: 1;
  background: #e9ecef;
  flex-direction: column;
`;

const MyPageTemplate: FC<MyPageTemplateProps> = ({
  getUserWriteBlogs,
  page,
  ...props
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const userBlogs = useSelector(
    (state: RootState) => state.Blog.userWriteBlogs
  );
  const userInfo = useSelector((state: RootState) => state.AppInfo.userInfo);
  const isReviseUserInfo = useSelector(
    (state: RootState) => state.AppInfo.isReviseUserInfo
  );
  const userImgSrc = useSelector(
    (state: RootState) => state.AppInfo.userImgSrc
  );
  const backgroundImgSrc = useSelector(
    (state: RootState) => state.AppInfo.backgroundImgSrc
  );
  const tempNickname = useSelector(
    (state: RootState) => state.AppInfo.tempNickname
  );
  const userImgTempData = useSelector(
    (state: RootState) => state.AppInfo.userImgTempData
  );
  const backgroundImgTempData = useSelector(
    (state: RootState) => state.AppInfo.backgroundImgTempData
  );
  const isUserImgChanged = useSelector(
    (state: RootState) => state.AppInfo.isUserImgChanged
  );
  const isBackgroundImgChanged = useSelector(
    (state: RootState) => state.AppInfo.isBackgroundImgChanged
  );

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userInfo?.profileImg?.publishedUrl) {
      dispatch(
        setAppState({
          key: "userImgSrc",
          value: userInfo.profileImg.publishedUrl,
        })
      );
    }
  }, [userInfo]);

  const encodeFileToBase64 = async (
    fileBlob: Blob,
    type: "userImg" | "background"
  ) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        if (type == "userImg") {
          dispatch(setAppState({ key: "userImgTempData", value: fileBlob }));
          dispatch(setAppState({ key: "userImgSrc", value: reader.result }));
          dispatch(setAppState({ key: "isUserImgChanged", value: true }));
        } else {
          dispatch(
            setAppState({ key: "backgroundImgTempData", value: fileBlob })
          );
          dispatch(
            setAppState({ key: "backgroundImgSrc", value: reader.result })
          );
          dispatch(setAppState({ key: "isBackgroundImgChanged", value: true }));
        }
        resolve(null);
      };
    });
  };

  const onClickRevise = () => {
    if (!isReviseUserInfo) {
      batch(() => {
        dispatch(
          setAppState({
            key: "tempNickname",
            value: userInfo?.nickname ?? "",
          })
        );
        dispatch(setAppState({ key: "isReviseUserInfo", value: true }));
      });
    } else {
      const updateDataExist =
        isUserImgChanged ||
        isBackgroundImgChanged ||
        tempNickname == userInfo?.nickname;
      if (!updateDataExist) {
        dispatch(setAppState({ key: "isReviseUserInfo", value: true }));
      }
      _uploadFile(isUserImgChanged, isBackgroundImgChanged);
    }
  };

  const _uploadFile = async (
    isUserImgChanged: boolean,
    isBackgroundImgChanged: boolean
  ) => {
    let profileImgIdx: number | null = null,
      backgroundImgIdx: number | null = null;
    try {
      if (isUserImgChanged && userImgTempData) {
        const profileImgResult = await invokeFileUpload({
          path: "/api/files/upload",
          data: userImgTempData,
          uploadType: "image/user/profile",
        });
        profileImgIdx = profileImgResult.data.data.id;
      }
      if (isBackgroundImgChanged && backgroundImgTempData) {
        const backgroundImgResult = await invokeFileUpload({
          path: "/api/files/upload",
          data: backgroundImgTempData,
          uploadType: "image/user/background",
        });
        backgroundImgIdx = backgroundImgResult.data.data.id;
      }
      _updateUserInfo({
        backgroundImgIdx,
        profileImgIdx,
        nickname: tempNickname,
      });
    } catch (err) {
      !isActiveInServer &&
        console.log("MyPageTemplate _uploadFile error: ", err);
    }
  };

  const _updateUserInfo = async (props: updateUserInfoArgs) => {
    const { profileImgIdx, backgroundImgIdx, nickname } = props;
    try {
      const result = await invokeAPI({
        method: "put",
        path: "/api/users/update",
      })({
        data: {
          profileImgIdx,
          backgroundImgIdx,
          nickname,
        },
      });
      _getUserInfo();
    } catch (err) {
      !isActiveInServer &&
        console.log("MyPageTemplate _updateUserInfo error: ", err);
    }
  };

  const _getUserInfo = async () => {
    try {
      const result = await dispatch(getUserInfoThunk({}));
      await dispatch(clearReviseData());
    } catch (err) {
      !isActiveInServer && console.log("MyPage _getUserInfo error: ", err);
    }
  };

  const onScroll = () => {
    if (bodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = bodyRef.current;
      if (scrollTop + clientHeight == scrollHeight) {
        const totalPages = userBlogs?.totalPages ?? 0;
        if (totalPages > page) {
          getUserWriteBlogs(page + 1);
        }
      }
    }
  };
  const onPressItem = (id: number) => {
    navigate(`/detail?id=${id}`);
  };

  return (
    <MyPageTemplateBlock
      {...props}
      style={{
        backgroundImage: `url(${backgroundImgSrc})`,
      }}
    >
      <Header />
      <Body
        userBlogs={userBlogs}
        isRevise={isReviseUserInfo}
        userInfo={userInfo}
        encodeFileToBase64={encodeFileToBase64}
        userImgTempSrc={userImgSrc}
        backgroundImgTempSrc={backgroundImgSrc}
        onClickRevise={onClickRevise}
        onClickReviseCancel={() => {
          dispatch(clearReviseData());
        }}
        tempNickname={tempNickname}
        setTempNickname={(value) => {
          dispatch(setAppState({ key: "tempNickname", value }));
        }}
        bodyRef={bodyRef}
        onScroll={onScroll}
        onPressItem={onPressItem}
      />
    </MyPageTemplateBlock>
  );
};

export default MyPageTemplate;
