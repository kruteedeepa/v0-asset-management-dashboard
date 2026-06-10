"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { toast } from "@/lib/toast";
import { Edit2, Trash2, Plus } from "lucide-react";

interface Asset {
  id: string;
  assetId: string;
  name: string;
  category: string;
  serialNumber: string;
  status: "Assigned" | "Available" | "Maintenance";
  assignedTo?: string;
  location: string;
  purchaseDate: string;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "1",
      assetId: "A1001",
      name: "Dell Latitude 5440",
      category: "Laptop",
      serialNumber: "DL5440X123456",
      status: "Assigned",
      assignedTo: "John Doe",
      location: "Office",
      purchaseDate: "2024-01-15",
    },
    {
      id: "2",
      assetId: "P2002",
      name: "HP LaserJet Pro",
      category: "Printer",
      serialNumber: "HPLJ123789",
      status: "Available",
      location: "Office",
      purchaseDate: "2024-02-10",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    serialNumber: "",
    status: "Available",
    assignedTo: "",
    location: "",
    purchaseDate: "",
  });

  const handleOpenModal = (asset?: Asset) => {
    if (asset) {
      setSelectedAsset(asset);
      setFormData({
        name: asset.name,
        category: asset.category,
        serialNumber: asset.serialNumber,
        status: asset.status,
        assignedTo: asset.assignedTo || "",
        location: asset.location,
        purchaseDate: asset.purchaseDate,
      });
    } else {
      setSelectedAsset(null);
      setFormData({
        name: "",
        category: "",
        serialNumber: "",
        status: "Available",
        assignedTo: "",
        location: "",
        purchaseDate: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedAsset) {
        // Update asset
        setAssets(
          assets.map((a) =>
            a.id === selectedAsset.id
              ? { ...a, ...formData }
              : a
          )
        );
        toast.success("Asset updated successfully");
      } else {
        // Create new asset
        const newAsset: Asset = {
          id: Math.random().toString(),
          assetId: `A${Math.floor(Math.random() * 9000) + 1000}`,
          ...formData,
          status: formData.status as Asset["status"],
        };
        setAssets([...assets, newAsset]);
        toast.success("Asset created successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save asset");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAsset) return;
    setIsLoading(true);

    try {
      setAssets(assets.filter((a) => a.id !== selectedAsset.id));
      toast.success("Asset deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete asset");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assigned":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Assigned</span>;
      case "Available":
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Available</span>;
      case "Maintenance":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Maintenance</span>;
      default:
        return status;
    }
  };

  const columns = [
    { key: "assetId" as const, label: "Asset ID", sortable: true },
    { key: "name" as const, label: "Asset Name", sortable: true },
    { key: "category" as const, label: "Category", sortable: true },
    { key: "serialNumber" as const, label: "Serial Number" },
    {
      key: "status" as const,
      label: "Status",
      render: (value: string) => getStatusColor(value),
    },
    { key: "location" as const, label: "Location" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assets Management</h1>
          <p className="text-gray-500 mt-1">Manage all company assets</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </div>

      <DataTable
        data={assets}
        columns={columns}
        searchKey="name"
        actions={(asset) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenModal(asset)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => {
                setSelectedAsset(asset);
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
        title={selectedAsset ? "Edit Asset" : "Add New Asset"}
        description={selectedAsset ? "Update asset information" : "Create a new asset entry"}
        onSubmit={handleSubmit}
        submitLabel={selectedAsset ? "Update" : "Create"}
        isLoading={isLoading}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Asset Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Dell Latitude 5440"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Printer">Printer</option>
              <option value="Monitor">Monitor</option>
              <option value="Accessory">Accessory</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Serial Number</label>
            <Input
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              placeholder="e.g., DL5440X123456"
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
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Office, Warehouse"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
            <Input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              required
            />
          </div>
        </div>
      </FormModal>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Asset"
        description={`Are you sure you want to delete ${selectedAsset?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
