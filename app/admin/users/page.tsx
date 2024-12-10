"use client";

import { motion } from "framer-motion";
import { IconEdit, IconTrash, IconSearch, IconChevronDown, IconCheck } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "react-hot-toast";
import DeleteModal from "@/components/admin/DeleteModal";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

const CustomCheckbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`w-5 h-5 rounded border transition-colors ${
      checked
        ? "bg-[#97ef39] border-[#97ef39]"
        : "border-gray-300 dark:border-gray-600"
    }`}
  >
    {checked && <IconCheck className="w-4 h-4 text-black" />}
  </button>
);

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [showRoleMenu, setShowRoleMenu] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [deletingMultiple, setDeletingMultiple] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deletingMultiple) {
        const promises = Array.from(selectedUsers).map(userId =>
          fetch(`/api/admin/users/${userId}`, { method: "DELETE" })
        );

        await Promise.all(promises);
        toast.success(`Successfully deleted ${selectedUsers.size} users`);
        setSelectedUsers(new Set());
      } else if (userToDelete) {
        const response = await fetch(`/api/admin/users/${userToDelete}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete user");
        toast.success("User deleted successfully");
      }
      fetchUsers();
    } catch (error) {
      toast.error(deletingMultiple ? "Failed to delete some users" : "Failed to delete user");
    } finally {
      setDeleteModalOpen(false);
      setUserToDelete(null);
      setDeletingMultiple(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: "USER" | "ADMIN") => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      toast.success("User role updated successfully");
      fetchUsers(); // Refresh the users list
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update user role");
    } finally {
      setShowRoleMenu(null);
    }
  };

  const RoleDropdown = ({ user }: { user: User }) => (
    <div className="relative">
      <button
        onClick={() => setShowRoleMenu(showRoleMenu === user.id ? null : user.id)}
        className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full transition-colors ${
          user.role === "ADMIN"
            ? "bg-[#97ef39]/10 text-[#97ef39]"
            : "bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400"
        }`}
      >
        {user.role}
        <IconChevronDown className="w-3 h-3" />
      </button>

      {showRoleMenu === user.id && (
        <div className="absolute z-10 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
          <div className="py-1">
            <button
              onClick={() => handleRoleChange(user.id, "USER")}
              className={`block w-full text-left px-4 py-2 text-sm ${
                user.role === "USER"
                  ? "bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              USER
            </button>
            <button
              onClick={() => handleRoleChange(user.id, "ADMIN")}
              className={`block w-full text-left px-4 py-2 text-sm ${
                user.role === "ADMIN"
                  ? "bg-[#97ef39]/10 text-[#97ef39]"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              ADMIN
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const toggleAllUsers = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
    }
  };

  const handleDeleteSelected = () => {
    setDeletingMultiple(true);
    setDeleteModalOpen(true);
  };

  const adminUsers = filteredUsers.filter(user => user.role === "ADMIN");
  const regularUsers = filteredUsers.filter(user => user.role === "USER");

  const paginatedUsers = (users: User[]) => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return users.slice(startIndex, endIndex);
  };

  const Pagination = ({ totalItems }: { totalItems: number }) => {
    const totalPages = Math.ceil(totalItems / usersPerPage);
    
    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700
            disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700
            disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    );
  };

  const UserTable = ({ users, title }: { users: User[], title: string }) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          {title}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({users.length})
          </span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              <th className="p-4">
                <CustomCheckbox
                  checked={
                    users.length > 0 &&
                    users.every(user => selectedUsers.has(user.id))
                  }
                  onChange={() => {
                    const newSelected = new Set(selectedUsers);
                    if (users.every(user => selectedUsers.has(user.id))) {
                      users.forEach(user => newSelected.delete(user.id));
                    } else {
                      users.forEach(user => newSelected.add(user.id));
                    }
                    setSelectedUsers(newSelected);
                  }}
                />
              </th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Joined</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(title === "Administrators" ? users : paginatedUsers(users)).map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-4">
                  <CustomCheckbox
                    checked={selectedUsers.has(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                  />
                </td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <RoleDropdown user={user} />
                </td>
                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-1 hover:text-red-500 transition-colors"
                  >
                    <IconTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {title !== "Administrators" && users.length > usersPerPage && (
        <Pagination totalItems={users.length} />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        {selectedUsers.size > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            <IconTrash className="w-4 h-4" />
            Delete Selected ({selectedUsers.size})
          </motion.button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200
              dark:border-gray-600 focus:ring-2 focus:ring-[#97ef39] focus:border-transparent
              placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Separate tables for admins and users */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-8 w-8 border-b-2 border-[#97ef39]"></div>
          </div>
        ) : (
          <>
            <UserTable users={adminUsers} title="Administrators" />
            <UserTable users={regularUsers} title="Regular Users" />
          </>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setUserToDelete(null);
          setDeletingMultiple(false);
        }}
        onConfirm={handleConfirmDelete}
        title={deletingMultiple ? "Delete Multiple Users" : "Delete User"}
        message={
          deletingMultiple
            ? `Are you sure you want to delete ${selectedUsers.size} users? This action cannot be undone.`
            : "Are you sure you want to delete this user? This action cannot be undone."
        }
      />
    </div>
  );
} 