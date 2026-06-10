"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { toast } from "@/lib/toast";
import { Edit2, Trash2, Plus } from "lucide-react";

interface MaintenanceRecord {
  id: string;
  assetId: string;
  assetName: string;
  maintenanceDate: string;
  maintenanceType: string;
  vendor: string;
  cost: number;
  status: "Completed" | "Pending" | "In Progress";
  nextScheduleDate: string;
}

export default function MaintenancePage() {
  const [records, setRecords] = useState<MaintenanceRecord[]>([
    {
      id: "1",
      assetId: "A1001",
      assetName: "Dell Latitude 5440",
      maintenanceDate: "2024-02-10",
      maintenanceType: "Software Update",
      vendor: "Dell Support",
      cost: 0,
      status: "Completed",
      nextScheduleDate: "2024-08-10",
    },
    {
      id: "2",
      assetId: "P2002",
      assetName: "HP LaserJet Pro",
      maintenanceDate: "2024-02-15",
      maintenanceType: "Toner Replacement",
      vendor: "HP Service",
      cost: 150,
      status: "Completed",
      nextScheduleDate: "2024-05-15",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);
  const [formData, setFormData] = useState({
    assetId: "",
    assetName: "",
    maintenanceDate: "",
    maintenanceType: "",
    vendor: "",
    cost: "",
    status: "Pending",
    nextScheduleDate: "",
  });

  const handleOpenModal = (record?: MaintenanceRecord) => {
    if (record) {
      setSelectedRecord(record);
      setFormData({
        assetId: record.assetId,
        assetName: record.assetName,
        maintenanceDate: record.maintenanceDate,
        maintenanceType: record.maintenanceType,
        vendor: record.vendor,
        cost: record.cost.toString(),
        status: record.status,
        nextScheduleDate: record.nextScheduleDate,
      });
    } else {
      setSelectedRecord(null);
      setFormData({
        assetId: "",
        assetName: "",
        maintenanceDate: "",
        maintenanceType: "",
        vendor: "",
        cost: "",
        status: "Pending",
        nextScheduleDate: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedRecord) {
        setRecords(
          records.map((r) =>
            r.id === selectedRecord.id
              ? {
                  ...r,
                  ...formData,
                  cost: parseFloat(formData.cost),
                  status: formData.status as MaintenanceRecord["status"],
                }
              : r
          )
        );
        toast.success("Maintenance record updated successfully");
      } else {
        const newRecord: MaintenanceRecord = {
          id: Math.random().toString(),
          ...formData,
          cost: parseFloat(formData.cost),
          status: formData.status as MaintenanceRecord["status"],
        };
        setRecords([...records, newRecord]);
        toast.success("Maintenance record created successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save maintenance record");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecord) return;
    setIsLoading(true);

    try {
      setRecords(records.filter((r) => r.id !== selectedRecord.id));
      toast.success("Maintenance record deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete maintenance record");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Completed</span>;
      case "In Progress":
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">In Progress</span>;
      case "Pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>;
      default:
        return status;
    }
  };

  const columns = [
    { key: "assetId" as const, label: "Asset ID" },
    { key: "assetName" as const, label: "Asset Name", sortable: true },
    { key: "maintenanceType" as const, label: "Type", sortable: true },
    { key: "maintenanceDate" as const, label: "Date" },
    { key: "vendor" as const, label: "Vendor" },
    { key: "cost" as const, label: "Cost" },
    {
      key: "status" as const,
      label: "Status",
      render: (value: string) => getStatusColor(value),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Management</h1>
          <p className="text-gray-500 mt-1">Track asset maintenance and repairs</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Maintenance Record
        </Button>
      </div>

      <DataTable
        data={records}
        columns={columns}
        searchKey="assetName"
        actions={(record) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenModal(record)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => {
                setSelectedRecord(record);
                setIsDeleteOpen(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={selectedRecord ? "Edit Maintenance Record" : "Add Maintenance Record"}
        description={selectedRecord ? "Update maintenance details" : "Record a new maintenance activity"}
        onSubmit={handleSubmit}
        submitLabel={selectedRecord ? "Update" : "Add"}
        isLoading={isLoading}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Asset ID</label>
            <Input
              value={formData.assetId}
              onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
              placeholder="A1001"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Asset Name</label>
            <Input
              value={formData.assetName}
              onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
              placeholder="Asset name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maintenance Type</label>
            <select
              value={formData.maintenanceType}
              onChange={(e) => setFormData({ ...formData, maintenanceType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select type</option>
              <option value="Hardware Repair">Hardware Repair</option>
              <option value="Software Update">Software Update</option>
              <option value="Component Replacement">Component Replacement</option>
              <option value="Cleaning & Maintenance">Cleaning & Maintenance</option>
              <option value="Toner Replacement">Toner Replacement</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maintenance Date</label>
            <Input
              type="date"
              value={formData.maintenanceDate}
              onChange={(e) => setFormData({ ...formData, maintenanceDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vendor</label>
            <Input
              value={formData.vendor}
              onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
              placeholder="Vendor name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cost</label>
            <Input
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Next Schedule Date</label>
            <Input
              type="date"
              value={formData.nextScheduleDate}
              onChange={(e) => setFormData({ ...formData, nextScheduleDate: e.target.value })}
              required
            />
          </div>
        </div>
      </FormModal>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Maintenance Record"
        description={`Are you sure you want to delete this maintenance record for ${selectedRecord?.assetName}?`}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
