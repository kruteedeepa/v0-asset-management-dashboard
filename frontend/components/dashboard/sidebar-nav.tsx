"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Box,
  Grid3x3,
  Users,
  Truck,
  Link2,
  Undo,
  Wrench,
  QrCode,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
  { label: "Assets", href: "/dashboard/assets", icon: <Box className="w-5 h-5" /> },
  { label: "Categories", href: "/dashboard/categories", icon: <Grid3x3 className="w-5 h-5" /> },
  { label: "Employees", href: "/dashboard/employees", icon: <Users className="w-5 h-5" /> },
  { label: "Vendors", href: "/dashboard/vendors", icon: <Truck className="w-5 h-5" /> },
  { label: "Asset Assignment", href: "/dashboard/asset-assignment", icon: <Link2 className="w-5 h-5" /> },
  { label: "Return Assets", href: "/dashboard/return-assets", icon: <Undo className="w-5 h-5" /> },
  { label: "Maintenance", href: "/dashboard/maintenance", icon: <Wrench className="w-5 h-5" /> },
  { label: "QR Scanner", href: "/dashboard/scan-qr", icon: <QrCode className="w-5 h-5" /> },
  { label: "Reports", href: "/dashboard/reports", icon: <FileText className="w-5 h-5" /> },
  { label: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href !== "/dashboard" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-slate-900 text-white flex flex-col z-50">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">
            AMS
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-300">ASSET</span>
            <span className="text-xs font-semibold text-gray-300">MANAGEMENT</span>
          </div>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Section */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-900 hover:bg-blue-800 transition-colors text-sm font-medium">
          <HelpCircle className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold">Need Help?</div>
            <div className="text-xs text-gray-300">Contact Administrator</div>
          </div>
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors text-sm font-medium">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
