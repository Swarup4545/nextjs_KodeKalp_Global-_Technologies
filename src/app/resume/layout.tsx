import { Suspense } from 'react';

const Loading = () => <p>Loading...</p>;

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}
