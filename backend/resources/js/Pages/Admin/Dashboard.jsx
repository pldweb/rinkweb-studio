import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard({ stats }) {
    const cards = [
        {
            title: 'Total Users',
            value: stats?.users || 0,
            icon: '👥',
            color: 'bg-blue-500',
        },
        {
            title: 'Active Projects',
            value: stats?.projects || 0,
            icon: '📁',
            color: 'bg-green-500',
        },
        {
            title: 'Total Roles',
            value: stats?.roles || 0,
            icon: '🔐',
            color: 'bg-purple-500',
        },
        {
            title: 'System Status',
            value: 'Online',
            icon: '✅',
            color: 'bg-emerald-500',
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome to Admin Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your application from this central dashboard.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className={`${card.color} rounded-lg p-3 mr-4`}>
                                    <span className="text-white text-xl">{card.icon}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 rounded-full p-2">
                                    <span className="text-blue-600">👤</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">New user registered</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-green-100 rounded-full p-2">
                                    <span className="text-green-600">📁</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Project updated</p>
                                    <p className="text-xs text-gray-500">1 hour ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="bg-purple-100 rounded-full p-2">
                                    <span className="text-purple-600">🔐</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Role permissions updated</p>
                                    <p className="text-xs text-gray-500">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a
                                href="/admin/users/create"
                                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className="bg-blue-100 rounded-lg p-2 mr-3">
                                    <span className="text-blue-600">👤</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Add User</p>
                                    <p className="text-sm text-gray-500">Create new user account</p>
                                </div>
                            </a>
                            <a
                                href="/admin/projects/create"
                                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className="bg-green-100 rounded-lg p-2 mr-3">
                                    <span className="text-green-600">📁</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">New Project</p>
                                    <p className="text-sm text-gray-500">Create new project</p>
                                </div>
                            </a>
                            <a
                                href="/admin/roles/create"
                                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className="bg-purple-100 rounded-lg p-2 mr-3">
                                    <span className="text-purple-600">🔐</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Add Role</p>
                                    <p className="text-sm text-gray-500">Create new role</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}