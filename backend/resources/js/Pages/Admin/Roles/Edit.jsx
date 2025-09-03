import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function EditRole({ role, permissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions.map(p => p.id)
    });

    const [selectedPermissions, setSelectedPermissions] = useState(role.permissions.map(p => p.id));

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`, {
            ...data,
            permissions: selectedPermissions
        });
    };

    const handlePermissionToggle = (permissionId) => {
        setSelectedPermissions(prev => {
            if (prev.includes(permissionId)) {
                return prev.filter(id => id !== permissionId);
            } else {
                return [...prev, permissionId];
            }
        });
    };

    const handleGroupToggle = (groupPermissions) => {
        const groupIds = groupPermissions.map(p => p.id);
        const allSelected = groupIds.every(id => selectedPermissions.includes(id));
        
        if (allSelected) {
            // Deselect all in group
            setSelectedPermissions(prev => prev.filter(id => !groupIds.includes(id)));
        } else {
            // Select all in group
            setSelectedPermissions(prev => {
                const newIds = groupIds.filter(id => !prev.includes(id));
                return [...prev, ...newIds];
            });
        }
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

    const formatGroupName = (groupName) => {
        return groupName.charAt(0).toUpperCase() + groupName.slice(1);
    };

    const isSystemRole = (roleName) => {
        return ['admin', 'manager', 'user'].includes(roleName);
    };

    return (
        <AdminLayout title="Edit Role">
            <Head title={`Edit ${role.name}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Role: {role.name}</h1>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="text-gray-600">Role ID: #{role.id}</span>
                            {isSystemRole(role.name) && (
                                <>
                                    <span className="text-gray-500">•</span>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        System Role
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/admin/roles/${role.id}`}
                            className="btn btn-outline"
                        >
                            View Role
                        </Link>
                        <Link
                            href="/admin/roles"
                            className="btn btn-outline"
                        >
                            Back to Roles
                        </Link>
                    </div>
                </div>

                {/* System Role Warning */}
                {isSystemRole(role.name) && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                    System Role Warning
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        This is a system role. While you can modify its permissions, be careful not to remove essential permissions that could break system functionality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Role Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`input w-full ${errors.name ? 'border-red-500' : ''}`}
                                    placeholder="Enter role name"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role Statistics
                                </label>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Created:</span>
                                        <span className="text-gray-900">{new Date(role.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Last Updated:</span>
                                        <span className="text-gray-900">{new Date(role.updated_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Users with this role:</span>
                                        <span className="text-gray-900">{role.users ? role.users.length : 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permissions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Permissions</h2>
                            <div className="text-sm text-gray-500">
                                {selectedPermissions.length} of {Object.values(permissions).flat().length} permissions selected
                            </div>
                        </div>
                        
                        {errors.permissions && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-red-600 text-sm">{errors.permissions}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {Object.entries(permissions).map(([groupName, groupPermissions]) => {
                                const groupIds = groupPermissions.map(p => p.id);
                                const selectedInGroup = groupIds.filter(id => selectedPermissions.includes(id)).length;
                                const allSelected = selectedInGroup === groupIds.length;
                                const someSelected = selectedInGroup > 0 && selectedInGroup < groupIds.length;

                                return (
                                    <div key={groupName} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleGroupToggle(groupPermissions)}
                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                        allSelected
                                                            ? 'bg-primary-500 border-primary-500'
                                                            : someSelected
                                                            ? 'bg-primary-200 border-primary-500'
                                                            : 'border-gray-300 hover:border-primary-500'
                                                    }`}
                                                >
                                                    {allSelected && (
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                    {someSelected && !allSelected && (
                                                        <div className="w-2 h-2 bg-primary-500 rounded-sm"></div>
                                                    )}
                                                </button>
                                                <h3 className="text-base font-medium text-gray-900">
                                                    {formatGroupName(groupName)} Management
                                                </h3>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {selectedInGroup}/{groupIds.length} selected
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-8">
                                            {groupPermissions.map((permission) => (
                                                <div key={permission.id} className="flex items-start space-x-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handlePermissionToggle(permission.id)}
                                                        className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center ${
                                                            selectedPermissions.includes(permission.id)
                                                                ? 'bg-primary-500 border-primary-500'
                                                                : 'border-gray-300 hover:border-primary-500'
                                                        }`}
                                                    >
                                                        {selectedPermissions.includes(permission.id) && (
                                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                    <div className="flex-1 min-w-0">
                                                        <label className="text-sm font-medium text-gray-700 cursor-pointer">
                                                            {permission.name}
                                                        </label>
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            {getPermissionDescription(permission.name)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {Object.keys(permissions).length === 0 && (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No permissions available</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    No permissions have been defined in the system yet.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Changes Summary */}
                    <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-base font-medium text-blue-900 mb-2">Current Configuration</h3>
                        <div className="text-sm text-blue-700">
                            <p className="mb-2">
                                <strong>Role Name:</strong> {data.name}
                            </p>
                            <p className="mb-2">
                                <strong>Permissions:</strong> {selectedPermissions.length} selected
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {Object.entries(permissions).map(([groupName, groupPermissions]) => {
                                    const selectedInGroup = groupPermissions.filter(p => selectedPermissions.includes(p.id));
                                    if (selectedInGroup.length === 0) return null;
                                    
                                    return (
                                        <span key={groupName} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {formatGroupName(groupName)}: {selectedInGroup.length}/{groupPermissions.length}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        <Link
                            href="/admin/roles"
                            className="btn btn-outline"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn btn-primary"
                        >
                            {processing ? 'Updating...' : 'Update Role'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}