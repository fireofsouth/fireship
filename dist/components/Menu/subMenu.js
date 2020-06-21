var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    var opendSubMenus = context.defaultOpenSubMenus;
    var isOpend = index && context.mode === 'vertical'
        ? opendSubMenus.includes(index)
        : false;
    var _b = useState(isOpend), menuOpen = _b[0], setOpen = _b[1];
    var classes = classnames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical'
        ? {
            onClick: handleClick
        }
        : {};
    var hoverEvents = context.mode === 'horizontal'
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            }
        }
        : {};
    var renderChildren = function () {
        var subMenuClasses = classnames('fire-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                console.error('warning: Submenu has a child which is not a menuItem component');
            }
        });
        return (React.createElement(CSSTransition, { in: menuOpen, timeout: 300, classNames: 'zoom-in-top', appear: true, unmountOnExit: true },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: 'submenu-title' }, clickEvents),
            title,
            React.createElement(Icon, { icon: 'angle-down', className: 'arrow-icon' })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
