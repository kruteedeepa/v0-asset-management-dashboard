"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { toast } from "@/lib/toast";
import { Edit2, Trash2, Plus } from "lucide-react";

interface Assignment {
  id: string;
  assetName: string;
  assetId: string;
  employeeName: string;
  assignedDate: string;
  expectedReturnDate: string;
  status: "Active" | "Returned" | "Pending";
}

export default function AssetAssignmentPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      assetName: "Dell Latitude 5440",
      assetId: "A1001",
      employeeName: "John Doe",
      assignedDate: "2024-01-15",
      expectedReturnDate: "2025-01-15",
      status: "Active",
    },
    {
      id: "2",
      assetName: "MacBook Pro 14",
      assetId: "A1003",
      employeeName: "Mary Smith",
      assignedDate: "2024-02-01",
      expectedReturnDate: "2025-02-01",
      status: "Active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [formData, setFormData] = useState({
    assetId: "",
    assetName: "",
    employeeName: "",
    assignedDate: "",
    expectedReturnDate: "",
    status: "Active",
  });

  const handleOpenModal = (assignment?: Assignment) => {
    if (assignment) {
      setSelectedAssignment(assignment);
      setFormData({
        assetId: assignment.assetId,
        assetName: assignment.assetName,
        employeeName: assignment.employeeName,
        assignedDate: assignment.assignedDate,
        expectedReturnDate: assignment.expectedReturnDate,
        status: assignment.status,
      });
    } else {
      setSelectedAssignment(null);
      setFormData({
        assetId: "",
        assetName: "",
        employeeName: "",
        assignedDate: "",
        expectedReturnDate: "",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedAssignment) {
        setAssignments(
          assignments.map((a) =>
            a.id === selectedAssignment.id
              ? {
                  ...a,
                  ...formData,
                  status: formData.status as Assignment["status"],
                }
              : a
          )
        );
        toast.success("Assignment updated successfully");
      } else {
        const newAssignment: Assignment = {
          id: Math.random().toString(),
          ...formData,
          status: formData.status as Assignment["status"],
        };
        setAssignments([...assignments, newAssignment]);
        toast.success("Asset assigned successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save assignment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAssignment) return;
    setIsLoading(true);

    try {
      setAssignments(assignments.filter((a) => a.id !== selectedAssignment.id));
      toast.success("Assignment deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete assignment");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Active</span>;
      case "Returned":
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Returned</span>;
      case "Pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>;
      default:
        return status;
    }
  };

  const columns = [
    { key: "assetId" as const, label: "Asset ID" },
    { key: "assetName" as const, label: "Asset Name", sortable: true },
    { key: "employeeName" as const, label: "Employee", sortable: true },
    { key: "assignedDate" as const, label: "Assigned Date" },
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
          <h1 className="text-3xl font-bold text-gray-900">Asset Assignment</h1>
          <p className="text-gray-500 mt-1">Manage asset assignments to employees</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Assign Asset
        </Button>
      </div>

      <DataTable
        data={assignments}
        columns={columns}
        searchKey="assetName"
        actions={(assignment) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenModal(assignment)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => {
                setSelectedAssignment(assignment);
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
        title={selectedAssignment ? "Edit Assignment" : "Assign Asset"}
        description={selectedAssignment ? "Update assignment details" : "Assign an asset to an employee"}
        onSubmit={handleSubmit}
        submitLabel={selectedAssignment ? "Update" : "Assign"}
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
            <label className="block text-sm font-medium text-gray-700">Assigned Date</label>
            <Input
              type="date"
              value={formData.assignedDate}
              onChange={(e) => setFormData({ ...formData, assignedDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Return Date</label>
            <Input
              type="date"
              value={formData.expectedReturnDate}
              onChange={(e) => setFormData({ ...formData, expectedReturnDate: e.target.value })}
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
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>
      </FormModal>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Assignment"
        description={`Are you sure you want to delete this assignment for ${selectedAssignment?.assetName}?`}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
