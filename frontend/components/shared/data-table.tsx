"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  actions?: (item: T) => React.ReactNode;
  loading?: boolean;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  searchKey,
  actions,
  loading,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchTerm && searchKey) {
      result = result.filter((item) =>
        String(item[searchKey])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig, searchKey]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      )}

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <TableHead key={String(col.key)} className="text-gray-700">
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-2 hover:text-gray-900"
                    >
                      {col.label}
                      {sortConfig?.key === col.key ? (
                        sortConfig.direction === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : null}
                    </button>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
              {actions && <TableHead className="text-gray-700">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-8 text-gray-500"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} className="text-gray-900">
                      {col.render
                        ? col.render(item[col.key], item)
                        : String(item[col.key])}
                    </TableCell>
                  ))}
                  {actions && <TableCell>{actions(item)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
