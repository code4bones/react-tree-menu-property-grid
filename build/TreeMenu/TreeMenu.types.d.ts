/// <reference types="react" />
declare type InfoReveal = "always" | "vertical" | "horizontal";
export declare type ItemProps = {
    id: string;
    title: string | React.ReactElement;
    info?: string | React.ReactElement;
    badge?: string | React.ReactElement;
    control?: string | JSX.Element;
    icon?: React.ReactElement;
    infoReveal?: InfoReveal;
    disabled?: boolean;
    unselectable?: boolean;
    titleClass?: string;
    infoClass?: string;
    style?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    infoStyle?: React.CSSProperties;
    classes?: Set<string>;
    collapsed?: boolean;
    hasChilds?: boolean;
    onClick?: (item: ItemProps) => void;
    level?: number;
    route?: string;
};
export declare type MenuItem = Omit<ItemProps, "level" | "classes" | "onClick">;
export declare type TreeMenuItem = {
    childs?: TreeMenuItem[];
} & MenuItem;
export declare type TreeMenuItemType = {
    parent?: TreeMenuItemType;
    childs?: TreeMenuItemType[];
} & ItemProps;
export declare type RenderFn = (item: MenuItem) => React.ReactElement | undefined | null;
export declare type RenderType = RenderFn | React.ReactElement;
export declare type ItemRenderProps = {
    enableRotate?: boolean;
    propertyGrid?: boolean;
    badgeVisible?: boolean;
    treeID: string;
    groupIconLeft?: boolean;
    renderBadge?: RenderType;
    renderIcon?: RenderType;
    renderGroupState?: RenderType;
} & ItemProps;
declare type Theme = "dark" | "light";
declare type CommonItemProps = Pick<ItemRenderProps, "infoStyle" | "titleStyle" | "infoReveal" | "enableRotate" | "badgeVisible" | "groupIconLeft" | "renderBadge" | "renderIcon" | "renderGroupState" | "treeID" | "propertyGrid">;
export declare type TreeMenuProps = {
    items: TreeMenuItem[];
    theme?: Theme | string;
    itemHeight?: number;
    classPrefix?: string;
    initialCollapsed?: boolean;
    initialSelected?: string;
    onClick?: (id: string) => void;
    onToggle?: (id?: string, collapsed?: boolean) => void;
} & CommonItemProps;
export {};
