import React, { FC, HTMLAttributes, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DetailTemplate from "../components/detail/DetailTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import qs from "qs";
import { useDispatch } from "react-redux";
import { getBlogThunk } from "../modules/thunk/blog";
import { useSelector } from "react-redux";
import { RootState } from "../modules/reducer";
import { setMenuOpen } from "../modules/actions/menu";

interface DetailPageProps extends HTMLAttributes<HTMLDivElement> {}

const DetailPage: FC<DetailPageProps> = (props) => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const blog = useSelector((state: RootState) => state.blog.blog);
  const isMenuVisible = useSelector(
    (state: RootState) => state.menu.isMenuVisible
  );
  console.log("query: ", query);

  useEffect(() => {
    _getBlog(Number(query.id));
  }, []);

  const _getBlog = async (id: number) => {
    try {
      const result = await dispatch(
        getBlogThunk({
          subPath: `/${id}`,
        })
      );
      console.log("DetailPage _getBlog result: ", result);
    } catch (err) {
      console.log("DetailPage _getBlog error: ", err);
    }
  };

  return (
    <MenuTemplate>
      <DetailTemplate
        blog={blog}
        isMenuVisible={isMenuVisible}
        setMenuOpen={() => dispatch(setMenuOpen(true))}
      />
    </MenuTemplate>
  );
};

export default DetailPage;
