import {Header} from '@/src/components/layout/header';
import {Footer} from '@/src/components/layout/footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({children}: Readonly<MainLayoutProps>) {
  return (
    <>
      <Header variant="default" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
