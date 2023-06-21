import React, { FC, HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { isActiveInServer } from "../../config";
import Body from "./body/Body";
import SearchBar from "./SearchBar";
import { RootState } from "../../redux/slice";
import { getSearchBlogs } from "../../redux/slice/Blog";
import { setSearchTxt } from "../../redux/slice/AppInfo";

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
  const searchTxt = useSelector((state: RootState) => state.AppInfo.searchTxt);
  const searchBlogs = useSelector((state: RootState) => state.Blog.searchBlogs);
  const isExecuteSearch = useSelector(
    (state: RootState) => state.Blog.isExecuteSearch
  );
  const backgroundImgSrc = useSelector(
    (state: RootState) => state.AppInfo.backgroundImgSrc
  );

  const onPressSearch = async () => {
    if (searchTxt == "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    try {
      const result = await dispatch(
        getSearchBlogs({
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
