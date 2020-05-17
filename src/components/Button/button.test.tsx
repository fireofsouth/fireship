import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';
const defaultProps = {
  onClick: jest.fn()
};
const testPorps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'lele'
};
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
};
describe('test Button componnet', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>nice</Button>);
    const element = wrapper.getByText('nice');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testPorps}>nice</Button>);
    const element = wrapper.getByText('nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg lele');
  });
  it('should render a link when btnType equal link and href is provided', () => {
    const wrapper = render(
      <Button btnType={'link'} href='http://www.baidu.com'>
        Link
      </Button>
    );
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>nice</Button>);
    const element = wrapper.getByText('nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
