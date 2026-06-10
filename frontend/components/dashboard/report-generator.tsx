'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { reportAPI } from '@/lib/api-client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FileText, Download } from 'lucide-react';

interface ReportGeneratorProps {
  reportType: 'assets' | 'assignments' | 'maintenance';
  filters?: any;
}

export function ReportGenerator({ reportType, filters }: ReportGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null);

  const generateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (reportType) {
        case 'assets':
          response = await reportAPI.generateAssets(filters);
          break;
        case 'assignments':
          response = await reportAPI.generateAssignments(filters);
          break;
        case 'maintenance':
          response = await reportAPI.generateMaintenance();
          break;
      }
      setReportData(response);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to generate report';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!reportData) return;

    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let currentY = 10;

      // Title
      pdf.setFontSize(16);
      pdf.text(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, pageWidth / 2, currentY, {
        align: 'center',
      });
      currentY += 15;

      // Date
      pdf.setFontSize(10);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 10, currentY);
      currentY += 10;

      // Table headers
      pdf.setFont('', 'bold');
      const columns = Object.keys(reportData.data[0] || {}).slice(0, 5);
      const columnWidth = (pageWidth - 20) / columns.length;

      columns.forEach((col, index) => {
        pdf.text(col, 10 + index * columnWidth, currentY);
      });

      currentY += 10;
      pdf.setFont('', 'normal');

      // Table data
      reportData.data.forEach((row: any, index: number) => {
        if (currentY > pageHeight - 20) {
          pdf.addPage();
          currentY = 10;
        }

        columns.forEach((col, colIndex) => {
          const text = String(row[col] || '').substring(0, 20);
          pdf.text(text, 10 + colIndex * columnWidth, currentY);
        });

        currentY += 10;
      });

      pdf.save(`${reportType}-report-${new Date().getTime()}.pdf`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to download PDF';
      setError(errorMsg);
    }
  };

  const downloadCSV = () => {
    if (!reportData || !reportData.data.length) return;

    try {
      const headers = Object.keys(reportData.data[0]);
      const csvContent = [
        headers.join(','),
        ...reportData.data.map((row: any) =>
          headers.map((header) => JSON.stringify(row[header] || '')).join(',')
        ),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-report-${new Date().getTime()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to download CSV';
      setError(errorMsg);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Generate {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
        </CardTitle>
        <CardDescription>Export data as PDF or CSV</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

        {!reportData ? (
          <Button onClick={generateReport} disabled={loading} className="w-full">
            {loading ? 'Generating...' : 'Generate Report'}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                Report ready with {reportData.data.length} records
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={downloadPDF} className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button onClick={downloadCSV} variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download CSV
              </Button>
            </div>

            <Button onClick={() => setReportData(null)} variant="secondary" className="w-full">
              Generate New Report
            </Button>

            <div className="mt-6 max-h-96 overflow-y-auto">
              <h3 className="font-semibold mb-2">Preview</h3>
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    {Object.keys(reportData.data[0] || {})
                      .slice(0, 5)
                      .map((header) => (
                        <th key={header} className="border p-2 text-left">
                          {header}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.data.slice(0, 10).map((row: any, index: number) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      {Object.keys(row)
                        .slice(0, 5)
                        .map((key) => (
                          <td key={key} className="border p-2 text-sm">
                            {String(row[key]).substring(0, 30)}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
