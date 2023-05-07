import Image from 'next/image';
import styles from './header.module.scss';

/**
 * A component that displays the header of the application, including the Github logo and the application name.
 * @returns A JSX element that contains a div tag with an Image tag and a text node.
 */
export const HeaderComponent = () => {
  return (
    <div className={styles.header}>
      <Image
        priority
        width={40}
        height={30}
        alt='github'
        src='/images/github.png'
        className={styles.logo}
      />
      Github Search
    </div>
  );
};
