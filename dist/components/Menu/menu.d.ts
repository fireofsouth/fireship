import React from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    defaultOpenSubMenus?: string[];
    onSelect?: SelectCallback;
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
/**
 * 支持横向以及纵向的展示
 * ### 引用方法
 *
 * ~~~js
 * import { Menu } from 'fireship'
 * ~~~
 */
export declare const Menu: React.FC<MenuProps>;
export default Menu;
