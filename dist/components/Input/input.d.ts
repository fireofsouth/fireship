import { FC, ReactElement, InputHTMLAttributes, ChangeEvent, CSSProperties } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    style?: CSSProperties;
    /**是否禁用input */
    disabled?: boolean;
    /**设置 input 大小, 支持lg 或者 sm */
    size?: InputSize;
    /** 添加图标，右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀 */
    prepend?: string | ReactElement;
    /**添加后缀 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'fireship'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export declare const Input: FC<InputProps>;
export default Input;
