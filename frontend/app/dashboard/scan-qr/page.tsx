'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { TopNavbar } from '@/components/dashboard/top-navbar';
import { BarcodeScanner } from '@/components/dashboard/barcode-scanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ScanQRPage() {
  const router = useRouter();
  const [scannedAsset, setScannedAsset] = useState<any>(null);

  const handleScanSuccess = (data: any) => {
    setScannedAsset(data);
  };

  const handleScanError = (error: string) => {
    console.error('Scan error:', error);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Scan Barcode</h1>
              <p className="text-gray-600 mt-2">Use your camera or enter barcode manually to locate assets</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BarcodeScanner
                  onScanSuccess={handleScanSuccess}
                  onScanError={handleScanError}
                />
              </div>

              {scannedAsset && (
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Details</CardTitle>
                    <CardDescription>Information for scanned asset</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Asset ID</label>
                      <p className="text-gray-900">{scannedAsset.assetId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">{scannedAsset.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-gray-900">{scannedAsset.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <p className={`font-semibold ${
                        scannedAsset.status === 'Assigned' ? 'text-green-600' :
                        scannedAsset.status === 'Available' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {scannedAsset.status}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Serial Number</label>
                      <p className="text-gray-900">{scannedAsset.serialNumber}</p>
                    </div>
                    {scannedAsset.assignedTo && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Assigned To</label>
                        <p className="text-gray-900">{scannedAsset.assignedTo}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="text-gray-900">{scannedAsset.location}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
