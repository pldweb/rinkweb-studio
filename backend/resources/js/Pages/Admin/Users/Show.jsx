import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function ShowUser({ user }) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
            router.delete(`/admin/users/${user.id}`);
        }
    };

    const getRoleBadgeClass = (role) => {
        const classes = {
            'admin': 'bg-red-100 text-red-800',
            'manager': 'bg-blue-100 text-blue-800',
            'user': 'bg-green-100 text-green-800'
        };
        return classes[role] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout title="User Details">
            <Head title={user.name} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="text-gray-600">{user.email}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-600">User #{user.id}</span>
                            {user.email_verified_at && (
                                <>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-green-600 text-sm">✓ Verified</span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/admin/users/${user.id}/edit`}
                            className="btn btn-primary"
                        >
                            Edit User
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                        <Link
                            href="/admin/users"
                            className="btn btn-outline"
                        >
                            Back to Users
                        </Link>
                    </div>
                </div>

                {/* User Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <p className="text-lg font-medium text-gray-900 mt-1">{user.name}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <p className="text-lg text-gray-900 mt-1">{user.email}</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Status</label>
                                    <div className="mt-1">
                                        {user.email_verified_at ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                ✓ Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                ✗ Not Verified
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                                    <p className="text-lg font-mono text-gray-900 mt-1">#{user.id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Roles & Permissions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Roles & Permissions</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Roles</label>
                                    <div className="flex flex-wrap gap-2">
                                        {user.roles && user.roles.length > 0 ? (
                                            user.roles.map((role) => (
                                                <span
                                                    key={role.id}
                                                    className={`px-3 py-1 text-sm font-medium rounded-full ${getRoleBadgeClass(role.name)}`}
                                                >
                                                    {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 italic">No roles assigned</span>
                                        )}
                                    </div>
                                </div>
                                
                                {user.roles && user.roles.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Role Descriptions</label>
                                        <div className="space-y-2">
                                            {user.roles.map((role) => (
                                                <div key={role.id} className="flex items-start space-x-2">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded ${getRoleBadgeClass(role.name)}`}>
                                                        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                                    </span>
                                                    <div className="text-sm text-gray-600">
                                                        {role.name === 'admin' && 'Full system access with all permissions'}
                                                        {role.name === 'manager' && 'Can manage users, projects, and view reports'}
                                                        {role.name === 'user' && 'Basic user access with limited permissions'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Activity Summary */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-blue-600">0</div>
                                    <div className="text-sm text-blue-600">Projects Assigned</div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-green-600">0</div>
                                    <div className="text-sm text-green-600">Tasks Completed</div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-purple-600">0</div>
                                    <div className="text-sm text-purple-600">Login Sessions</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* User Avatar */}
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-3xl font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                        </div>

                        {/* Account Status */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Account Status</span>
                                    <span className="text-sm font-medium text-green-600">Active</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Email Verified</span>
                                    <span className={`text-sm font-medium ${
                                        user.email_verified_at ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {user.email_verified_at ? 'Yes' : 'No'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Roles Count</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {user.roles ? user.roles.length : 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timestamps</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Created</label>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date(user.created_at).toLocaleString()}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date(user.updated_at).toLocaleString()}
                                    </p>
                                </div>
                                
                                {user.email_verified_at && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email Verified</label>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {new Date(user.email_verified_at).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                <Link
                                    href={`/admin/users/${user.id}/edit`}
                                    className="w-full btn btn-outline text-left"
                                >
                                    Edit User
                                </Link>
                                
                                {!user.email_verified_at && (
                                    <button
                                        onClick={() => {
                                            // This would typically send a verification email
                                            alert('Email verification sent!');
                                        }}
                                        className="w-full btn btn-success text-left"
                                    >
                                        Send Verification Email
                                    </button>
                                )}
                                
                                <button
                                    onClick={() => {
                                        // This would typically reset the user's password
                                        alert('Password reset email sent!');
                                    }}
                                    className="w-full btn btn-warning text-left"
                                >
                                    Reset Password
                                </button>
                                
                                <button
                                    onClick={handleDelete}
                                    className="w-full btn btn-danger text-left"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}