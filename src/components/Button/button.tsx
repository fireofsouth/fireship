import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
import classnames from 'classnames';
type ButtonSize = 'lg' | 'sm';

type ButtonType = 'primary' | 'default' | 'danger' | 'link';

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
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'fireship'
 * ~~~
 */

export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    className,
    children,
    href,
    ...restProps
  } = props;
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled
  });
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};
export default Button;
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
};
