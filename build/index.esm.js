import React, { useState, useImperativeHandle, useEffect, useMemo } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

// type ItemIconProps = Pick<ItemRenderProps,"icon" | "renderIcon">;
var ItemIcon = function (props) {
    var icon = props.icon, renderIcon = props.renderIcon;
    var iconView = useMemo(function () {
        if (!icon && !renderIcon)
            return null;
        return icon || (typeof renderIcon === "function" ? renderIcon(props) : renderIcon);
    }, [icon, renderIcon]);
    return (React.createElement("div", { className: "icon" }, iconView));
};
var ItemBadge = function (props) {
    var renderBadge = props.renderBadge, badge = props.badge;
    var badgeView = useMemo(function () {
        if (!badge && !renderBadge)
            return null;
        return badge || (typeof renderBadge === "function" ? renderBadge(props) : renderBadge);
    }, [badge, renderBadge]);
    return (React.createElement("div", { className: "marker" }, badgeView));
};
var GroupState = function (props) {
    var hasChilds = props.hasChilds, renderGroupState = props.renderGroupState, enableRotate = props.enableRotate, collapsed = props.collapsed;
    var state = useMemo(function () {
        if (!hasChilds || !renderGroupState)
            return null;
        return typeof renderGroupState === "function" ? renderGroupState(props) : renderGroupState;
    }, [hasChilds, renderGroupState, enableRotate, collapsed]);
    return (React.createElement("div", { className: clsx("folder", { "enable-rotate": enableRotate }) }, state));
};
var ItemText = function (props) {
    var title = props.title, info = props.info, titleClass = props.titleClass, infoClass = props.infoClass, _a = props.infoReveal, infoReveal = _a === void 0 ? "none" : _a, titleStyle = props.titleStyle, infoStyle = props.infoStyle;
    return (React.createElement("div", { className: "text" },
        React.createElement("div", { className: clsx("title", titleClass, infoReveal), style: titleStyle }, title),
        info && React.createElement("div", { className: clsx("info", infoClass, infoReveal), style: infoStyle }, info)));
};
var Control = function (_a) {
    var children = _a.children, treeID = _a.treeID;
    var lastX = React.useRef(0);
    var lastW = React.useRef(0);
    var tree = React.useRef(document.getElementById(treeID));
    var onMouseDown = function (ev) {
        var val = document.getElementsByClassName("value");
        if (!val.length)
            return;
        var rc = val[0].getBoundingClientRect();
        lastX.current = ev.pageX;
        lastW.current = rc.left - 16;
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onStop);
        onMove(ev);
        ev.preventDefault();
    };
    var onMove = function (ev) {
        var delta = ev.pageX - lastX.current;
        var newX = lastW.current + delta;
        var dir = (newX - lastW.current) >= 0;
        if ((!dir && newX > 100) || (dir && newX < tree.current.clientWidth - 40)) {
            var tree_1 = document.getElementById(treeID);
            tree_1.style.setProperty("--resizeX", "".concat(newX, "px"));
            lastW.current = newX;
            lastX.current = ev.pageX;
        }
        ev.preventDefault();
    };
    var onStop = function (ev) {
        window.removeEventListener("mouseup", onStop);
        window.removeEventListener("mousemove", onMove);
        ev.preventDefault();
    };
    return (React.createElement("div", { className: "value", style: { display: "flex", flexDirection: "row" } },
        React.createElement("div", { className: "sizer", onMouseDown: onMouseDown }),
        React.createElement("div", { className: "control" }, children)));
};
var Item = function (props) {
    var icon = props.icon, hasChilds = props.hasChilds, disabled = props.disabled, onClick = props.onClick, _a = props.level, level = _a === void 0 ? 0 : _a, style = props.style, control = props.control, propertyGrid = props.propertyGrid, treeID = props.treeID, badgeVisible = props.badgeVisible, groupIconLeft = props.groupIconLeft, _b = props.classes, classes = _b === void 0 ? [] : _b;
    var padding = icon && hasChilds ? 0 : 0;
    return (React.createElement("div", { style: __assign({ paddingLeft: "".concat((level * 12) + padding, "px") }, style), className: clsx("item", { hasChilds: hasChilds, disabled: disabled }, Array.from(classes)), onClick: function () { return onClick && onClick(props); } },
        React.createElement("div", { className: clsx("content", { hasChilds: hasChilds }) },
            groupIconLeft && React.createElement(GroupState, __assign({}, props)),
            React.createElement(ItemIcon, __assign({}, props)),
            React.createElement(ItemText, __assign({}, props)),
            badgeVisible && React.createElement(ItemBadge, __assign({}, props))),
        (propertyGrid || control) && !hasChilds && React.createElement(Control, { treeID: treeID }, control),
        groupIconLeft || React.createElement(GroupState, __assign({}, props))));
};
var TreeMenu = React.forwardRef(function (props, ref) {
    // eslint-disable-next-line react/prop-types
    var items = props.items, renderBadge = props.renderBadge, renderGroupState = props.renderGroupState, renderIcon = props.renderIcon, onClick = props.onClick, onToggle = props.onToggle, _a = props.infoReveal, infoReveal = _a === void 0 ? "always" : _a, initialCollapsed = props.initialCollapsed, initialSelected = props.initialSelected, titleStyle = props.titleStyle, infoStyle = props.infoStyle, classPrefix = props.classPrefix, enableRotate = props.enableRotate, propertyGrid = props.propertyGrid, groupIconLeft = props.groupIconLeft, _b = props.badgeVisible, badgeVisible = _b === void 0 ? true : _b, treeID = props.treeID, itemHeight = props.itemHeight, theme = props.theme;
    var _c = useState([]), data = _c[0], setData = _c[1];
    var _d = useState(), selected = _d[0], setSelected = _d[1];
    var _e = useState(false), changed = _e[0], setChanged = _e[1];
    var _f = useState(false), once = _f[0], setOnce = _f[1];
    var getItem = function (id) {
        var found = null;
        var iterate = function (list) {
            if (!list)
                return null;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                found = item.id === id ? item : iterate(item === null || item === void 0 ? void 0 : item.childs);
                if (found)
                    return found;
            }
            return found;
        };
        return iterate(data);
    };
    var processParents = function (start, cb) {
        if (!(start === null || start === void 0 ? void 0 : start.parent))
            return;
        processParents(start === null || start === void 0 ? void 0 : start.parent, cb);
        cb(start.parent);
    };
    var iteratateItems = function (list, cb) {
        list === null || list === void 0 ? void 0 : list.forEach(function (item) {
            var _a;
            cb(item);
            if ((_a = item.childs) === null || _a === void 0 ? void 0 : _a.length)
                iteratateItems(item.childs, cb);
        });
    };
    var enableItem = function (id, disable) {
        var item = getItem(id);
        if (item)
            item.disabled = disable;
        setChanged(!changed);
    };
    var collapse = function (id, collapsed) {
        var item = getItem(id);
        processParents(item, function (parent) {
            parent.collapsed = false;
            setCollapse(parent);
        });
        item.collapsed = collapsed;
        setCollapse(item);
        setChanged(!changed);
    };
    var selectItem = function (id) {
        var _a, _b;
        var item = getItem(id);
        if (selected)
            (_a = selected.classes) === null || _a === void 0 ? void 0 : _a.delete("selected");
        processParents(item, function (parent) {
            parent.collapsed = false;
            setCollapse(parent);
        });
        (_b = item.classes) === null || _b === void 0 ? void 0 : _b.add("selected");
        setSelected(item);
    };
    // methods for parent
    useImperativeHandle(ref, function () { return ({
        enable: enableItem,
        getItem: getItem,
        collapse: collapse,
        select: selectItem,
        invalidate: function () { return setChanged(!changed); },
        rebuild: function (newItems) { setOnce(false); setData(transform(Array.from(newItems))); }
    }); });
    var transform = function (list, level, parent) {
        if (level === void 0) { level = 0; }
        return list.map(function (item, index) {
            if (parent)
                item.parent = parent;
            var childs = item.childs;
            item.level = level;
            if (!item.id)
                item.id = "id_".concat(level, "_").concat(index);
            if (item.info) {
                item.infoReveal = item.infoReveal || infoReveal || "always";
            }
            if (childs) {
                item.hasChilds = true;
                item.classes = new Set(["expanded"]);
                item.childs = transform(childs, level + 1, item);
            }
            else {
                item.classes = new Set();
            }
            return item;
        });
    };
    useEffect(function () {
        setData(transform(items));
    }, [items]);
    var setCollapse = function (item) {
        var _a, _b, _c, _d;
        if (item.collapsed) {
            (_a = item.classes) === null || _a === void 0 ? void 0 : _a.add("collapsed");
            (_b = item.classes) === null || _b === void 0 ? void 0 : _b.delete("expanded");
        }
        else {
            (_c = item.classes) === null || _c === void 0 ? void 0 : _c.delete("collapsed");
            (_d = item.classes) === null || _d === void 0 ? void 0 : _d.add("expanded");
        }
    };
    var _onClick = function (item) {
        var _a, _b, _c;
        var update = false;
        if (selected && !(item.unselectable)) {
            (_a = selected.classes) === null || _a === void 0 ? void 0 : _a.delete("selected");
        }
        if (item.hasChilds) {
            item.collapsed = !item.collapsed;
            setCollapse(item);
            if (onToggle)
                onToggle(item.id, (_b = item.classes) === null || _b === void 0 ? void 0 : _b.has("collapsed"));
            update = true;
        }
        if (!item.unselectable) {
            (_c = item.classes) === null || _c === void 0 ? void 0 : _c.add("selected");
            setSelected(item);
        }
        else {
            update = true;
        }
        if (update)
            setChanged(!changed);
        if (onClick)
            onClick(item.id);
    };
    var render = function (list) {
        var onRef = function (r) {
            // set initial max-height to element height to fix sliding menu time gap ( max-height: 1000 is to much ! -:) ))
            if (r && !r.style.getPropertyValue("--mh")) {
                var height = r.clientHeight;
                r.style.setProperty("--mh", "".concat(height, "px"));
            }
        };
        var view = list.map(function (item, index) {
            var childs = item.childs;
            var commonProps = __assign(__assign({ titleStyle: titleStyle, infoStyle: infoStyle }, item), { 
                // add common props
                onClick: function () { return _onClick(item); }, renderBadge: renderBadge, enableRotate: enableRotate, renderGroupState: renderGroupState, renderIcon: renderIcon, badgeVisible: badgeVisible, groupIconLeft: groupIconLeft, treeID: treeID, propertyGrid: propertyGrid });
            if (childs) {
                return (React.createElement("div", { ref: onRef, key: index, className: "wrapper" },
                    React.createElement(Item, __assign({ key: item.id, disabled: false }, commonProps)),
                    React.createElement("div", { ref: onRef, className: clsx("group", { disabled: item.disabled }), id: "group_".concat(item.id) }, render(childs))));
            }
            return (React.createElement(Item, __assign({ key: item.id }, commonProps)));
        });
        return React.createElement("div", { className: "group" }, view);
    };
    var menu = useMemo(function () {
        return render(data);
    }, [data, selected, changed]);
    var setRef = function (ref) {
        // handle first render, to process initial states
        if (!ref)
            return;
        if (itemHeight)
            ref.style.setProperty("--item-height", "".concat(itemHeight, "px"));
        if (!once && (ref === null || ref === void 0 ? void 0 : ref.clientHeight) > 0) {
            setOnce(true); // only once ( need to handle "resize" to reset ???? )
            iteratateItems(data, function (item) {
                if (!("collapsed" in item))
                    item.collapsed = item.collapsed || initialCollapsed;
                setCollapse(item);
            });
            if (initialSelected) {
                // will trigger rerender
                selectItem(initialSelected);
            }
            else // trigger rerender
                setChanged(!changed);
        }
    };
    return (React.createElement("div", { className: clsx(classPrefix, theme, "tree-menu"), id: treeID, ref: setRef }, menu));
});
TreeMenu.displayName = "TreeMenu";

export { TreeMenu };
//# sourceMappingURL=index.esm.js.map
