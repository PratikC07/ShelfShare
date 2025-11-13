export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/4 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/30"></div>
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-500/30"></div>
      </div>

      <main className="flex w-full max-w-md flex-col">{children}</main>
    </div>
  );
}
