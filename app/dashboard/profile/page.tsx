"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { IconUser, IconMail, IconBrandGithub, IconBrandGoogle, IconEdit, IconCheck, IconX, IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "Naeem Anjum",
    email: session?.user?.email || "naemanjum076@gmail.com",
    username: "@naemanjum076",
    bio: "AI & Stock Content Researcher",
  });

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the user's profile
      // await updateProfile(formData);
      
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const stats = [
    {
      name: "Keywords Generated",
      value: "1.2K",
      description: "Total keywords researched",
      color: "from-emerald-400/10 to-emerald-400/5",
      accentColor: "text-emerald-400"
    },
    {
      name: "Events Tracked",
      value: "156",
      description: "Events in calendar",
      color: "from-blue-400/10 to-blue-400/5",
      accentColor: "text-blue-400"
    },
    {
      name: "Niches Analyzed",
      value: "45",
      description: "Market opportunities found",
      color: "from-purple-400/10 to-purple-400/5",
      accentColor: "text-purple-400"
    }
  ];

  const connectedAccounts = [
    {
      name: "Google",
      icon: IconBrandGoogle,
      connected: true,
      color: "text-red-400"
    },
    {
      name: "GitHub",
      icon: IconBrandGithub,
      connected: false,
      color: "text-gray-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header Card */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-400/10 to-purple-400/5 p-6 border border-white/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl font-medium text-white">
                    {formData.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{formData.name}</h1>
                    <p className="text-gray-400">{formData.username}</p>
                    <p className="mt-2 text-gray-300">{formData.bio}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300"
                >
                  {isEditing ? (
                    <>
                      <IconX className="w-4 h-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <IconEdit className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Profile Form */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-gray-800/50 border border-white/5 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/10 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/10 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/10 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-white/10 text-white disabled:opacity-50 resize-none"
                  />
                </div>
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                    >
                      <IconCheck className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 + index * 0.1 }}
                  variants={fadeInUp}
                >
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${stat.color} p-6 border border-white/5`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-black/20">
                        <IconArrowUpRight className={`w-5 h-5 ${stat.accentColor}`} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className={`text-2xl font-bold ${stat.accentColor}`}>{stat.value}</h3>
                      <p className="text-sm text-gray-400">{stat.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Connected Accounts */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
              className="rounded-2xl bg-gray-800/50 border border-white/5 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Connected Accounts</h2>
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <div
                    key={account.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <account.icon className={`w-5 h-5 ${account.color}`} />
                      <span className="text-white">{account.name}</span>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm ${
                        account.connected
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      } transition-colors`}
                    >
                      {account.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}