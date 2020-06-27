import React from 'react'

import { storiesOf }  from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 fireship 组件库</h1>
        <p>fireship 用起来</p>
        <h3>安装试试</h3>
        <code>
          npm install fireship --save
        </code>
      </>
    )
  }, { info : { disable: true }})