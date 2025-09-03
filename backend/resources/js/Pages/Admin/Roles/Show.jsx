import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function ShowRole({ role }) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`)) {
            router.delete(`/admin/roles/${role.id}`);
        }
    };

    const getRoleBadgeClass = (roleName) => {
        const classes = {
            'admin': 'bg-red-100 text-red-800',
            'manager': 'bg-blue-100 text-blue-800',
            'user': 'bg-green-100 text-green-800'
        };
        return classes[roleName] || 'bg-purple-100 text-purple-800';
    };

    const isSystemRole = (roleName) => {
        return ['admin', 'manager', 'user'].includes(roleName);
    };

    const formatGroupName = (groupName) => {
        return groupName.charAt(0).toUpperCase() + groupName.slice(1);
    };

    const getPermissionDescription = (permissionName) => {
        const descriptions = {
            'view.dashboard': 'Access to admin dashboard',
            'view.users': 'View users list and details',
            'create.users': 'Create new users',
            'edit.users': 'Edit existing users',
            'delete.users': 'Delete users',
            'view.roles': 'View roles and permissions',
            'create.roles': 'Create new roles',
            'edit.roles': 'Edit existing roles',
            'delete.roles': 'Delete roles',
            'view.projects': 'View projects list and details',
            'create.projects': 'Create new projects',
            'edit.projects': 'Edit existing projects',
            'delete.projects': 'Delete projects'
        };
        return descriptions[permissionName] || 'Permission access';
    };

    // Group permissions by prefix
    const groupedPermissions = role.permissions.reduce((groups, permission) => {
        const prefix = permission.name.split('.')[0];
        if (!groups[prefix]) {
            groups[prefix] = [];
        }
        groups[prefix].push(permission);
        return groups;
    }, {});

    return (
        <AdminLayout title="Role Details">
            <Head title={role.name} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{role.name.charAt(0).toUpperCase() + role.name.slice(1)}</h1>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="text-gray-600">Role ID: #{role.id}</span>
                            <span className="text-gray-500">•</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                isSystemRole(role.name) 
                                    ? getRoleBadgeClass(role.name)
                                    : 'bg-purple-100 text-purple-800'
                            }`}>
                                {isSystemRole(role.name) ? 'System Role' : 'Custom Role'}
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/admin/roles/${role.id}/edit`}
                            className="btn btn-primary"
                        >
                            Edit Role
                        </Link>
                        {!isSystemRole(role.name) && (
                            <button
                                onClick={handleDelete}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        )}
                        <Link
                            href="/admin/roles"
                            className="btn btn-outline"
                        >
                            Back to Roles
                        </Link>
                    </div>
                </div>

                {/* Role Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role Name</label>
                                    <p className="text-lg font-medium text-gray-900 mt-1">
                                        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role Type</label>
                                    <div className="mt-1">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            isSystemRole(role.name) 
                                                ? getRoleBadgeClass(role.name)
                                                : 'bg-purple-100 text-purple-800'
                                        }`}>
                                            {isSystemRole(role.name) ? 'System Role' : 'Custom Role'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Users Count</label>
                                    <p className="text-lg font-medium text-gray-900 mt-1">
                                        {role.users ? role.users.length : 0} {role.users && role.users.length === 1 ? 'user' : 'users'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Permissions Count</label>
                                    <p className="text-lg font-medium text-gray-900 mt-1">
                                        {role.permissions ? role.permissions.length : 0} permissions
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Permissions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h2>
                            {role.permissions && role.permissions.length > 0 ? (
                                <div className="space-y-6">
                                    {Object.entries(groupedPermissions).map(([groupName, permissions]) => (
                                        <div key={groupName} className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="text-base font-medium text-gray-900 mb-3">
                                                {formatGroupName(groupName)} Management
                                                <span className="ml-2 text-sm text-gray-500">({permissions.length} permissions)</span>
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {permissions.map((permission) => (
                                                    <div key={permission.id} className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0 mt-0.5">
                                                            <div className="w-4 h-4 bg-green-500 rounded border-2 border-green-500 flex items-center justify-center">
                                                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-700">
                                                                {permission.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-0.5">
                                                                {getPermissionDescription(permission.name)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No permissions assigned</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        This role doesn't have any permissions assigned yet.
                                    </p>
                                    <div className="mt-6">
                                        <Link
                                            href={`/admin/roles/${role.id}/edit`}
                                            className="btn btn-primary"
                                        >
                                            Assign Permissions
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Users with this Role */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Users with this Role</h2>
                            {role.users && role.users.length > 0 ? (
                                <div className="space-y-3">
                                    {role.users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-sm font-medium">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                                            >
                                                View User
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No users assigned</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        No users have been assigned to this role yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Role Icon */}
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-3xl font-bold">
                                    {role.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                            </h3>
                            <p className="text-gray-600">
                                {isSystemRole(role.name) ? 'System Role' : 'Custom Role'}
                            </p>
                        </div>

                        {/* Role Statistics */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Users Count</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {role.users ? role.users.length : 0}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Permissions</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {role.permissions ? role.permissions.length : 0}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Role Type</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {isSystemRole(role.name) ? 'System' : 'Custom'}
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
                                        {new Date(role.created_at).toLocaleString()}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date(role.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                <Link
                                    href={`/admin/roles/${role.id}/edit`}
                                    className="w-full btn btn-outline text-left"
                                >
                                    Edit Role
                                </Link>
                                
                                <Link
                                    href="/admin/users?role=${role.name}"
                                    className="w-full btn btn-outline text-left"
                                >
                                    View Users with Role
                                </Link>
                                
                                {!isSystemRole(role.name) && (
                                    <button
                                        onClick={handleDelete}
                                        className="w-full btn btn-danger text-left"
                                    >
                                        Delete Role
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}