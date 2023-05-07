'use client';

import styles from './error.module.scss';
import { ButtonBase } from '@mui/material';

/**
 * A component that displays an error message and a button to retry a failed operation.
 * @param {Object} props - The props object that contains the error object and the reset handler function.
 * @returns A JSX element that contains a div tag with an error message and a button to retry.
 */
const Error = ({ error, resetHandler }) => {
  return (
    <div className={styles.error}>
      <div className={styles.content}>
        <h2>An Error Has Occured!</h2>
        <p>{error.message}</p>
        <ButtonBase className='btns theme-solid bg-white c-black mt-2' onClick={resetHandler}>
          Retry
        </ButtonBase>
      </div>
    </div>
  );
};

export default Error;
