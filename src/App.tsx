import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import './styles/index.scss';
library.add(fas);

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className='App'>
      <Icon icon='coffee' theme='primary' size='10x' />
      <div>
        <Menu
          defaultIndex={'0'}
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        <Button
          size={'lg'}
          onClick={() => {
            setShow(!show);
          }}
        >
          Toggle
        </Button>
      </div>
    </div>
  );
}

export default App;
