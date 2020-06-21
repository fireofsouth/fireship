import React, { useState } from 'react';
import classnames from 'classnames';
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var klass = classnames('fire-uploader-dragger', {
        'is-dragover': dragOver
    });
    var handlerDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    var handlerDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: klass, onDragOver: function (e) {
            handlerDrag(e, true);
        }, onDragLeave: function (e) {
            handlerDrag(e, false);
        }, onDrop: function (e) {
            handlerDrop(e);
        } }, children));
};
export default Dragger;
