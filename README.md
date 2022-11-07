### TreeMenu / PropertyGrid

### System default / custom theme 

![sample](https://github.com/code4bones/react-c4b-ui/blob/master/img/theme.png?raw=true "sample")

# react-tree-menu-property-grid

|feature|sample|
|-------|------|
|![cap](https://github.com/code4bones/react-tree-menu-property-grid/blob/master/img/controls.gif?raw=true)|![cap](https://github.com/code4bones/react-tree-menu-property-grid/blob/master/img/reveal.gif?raw=true)  |
![cap](https://github.com/code4bones/react-tree-menu-property-grid/blob/master/img/folders.gif?raw=true)|![cap](https://github.com/code4bones/react-tree-menu-property-grid/blob/master/img/group-right.gif?raw=true)|

# clone, samples available via `yarn storybook` 

#### Brief

# yarn add `@code4bones/react-tree-menu-property-grid`

```tsx

import  {TreeMenu, TreeMenuActions,TreeMenuItem }  from "@code4bones/react-tree-menu-property-grid";
import "@code4bones/react-tree-menu-property-grid/build/styles.css";

const ITEMS : TreeMenuItem[] = [{
  id:"item1",
  title:"Item 1",
  // other TreeMenuItem's props
    childs:[{
     id:"sub",
     title:"Subitem 1",
   }]
}];

// if your need to use exponsed actions
const ref = createRef<TreeMenuActions>();

<TreeMenu
  ref={ref}
  items={ITEMS}
  onClick={onClick} 
/>

```

### Properties

type `RenderFn` = (item:MenuItem) => React.ReactElement | undefined | null; 
type `RenderType` = `RenderFn` | React.ReactElement; 


| Propery name | Description                    | Signature
| ------------- | ------------------------------ | ---- |
| `items[]`      | tree menu items array       | `TreeMenuItem`[] |
| `ref`      | handle to TreeMenu methods       | `TreeMenuActions` |
| `onClick`   |  item click handler     | onClick?:(item:TreeMenuItem) => void|
| `onToggle`   |  collapse  / expand     | onToggle?:(id?:string,collapsed?:boolean) => void;|
| `initialCollapsed`   |  initial tree state     | boolean |
| `initialSelected`   |  initial selected item     | item's `id` : string|
| `renderBadge`   |  item click handler     | `RenderType` |
| `renderIcon`   |  Left side element of item     | `RenderType` |
| `renderGroupState`   | Group indicator     | `RenderType` |
| `theme`   | theme override class name     | `dark`, `light`, custom name | 
| `classPrefix`   | container global prefix     | string |
| `enableRotate` | Rotate collapse / expand | boolean |


`TreeMenuItem`

```tsx
    id:string;
    title:string | React.ReactElement;
    info?:string | React.ReactElement;
    infoReveal?:InfoReveal;
    icon?:React.ReactElement;
    badge?:string | React.ReactElement;
    disabled?:boolean;
    unselectable?:boolean;
    titleClass?:string;
    infoClass?:string;
    style?:React.CSSProperties;
    titleStyle?:React.CSSProperties;
    infoStyle?:React.CSSProperties;
```

`TreeMenuActions` ( use `ref` )
```
    enable:(id:string,disable?:boolean) => void;
    getItem:(id:string) => TreeMenuItem | null;
    collapse:(id:string,collapsed?:boolean) => void;
    select:(id:string) => void;

```

### Sample

Sample available via storybook `yarn storybook`
