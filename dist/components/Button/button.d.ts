import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
declare type ButtonSize = 'lg' | 'sm';
declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /**
     * 设置Button的禁用
     */
    disabled?: boolean;
    /**
     * Button的尺寸
     */
    size?: ButtonSize;
    /**
     * Button的类型
     */
    btnType?: ButtonType;
    /**
     * Button的大小
     */
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'fireship'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
