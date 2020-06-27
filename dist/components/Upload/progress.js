import React from 'react';
var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return React.createElement("div", { className: 'fire-progress-bar' });
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
};
