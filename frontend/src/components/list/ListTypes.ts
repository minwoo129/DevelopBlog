import { HTMLAttributes } from "react";
import { blogItemType } from "../../modules/initialStates/initialStateType";

export interface ListTemplateProps extends HTMLAttributes<HTMLDivElement> {}

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogItemType;
  onPress(id: number): void;
}

export interface LockedIconProps extends HTMLAttributes<HTMLDivElement> {
  isPublic: boolean;
}
