var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutSide from '../../hooks/useClickOutSide';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputeValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(-1), highlightIndex = _e[0], setHightlightIndex = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 500);
    useClickOutSide(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current === true) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setSuggestions([]);
            setShowDropdown(false);
        }
        setHightlightIndex(-1);
    }, [fetchSuggestions, debouncedValue]);
    var hightlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHightlightIndex(index);
    };
    var handleKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                hightlight(highlightIndex - 1);
                break;
            case 40:
                hightlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputeValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputeValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplete = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: 'zoom-in-top', timeout: 300, onExited: function () {
                setSuggestions([]);
            } },
            React.createElement("ul", { className: 'fire-suggestion-list' },
                loading && (React.createElement("div", { className: 'suggstions-loading-icon' },
                    React.createElement(Icon, { icon: 'spinner', spin: true }))),
                suggestions.map(function (item, index) {
                    var cnames = classnames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (React.createElement("li", { className: cnames, key: index, onClick: function () {
                            handleSelect(item);
                        } }, renderTemplete(item)));
                }))));
    };
    return (React.createElement("div", { className: 'fire-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
