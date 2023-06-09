import { HeaderComponent } from '@/components/header-component/HeaderComponent';
import '../styles/Master.Style.scss';

/**
 * A layout component that wraps the root of the application and contains a header component and the children components.
 * @param {Object} props - The props object that contains the children components to be rendered.
 * @returns A JSX element that contains an HTML document with a header and the children components.
 */
export const metadata = {
  title: 'Github Search',
  description: 'Github Search application generated by create next app',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en' className='body-wrapper'>
      <body suppressHydrationWarning>
        <HeaderComponent />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
