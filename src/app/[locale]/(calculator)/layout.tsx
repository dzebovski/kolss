import {Header} from '@/src/components/layout/header';
import {Footer} from '@/src/components/layout/footer';

type CalculatorLayoutProps = {
  children: React.ReactNode;
};

export default async function CalculatorLayout({children}: Readonly<CalculatorLayoutProps>) {
  return (
    <>
      <Header variant="light" />
      <main>{children}</main>
      <Footer />
    </>
  );
}
