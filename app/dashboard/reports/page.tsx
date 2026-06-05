'use client';

import { useState } from 'react';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { TopNavbar } from '@/components/dashboard/top-navbar';
import { ReportGenerator } from '@/components/dashboard/report-generator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Generate Reports</h1>
              <p className="text-gray-600 mt-2">Export asset data and generate comprehensive reports</p>
            </div>

            <Tabs defaultValue="assets" className="space-y-6">
              <TabsList>
                <TabsTrigger value="assets">Assets Report</TabsTrigger>
                <TabsTrigger value="assignments">Assignments Report</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance Report</TabsTrigger>
              </TabsList>

              <TabsContent value="assets">
                <ReportGenerator reportType="assets" />
              </TabsContent>

              <TabsContent value="assignments">
                <ReportGenerator reportType="assignments" />
              </TabsContent>

              <TabsContent value="maintenance">
                <ReportGenerator reportType="maintenance" />
              </TabsContent>
            </Tabs>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Report Guide</CardTitle>
                <CardDescription>How to use the report generation system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Assets Report</h3>
                  <p className="text-gray-600 text-sm">
                    View all assets in your inventory with their status, category, serial numbers, and location information.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Assignments Report</h3>
                  <p className="text-gray-600 text-sm">
                    Track asset assignments to employees, including assignment dates, return status, and assignment reasons.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Maintenance Report</h3>
                  <p className="text-gray-600 text-sm">
                    View all assets currently in maintenance along with their details and maintenance history.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
