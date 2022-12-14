import React, { FC, HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { isActiveInServer } from "../../config";
import { setSearchTxt } from "../../modules/actions/appInfo";
import { RootState } from "../../modules/reducer";
import { getSearchBlogsThunk } from "../../modules/thunk/blog";
import Body from "./body/Body";
import SearchBar from "./SearchBar";

const SearchTemplateBlock = styled.div`
  flex: 1;
  color: blue;
  background: #e9ecef;
  display: flex;
  flex-direction: column;
`;

interface SearchTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const SearchTemplate: FC<SearchTemplateProps> = (props) => {
  const dispatch = useDispatch<any>();
  const searchTxt = useSelector((state: RootState) => state.appInfo.searchTxt);
  const searchBlogs = useSelector((state: RootState) => state.blog.searchBlogs);
  const isExecuteSearch = useSelector(
    (state: RootState) => state.blog.isExecuteSearch
  );
  const backgroundImgSrc = useSelector(
    (state: RootState) => state.appInfo.backgroundImgSrc
  );

  const onPressSearch = async () => {
    if (searchTxt == "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    try {
      const result = await dispatch(
        getSearchBlogsThunk({
          params: {
            searchTxt,
          },
        })
      );
    } catch (err) {
      !isActiveInServer &&
        console.log("SearchTemplate onPressSearch error: ", err);
    }
  };

  return (
    <SearchTemplateBlock
      style={{
        backgroundImage: `url(${backgroundImgSrc})`,
      }}
    >
      <SearchBar
        searchTxt={searchTxt}
        onChangeValue={(e) => dispatch(setSearchTxt(e.target.value))}
        onPressSearch={onPressSearch}
      />
      <Body
        searchBlogs={searchBlogs}
        isExecuteSearch={isExecuteSearch}
        searchTxt={searchTxt}
      />
    </SearchTemplateBlock>
  );
};

export default SearchTemplate;
