import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ReactElement
} from 'react';
import classnames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutSide from '../../hooks/useClickOutSide';
interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputeValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHightlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutSide(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debouncedValue && triggerSearch.current === true) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(results);
        setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
    setHightlightIndex(-1);
  }, [fetchSuggestions, debouncedValue]);
  const hightlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHightlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputeValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    setInputeValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const renderTemplete = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className='fire-suggestion-list'>
          {loading && (
            <div className='suggstions-loading-icon'>
              <Icon icon='spinner' spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classnames('suggestion-item', {
              'is-active': index === highlightIndex
            });
            return (
              <li
                className={cnames}
                key={index}
                onClick={() => {
                  handleSelect(item);
                }}
              >
                {renderTemplete(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className='fire-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};
export default AutoComplete;
