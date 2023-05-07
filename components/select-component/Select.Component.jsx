import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CircularProgress, FormHelperText } from '@mui/material';
import './Select.Style.scss';

export const SelectComponent = ({
  data,
  onSelectChanged,
  wrapperClasses,
  menuClasses,
  defaultValue,
  keyValue,
  textInput,
  value,
  valueInput,
  emptyItem,
  keyLoopBy,
  isRequired,
  idRef,
  labelClasses,
  labelValue,
  variant,
  multiple,
  error,
  helperText,
  isWithError,
  onSelectBlur,
  isSubmitted,
  isOpen,
  onOpen,
  onClose,
  overInputText,
  overInputTextIcon,
  placeholder,
  dropdownIcon,
  renderValue,
  isDisabled,
  startAdornment,
  endAdornment,
  themeClass,
  isLoading,
}) => {
  const [isBlurOrChanged, setIsBlurOrChanged] = useState(false);

  return (
    <FormControl
      className={`select-wrapper ${wrapperClasses} ${themeClass}${
        (startAdornment && ' with-start-andorment') || ''
      }${value && (!emptyItem || value !== emptyItem.value) ? ' select-filled' : ''}${
        ((overInputText || overInputTextIcon) && ' over-input-text-wrapper') || ''
      }`}
    >
      {labelValue && (
        <label
          htmlFor={idRef}
          className={`label-wrapper ${labelClasses}${isDisabled ? ' disabled' : ''}`}
        >
          {labelValue}
        </label>
      )}
      <div className='select-body-wrapper'>
        {(overInputText || overInputTextIcon) && (
          <span className='over-input-text'>
            {overInputTextIcon && <span className={overInputTextIcon} />}
            {overInputText || ''}
          </span>
        )}
        <Select
          labelId={`${idRef}-label`}
          id={idRef}
          value={value}
          disabled={isDisabled}
          open={isOpen}
          onOpen={onOpen}
          placeholder={placeholder || undefined}
          onClose={onClose}
          multiple={multiple}
          defaultValue={defaultValue}
          onChange={
            ((onSelectChanged || isWithError) &&
              ((event) => {
                if (!isBlurOrChanged) setIsBlurOrChanged(true);
                if (onSelectChanged) onSelectChanged(event.target.value);
              })) ||
            undefined
          }
          renderValue={renderValue}
          className='selects'
          onBlur={(event) => {
            setIsBlurOrChanged(true);
            if (onSelectBlur) onSelectBlur(event);
          }}
          error={
            (isWithError && (isBlurOrChanged || isSubmitted) && error) ||
            (!isWithError && !isBlurOrChanged && error)
          }
          startAdornment={startAdornment}
          endAdornment={
            (isLoading && !endAdornment && <CircularProgress color='inherit' size={20} />) ||
            endAdornment
          }
          MenuProps={{
            className: `select-menu-wrapper ${menuClasses} ${themeClass}`,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
          displayEmpty
          required={isRequired}
          variant={variant}
          IconComponent={() => <span className='mdi mdi-chevron-down pr-2' />}
          inputProps={{ readOnly: false }}
        >
          {emptyItem && (
            <MenuItem
              style={emptyItem.isHiddenOnOpen ? { display: 'none' } : {}}
              value={emptyItem.value}
              disabled={emptyItem.isDisabled}
            >
              {emptyItem.text}
            </MenuItem>
          )}

          {data.map((item, index) => (
            <MenuItem
              style={item.isHiddenOnOpen ? { display: 'none' } : {}}
              value={valueInput ? item[valueInput] : item}
              key={keyLoopBy && keyValue ? keyValue + item[keyLoopBy] : `selection${index + 1}`}
            >
              <span className='menu-item-first-char'>
                {`${(textInput ? item[textInput] : item).slice(0, 1)}`}
              </span>
              <span className='menu-item-text'>
                {`${(textInput ? item[textInput] : item).slice(1)}`}
              </span>
            </MenuItem>
          ))}
        </Select>
      </div>
      {helperText &&
        ((isWithError && (isBlurOrChanged || isSubmitted) && error && (
          <FormHelperText>{helperText}</FormHelperText>
        )) ||
          (!isWithError && <FormHelperText>{helperText || ''}</FormHelperText>))}
    </FormControl>
  );
};
