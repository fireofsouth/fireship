import React, { useEffect } from 'react';
import axios from 'axios';
var App = function () {
    var formData = {
        title: '11'
    };
    useEffect(function () {
        axios
            .post('/posts', formData)
            .then(function (resp) {
            console.log(resp);
        })
            .catch(function (err) {
            console.log(err);
        });
    }, [formData]);
    return (React.createElement("div", { className: 'App', style: { marginTop: '100px', marginLeft: '100px' } }));
};
export default App;
