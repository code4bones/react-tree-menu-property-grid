### React Component Library - code4bones react UI

### Components
	
|   Component| Description   |
| ------------ | ------------ |
|  TreeMenu | Navigation Menu Tree   |


# react-c4b-ui

![npm](https://img.shields.io/npm/v/@code4bones/react-c4b-ui?label=latest)
![npm](https://img.shields.io/npm/dt/@code4bones/react-c4b-ui?style=flat-square&label=installs)

![](https://img.shields.io/github/downloads/code4bones/react-c4b-ui/total) ![](https://img.shields.io/github/watchers/code4bones/react-c4b-ui) ![](https://img.shields.io/github/forks/code4bones/react-c4b-ui)  ![](https://img.shields.io/github/release/code4bones/react-c4b-ui) ![](https://img.shields.io/github/issues/code4bones/react-c4b-ui)

### Links

[Change log](https://github.com/code4bones/react-c4b-ui/wiki/Change-Log "Change log")

### System default / custom theme 

![sample](https://github.com/code4bones/react-c4b-ui/blob/master/img/theme.png?raw=true "sample")

|feature|sample|
|-------|------|
|![cap](https://github.com/code4bones/react-c4b-ui/blob/master/img/items_reveal.gif?raw=true)|  |
![cap](https://github.com/code4bones/react-c4b-ui/blob/master/img/rorate_group.gif?raw=true)|![cap](https://github.com/code4bones/react-c4b-ui/blob/master/img/static_group.gif?raw=true)|

### Install


`$ yarn add @code4bones/react-c4b-ui`

#### TreeMenu

#### Brief

```tsx

import  {TreeMenu, TreeMenuActions,TreeMenuItem }  from "@code4bones/react-c4b-ui";
import "@code4bones/react-c4b-ui/build/styles.css";

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
