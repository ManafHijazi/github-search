import React, { memo, useCallback, useEffect, useState } from 'react';
import { ButtonBase, FormControl, TextField } from '@mui/material';
import './Inputs.Style.scss';

export const Inputs = memo(
  ({
    autoFocus,
    value,
    isRequired,
    isDisabled,
    idRef,
    onInputChanged,
    fieldClasses,
    wrapperClasses,
    labelClasses,
    labelValue,
    error,
    helperText,
    withLoader,
    autoCompleteParams,
    isLoading,
    variant,
    label,
    inputPlaceholder,
    rows,
    multiline,
    type,
    onInputBlur,
    onKeyUp,
    onKeyDown,
    buttonOptions,
    max,
    maxLength,
    min,
    minLength,
    step,
    endAdornment,
    startAdornment,
    beforeIconClasses,
    afterIconClasses,
    multiple,
    refs,
    inputRef,
    isSubmitted,
    overInputText,
    paddingReverse,
    overInputIcon,
    themeClass,
    defaultValue,
    charactersCounterClasses,
    isWithCharactersCounter,
    onInputFocus,
    onInputClick,
    autoComplete,
    maxNumber,
    maxLabel,
    maxLabelClasses,
    onAdornmentsChanged,
    pattern,
    tabIndex,
  }) => {
    const [isBlurOrChanged, setIsBlurOrChanged] = useState(false);
    /**
     * @author Manaf Hijazi (manafhijazii@gmail.com)
     * @Description method to call onAdornmentsChanged to make parent know that
     * adornments changed
     */
    const onAdornmentsChangedHandler = useCallback(() => {
      onAdornmentsChanged();
    }, [onAdornmentsChanged]);

    useEffect(() => {
      setIsBlurOrChanged(false);
    }, [isSubmitted]);
    useEffect(() => {
      if ((endAdornment || startAdornment) && onAdornmentsChanged) onAdornmentsChangedHandler();
    }, [endAdornment, onAdornmentsChanged, onAdornmentsChangedHandler, startAdornment]);

    return (
      <FormControl
        className={`input-wrapper ${wrapperClasses}${
          (startAdornment && ' with-start-andorment') || ''
        } ${themeClass}`}
        ref={refs}>
        {(labelValue || maxNumber !== undefined) && (
          <div className='labels-wrapper'>
            {labelValue && (
              <label
                htmlFor={idRef}
                className={`label-wrapper ${labelClasses}${isDisabled ? ' disabled' : ''}`}>
                {labelValue}
              </label>
            )}
            {maxNumber !== undefined && (
              <label
                htmlFor={idRef}
                className={`max-label-wrapper ${maxLabelClasses || ''}${
                  isDisabled ? ' disabled' : ''
                }`}>
                <span>{maxLabel}</span>
                <span className='px-1'>{maxNumber}</span>
              </label>
            )}
          </div>
        )}
        <div
          className={`w-100 p-relative ${
            (isWithCharactersCounter && 'd-flex flex-wrap') || 'd-flex-center'
          }`}>
          {beforeIconClasses && (
            <span className={`before-icon-classes-wrapper ${beforeIconClasses}`} />
          )}
          {(overInputText || overInputIcon) && (
            <span className='over-input-wrapper'>
              {overInputIcon && <span className={overInputIcon} />}
              {overInputText && overInputText}
            </span>
          )}
          <div className='text-field-wrapper'>
            <TextField
              {...autoCompleteParams}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              required={isRequired}
              ref={inputRef}
              disabled={isDisabled}
              className={`inputs ${fieldClasses}`}
              style={{
                paddingLeft: paddingReverse,
              }}
              id={idRef}
              onFocus={onInputFocus}
              label={label}
              placeholder={inputPlaceholder && `${inputPlaceholder} ${isRequired ? '*' : ''}`}
              variant={variant}
              helperText={(helperText && isSubmitted && error && helperText) || undefined}
              value={type === 'number' ? Number(value).toString() : value}
              defaultValue={defaultValue}
              error={(isSubmitted && error) || false}
              rows={rows}
              onClick={onInputClick}
              onKeyUp={onKeyUp}
              onKeyDown={onKeyDown}
              type={type}
              multiline={multiline}
              onChange={
                ((onInputChanged || error) &&
                  ((event) => {
                    if (!isBlurOrChanged) setIsBlurOrChanged(true);
                    if (onInputChanged) {
                      const { value } = event.target;
                      const localValue = value;

                      if (pattern && localValue && !pattern.test(localValue)) return;
                      onInputChanged(event);
                    }
                  })) ||
                undefined
              }
              onBlur={(event) => {
                if (!isBlurOrChanged) setIsBlurOrChanged(true);
                if (onInputBlur) {
                  const localValue = event.target.value;
                  if (pattern && localValue && !pattern.test(localValue)) return;
                  onInputBlur(event);
                }
              }}
            />
            {afterIconClasses && (
              <span className={`after-icon-classes-wrapper ${afterIconClasses}`} />
            )}
            {buttonOptions && (
              <ButtonBase
                className={`ml-2-reversed mt-1 ${buttonOptions.className}`}
                onClick={buttonOptions.onActionClicked}
                disabled={buttonOptions.isDisabled}>
                <span className={buttonOptions.iconClasses} />
              </ButtonBase>
            )}
          </div>
          {isWithCharactersCounter && (
            <div className={`characters-counter-wrapper ${charactersCounterClasses}`}>
              <span>{(value && value.length) || (defaultValue && defaultValue.length) || 0}</span>
              <span className='px-1'>Characters</span>
            </div>
          )}
        </div>
      </FormControl>
    );
  }
);
