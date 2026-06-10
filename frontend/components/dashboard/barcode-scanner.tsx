'use client';

import { useRef, useEffect, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { assetAPI } from '@/lib/api-client';

interface BarcodeScannerProps {
  onScanSuccess?: (data: any) => void;
  onScanError?: (error: string) => void;
}

export function BarcodeScanner({ onScanSuccess, onScanError }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [scannedData, setScannedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startScanning = async () => {
    try {
      setError(null);
      const codeReader = new BrowserQRCodeReader();
      const videoElement = videoRef.current;

      if (!videoElement) return;

      setIsScanning(true);
      const result = await codeReader.decodeFromVideoDevice(undefined, videoElement);

      if (result) {
        handleScannedBarcode(result.getText());
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to start camera';
      setError(errorMsg);
      setIsScanning(false);
      onScanError?.(errorMsg);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleScannedBarcode = async (barcode: string) => {
    setLoading(true);
    try {
      const data = await assetAPI.scanBarcode(barcode);
      setScannedData(data);
      onScanSuccess?.(data);
      stopScanning();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Asset not found';
      setError(errorMsg);
      onScanError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      handleScannedBarcode(manualBarcode);
      setManualBarcode('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Barcode</CardTitle>
        <CardDescription>Use your camera to scan asset barcodes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

        <div className="space-y-2">
          <video
            ref={videoRef}
            className={`w-full rounded-lg border-2 border-gray-300 ${isScanning ? 'block' : 'hidden'}`}
            style={{ maxHeight: '400px' }}
          />
          {!isScanning && !scannedData && (
            <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Camera feed will appear here</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!isScanning ? (
            <Button onClick={startScanning} className="flex-1">
              Start Scanning
            </Button>
          ) : (
            <Button onClick={stopScanning} variant="destructive" className="flex-1">
              Stop Scanning
            </Button>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or enter manually</span>
          </div>
        </div>

        <form onSubmit={handleManualSubmit} className="space-y-2">
          <Input
            placeholder="Enter barcode manually"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            disabled={isScanning}
          />
          <Button type="submit" className="w-full" disabled={isScanning || loading}>
            {loading ? 'Scanning...' : 'Search Asset'}
          </Button>
        </form>

        {scannedData && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Asset Found</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Asset ID:</strong> {scannedData.assetId}</p>
              <p><strong>Name:</strong> {scannedData.name}</p>
              <p><strong>Category:</strong> {scannedData.category}</p>
              <p><strong>Status:</strong> {scannedData.status}</p>
              <p><strong>Serial:</strong> {scannedData.serialNumber}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
