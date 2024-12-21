import '@/app/globals.css'
import '@/app/dashboard/paper-background.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="paper-background min-h-screen">
      <div className="justify-center">
        {children}
      </div>
  </div>
  );
}
