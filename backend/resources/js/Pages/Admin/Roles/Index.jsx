import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function RolesIndex({ roles, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/roles', { search }, {
            preserveState: true,
            replace: true
        });
    };

    const handleDelete = (role) => {
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
        return classes[roleName] || 'bg-gray-100 text-gray-800';
    };

    const isSystemRole = (roleName) => {
        return ['admin', 'manager', 'user'].includes(roleName);
    };

    return (
        <AdminLayout title="Role Management">
            <Head title="Roles" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
                        <p className="text-gray-600 mt-1">Manage system roles and permissions</p>
                    </div>
                    <Link
                        href="/admin/roles/create"
                        className="btn btn-primary"
                    >
                        Create New Role
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSearch} className="flex items-center space-x-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search roles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input w-full"
                            />
                        </div>
                        <button type="submit" className="btn btn-outline">
                            Search
                        </button>
                        {filters.search && (
                            <Link
                                href="/admin/roles"
                                className="btn btn-ghost"
                            >
                                Clear
                            </Link>
                        )}
                    </form>
                </div>

                {/* Roles Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Permissions
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Users Count
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {roles.data.length > 0 ? (
                                    roles.data.map((role) => (
                                        <tr key={role.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center">
                                                            <span className="text-white font-medium text-sm">
                                                                {role.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Role ID: #{role.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {role.permissions && role.permissions.length > 0 ? (
                                                        role.permissions.slice(0, 3).map((permission) => (
                                                            <span
                                                                key={permission.id}
                                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                            >
                                                                {permission.name}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-500 text-sm italic">No permissions</span>
                                                    )}
                                                    {role.permissions && role.permissions.length > 3 && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            +{role.permissions.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {role.users_count}
                                                    </span>
                                                    <span className="text-sm text-gray-500 ml-1">
                                                        {role.users_count === 1 ? 'user' : 'users'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    isSystemRole(role.name) 
                                                        ? getRoleBadgeClass(role.name)
                                                        : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                    {isSystemRole(role.name) ? 'System Role' : 'Custom Role'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link
                                                        href={`/admin/roles/${role.id}`}
                                                        className="text-primary-600 hover:text-primary-900"
                                                        title="View Role"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </Link>
                                                    <Link
                                                        href={`/admin/roles/${role.id}/edit`}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                        title="Edit Role"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    {!isSystemRole(role.name) && (
                                                        <button
                                                            onClick={() => handleDelete(role)}
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Delete Role"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                </svg>
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {filters.search ? 'Try adjusting your search criteria.' : 'Get started by creating a new role.'}
                                                </p>
                                                {!filters.search && (
                                                    <div className="mt-6">
                                                        <Link
                                                            href="/admin/roles/create"
                                                            className="btn btn-primary"
                                                        >
                                                            Create New Role
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {roles.data.length > 0 && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    {roles.prev_page_url && (
                                        <Link
                                            href={roles.prev_page_url}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {roles.next_page_url && (
                                        <Link
                                            href={roles.next_page_url}
                                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{roles.from}</span> to{' '}
                                            <span className="font-medium">{roles.to}</span> of{' '}
                                            <span className="font-medium">{roles.total}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            {roles.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        link.active
                                                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                                            : link.url
                                                            ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                            : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                                                    } ${
                                                        index === 0 ? 'rounded-l-md' : ''
                                                    } ${
                                                        index === roles.links.length - 1 ? 'rounded-r-md' : ''
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Roles</dt>
                                    <dd className="text-lg font-medium text-gray-900">{roles.total}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">System Roles</dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {roles.data.filter(role => isSystemRole(role.name)).length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Custom Roles</dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {roles.data.filter(role => !isSystemRole(role.name)).length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}