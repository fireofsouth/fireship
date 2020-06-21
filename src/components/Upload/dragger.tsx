import React, { FC, useState, DragEvent } from 'react';

import classnames from 'classnames';
interface DragProps {
  onFile: (file: FileList) => void;
}
export const Dragger: FC<DragProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const klass = classnames('fire-uploader-dragger', {
    'is-dragover': dragOver
  });
  const handlerDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handlerDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={klass}
      onDragOver={(e) => {
        handlerDrag(e, true);
      }}
      onDragLeave={(e) => {
        handlerDrag(e, false);
      }}
      onDrop={(e) => {
        handlerDrop(e);
      }}
    >
      {children}
    </div>
  );
};

export default Dragger;
