"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { FormModal } from "@/components/shared/form-modal";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { toast } from "@/lib/toast";
import { Edit2, Trash2, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Laptops",
      description: "Portable computing devices",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      name: "Desktops",
      description: "Desktop computers",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Printers",
      description: "Printing devices",
      createdAt: "2024-01-10",
    },
    {
      id: "4",
      name: "Monitors",
      description: "Display screens",
      createdAt: "2024-01-10",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
      });
    } else {
      setSelectedCategory(null);
      setFormData({
        name: "",
        description: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedCategory) {
        setCategories(
          categories.map((c) =>
            c.id === selectedCategory.id ? { ...c, ...formData } : c
          )
        );
        toast.success("Category updated successfully");
      } else {
        const newCategory: Category = {
          id: Math.random().toString(),
          ...formData,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setCategories([...categories, newCategory]);
        toast.success("Category created successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    setIsLoading(true);

    try {
      setCategories(categories.filter((c) => c.id !== selectedCategory.id));
      toast.success("Category deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { key: "name" as const, label: "Category Name", sortable: true },
    { key: "description" as const, label: "Description" },
    { key: "createdAt" as const, label: "Created Date" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-500 mt-1">Manage asset categories</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        searchKey="name"
        actions={(category) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenModal(category)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => {
                setSelectedCategory(category);
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
        title={selectedCategory ? "Edit Category" : "Add New Category"}
        description={selectedCategory ? "Update category information" : "Create a new category"}
        onSubmit={handleSubmit}
        submitLabel={selectedCategory ? "Update" : "Create"}
        isLoading={isLoading}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Laptops"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Category description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>
      </FormModal>

      <DeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Category"
        description={`Are you sure you want to delete ${selectedCategory?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
