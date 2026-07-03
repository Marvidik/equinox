'use client';
import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function EquinoxAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/equinoxadmin/login') {
    return <>{children}</>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
