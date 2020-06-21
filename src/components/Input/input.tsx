import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
  CSSProperties
} from 'react';
import classnames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
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

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const cnames = classnames('fire-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  };
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    //根据属性判断是否要添加特定的节点
    <div className={cnames} style={style}>
      {prepend && <div className='fire-input-group-prepend'>{prepend}</div>}
      {icon && (
        <div className='icon-wrapper'>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className='fire-input-inner' disabled={disabled} {...restProps} />
      {append && <div className='fire-input-group-append'>{append}</div>}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
