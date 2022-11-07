import React from "react";
import { TreeMenuItem } from "./TreeMenu.types";
import "./TreeMenu.less";
export { TreeMenuItem };
export declare type TreeMenuActions = {
    enable: (id: string, disable?: boolean) => void;
    getItem: (id: string) => TreeMenuItem | null;
    collapse: (id: string, collapsed?: boolean) => void;
    select: (id: string) => void;
    invalidate: () => void;
    rebuild: (items: TreeMenuItem[]) => void;
};
declare const TreeMenu: React.ForwardRefExoticComponent<{
    items: TreeMenuItem[];
    theme?: string;
    itemHeight?: number;
    classPrefix?: string;
    initialCollapsed?: boolean;
    initialSelected?: string;
    onClick?: (id: string) => void;
    onToggle?: (id?: string, collapsed?: boolean) => void;
} & {
    treeID: string;
    infoReveal?: "always" | "vertical" | "horizontal";
    titleStyle?: React.CSSProperties;
    infoStyle?: React.CSSProperties;
    enableRotate?: boolean;
    badgeVisible?: boolean;
    groupIconLeft?: boolean;
    renderBadge?: import("./TreeMenu.types").RenderType;
    renderIcon?: import("./TreeMenu.types").RenderType;
    renderGroupState?: import("./TreeMenu.types").RenderType;
    propertyGrid?: boolean;
} & React.RefAttributes<TreeMenuActions>>;
export default TreeMenu;
