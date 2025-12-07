import { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50" data-cy="app-root">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <h1
            className="text-xl font-semibold tracking-tight"
            data-cy="app-title"
          >
            HMCTS Task Manager
          </h1>
          <span className="text-xs text-slate-400">Junior Dev Tech Test</span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4" data-cy="page-title">
          {title}
        </h2>
        {children}
      </main>
    </div>
  );
}
