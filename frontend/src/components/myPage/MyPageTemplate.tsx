import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { clearReviseData, setAppState } from "../../modules/actions/appInfo";
import { RootState } from "../../modules/reducer";
import Body from "./body/Body";
import Header from "./Header";

const MyPageTemplateBlock = styled.div`
  display: flex;
  flex: 1;
  background: #e9ecef;
  flex-direction: column;
`;

interface MyPageTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const MyPageTemplate: FC<MyPageTemplateProps> = ({ ...props }) => {
  const dispatch = useDispatch<any>();
  const userBlogs = useSelector(
    (state: RootState) => state.appInfo.userWriteBlogs
  );
  const userInfo = useSelector((state: RootState) => state.appInfo.userInfo);
  const isReviseUserInfo = useSelector(
    (state: RootState) => state.appInfo.isReviseUserInfo
  );
  const userImgSrc = useSelector(
    (state: RootState) => state.appInfo.userImgSrc
  );
  const backgroundImgSrc = useSelector(
    (state: RootState) => state.appInfo.backgroundImgSrc
  );
  const tempNickname = useSelector(
    (state: RootState) => state.appInfo.tempNickname
  );
  const userImgTempData = useSelector(
    (state: RootState) => state.appInfo.userImgTempData
  );
  const backgroundImgTempData = useSelector(
    (state: RootState) => state.appInfo.backgroundImgTempData
  );

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
    console.log("file: ", fileBlob);
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
        onClickRevise={() => {
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
            console.log("nickname: ", tempNickname);
            console.log("userImgTempData: ", userImgTempData);
            console.log("backgroundImgTempData: ", backgroundImgTempData);
          }
        }}
        onClickReviseCancel={() => {
          dispatch(clearReviseData());
        }}
        tempNickname={tempNickname}
        setTempNickname={(value) => {
          dispatch(setAppState({ key: "tempNickname", value }));
        }}
      />
    </MyPageTemplateBlock>
  );
};

export default MyPageTemplate;
