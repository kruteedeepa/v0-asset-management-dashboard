"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { toast } from "@/lib/toast";
import { Plus, CheckCircle } from "lucide-react";

interface Return {
  id: string;
  assetId: string;
  assetName: string;
  employeeName: string;
  returnDate: string;
  condition: "Good" | "Fair" | "Damaged";
  notes: string;
}

export default function ReturnAssetsPage() {
  const [returns, setReturns] = useState<Return[]>([
    {
      id: "1",
      assetId: "A1002",
      assetName: "HP LaserJet Pro",
      employeeName: "Mike Johnson",
      returnDate: "2024-02-15",
      condition: "Good",
      notes: "Returned in good condition",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    assetId: "",
    assetName: "",
    employeeName: "",
    returnDate: new Date().toISOString().split("T")[0],
    condition: "Good",
    notes: "",
  });

  const handleOpenModal = () => {
    setFormData({
      assetId: "",
      assetName: "",
      employeeName: "",
      returnDate: new Date().toISOString().split("T")[0],
      condition: "Good",
      notes: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newReturn: Return = {
        id: Math.random().toString(),
        ...formData,
        condition: formData.condition as Return["condition"],
      };
      setReturns([...returns, newReturn]);
      toast.success("Asset return recorded successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to record return");
    } finally {
      setIsLoading(false);
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Good":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Good</span>;
      case "Fair":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Fair</span>;
      case "Damaged":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Damaged</span>;
      default:
        return condition;
    }
  };

  const columns = [
    { key: "assetId" as const, label: "Asset ID" },
    { key: "assetName" as const, label: "Asset Name", sortable: true },
    { key: "employeeName" as const, label: "Returned By", sortable: true },
    { key: "returnDate" as const, label: "Return Date" },
    {
      key: "condition" as const,
      label: "Condition",
      render: (value: string) => getConditionColor(value),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Returns</h1>
          <p className="text-gray-500 mt-1">Record asset returns from employees</p>
        </div>
        <Button onClick={handleOpenModal} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Record Return
        </Button>
      </div>

      <DataTable
        data={returns}
        columns={columns}
        searchKey="assetName"
        actions={(returnItem) => (
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </button>
        )}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Record Asset Return"
        description="Record an asset return from an employee"
        onSubmit={handleSubmit}
        submitLabel="Record Return"
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
              placeholder="Dell Latitude 5440"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee Name</label>
            <Input
              value={formData.employeeName}
              onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Return Date</label>
            <Input
              type="date"
              value={formData.returnDate}
              onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Asset Condition</label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes about the return"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
