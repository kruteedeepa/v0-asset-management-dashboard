"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { toast } from "@/lib/toast";
import { Edit2, Trash2, Plus } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  contactPerson: string;
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Dell Technologies",
      email: "sales@dell.com",
      phone: "+1-800-DELL",
      address: "123 Technology Drive",
      city: "Round Rock",
      country: "USA",
      contactPerson: "Mike Johnson",
    },
    {
      id: "2",
      name: "HP Inc",
      email: "sales@hp.com",
      phone: "+1-800-HP",
      address: "1501 Page Mill Road",
      city: "Palo Alto",
      country: "USA",
      contactPerson: "Sarah Williams",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    contactPerson: "",
  });

  const handleOpenModal = (vendor?: Vendor) => {
    if (vendor) {
      setSelectedVendor(vendor);
      setFormData({ ...vendor });
    } else {
      setSelectedVendor(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        contactPerson: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedVendor) {
        setVendors(
          vendors.map((v) =>
            v.id === selectedVendor.id ? { ...v, ...formData } : v
          )
        );
        toast.success("Vendor updated successfully");
      } else {
        const newVendor: Vendor = {
          id: Math.random().toString(),
          ...formData,
        };
        setVendors([...vendors, newVendor]);
        toast.success("Vendor added successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save vendor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedVendor) return;
    setIsLoading(true);

    try {
      setVendors(vendors.filter((v) => v.id !== selectedVendor.id));
      toast.success("Vendor deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete vendor");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: "name" as const, label: "Vendor Name", sortable: true },
    { key: "email" as const, label: "Email" },
    { key: "phone" as const, label: "Phone" },
    { key: "city" as const, label: "City" },
    { key: "country" as const, label: "Country" },
    { key: "contactPerson" as const, label: "Contact Person" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendors Management</h1>
          <p className="text-gray-500 mt-1">Manage vendor information</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <DataTable
        data={vendors}
        columns={columns}
        searchKey="name"
        actions={(vendor) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenModal(vendor)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => {
                setSelectedVendor(vendor);
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
        title={selectedVendor ? "Edit Vendor" : "Add New Vendor"}
        description={selectedVendor ? "Update vendor information" : "Add a new vendor"}
        onSubmit={handleSubmit}
        submitLabel={selectedVendor ? "Update" : "Add"}
        isLoading={isLoading}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vendor Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Dell Technologies"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sales@vendor.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1-800-VENDOR"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Main Street"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="New York"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="USA"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Person</label>
            <Input
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              placeholder="John Doe"
              required
            />
          </div>
        </div>
      </FormModal>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Vendor"
        description={`Are you sure you want to delete ${selectedVendor?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
