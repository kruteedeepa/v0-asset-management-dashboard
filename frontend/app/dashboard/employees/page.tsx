"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { toast } from "@/lib/toast";
import { Edit2, Trash2, Plus } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  phone: string;
  joinDate: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      department: "IT",
      position: "Software Engineer",
      phone: "+1-555-0101",
      joinDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "HR",
      position: "HR Manager",
      phone: "+1-555-0102",
      joinDate: "2023-05-20",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    joinDate: "",
  });

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setSelectedEmployee(employee);
      setFormData({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        position: employee.position,
        phone: employee.phone,
        joinDate: employee.joinDate,
      });
    } else {
      setSelectedEmployee(null);
      setFormData({
        name: "",
        email: "",
        department: "",
        position: "",
        phone: "",
        joinDate: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedEmployee) {
        setEmployees(
          employees.map((emp) =>
            emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
          )
        );
        toast.success("Employee updated successfully");
      } else {
        const newEmployee: Employee = {
          id: Math.random().toString(),
          ...formData,
        };
        setEmployees([...employees, newEmployee]);
        toast.success("Employee added successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save employee");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    setIsLoading(true);

    try {
      setEmployees(employees.filter((e) => e.id !== selectedEmployee.id));
      toast.success("Employee deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete employee");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: "name" as const, label: "Name", sortable: true },
    { key: "email" as const, label: "Email", sortable: true },
    { key: "department" as const, label: "Department", sortable: true },
    { key: "position" as const, label: "Position" },
    { key: "phone" as const, label: "Phone" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees Management</h1>
          <p className="text-gray-500 mt-1">Manage employee directory</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <DataTable
        data={employees}
        columns={columns}
        searchKey="name"
        actions={(employee) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenModal(employee)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => {
                setSelectedEmployee(employee);
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
        title={selectedEmployee ? "Edit Employee" : "Add New Employee"}
        description={selectedEmployee ? "Update employee information" : "Add a new employee to the system"}
        onSubmit={handleSubmit}
        submitLabel={selectedEmployee ? "Update" : "Add"}
        isLoading={isLoading}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <Input
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="Software Engineer"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1-555-0101"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Join Date</label>
            <Input
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              required
            />
          </div>
        </div>
      </FormModal>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Employee"
        description={`Are you sure you want to delete ${selectedEmployee?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
