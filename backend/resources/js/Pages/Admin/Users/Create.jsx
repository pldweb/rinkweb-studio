import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function CreateUser({ roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/users');
    };

    const handleRoleChange = (roleName) => {
        const updatedRoles = data.roles.includes(roleName)
            ? data.roles.filter(role => role !== roleName)
            : [...data.roles, roleName];
        setData('roles', updatedRoles);
    };

    return (
        <AdminLayout title="Create User">
            <Head title="Create User" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
                        <p className="text-gray-600">Add a new user to the system</p>
                    </div>
                    <Link
                        href="/admin/users"
                        className="btn btn-outline"
                    >
                        Back to Users
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Enter full name"
                                />
                                {errors.name && (
                                    <div className="text-red-600 text-sm mt-1">{errors.name}</div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Enter email address"
                                />
                                {errors.email && (
                                    <div className="text-red-600 text-sm mt-1">{errors.email}</div>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <div className="text-red-600 text-sm mt-1">{errors.password}</div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password *
                                </label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Confirm password"
                                />
                                {errors.password_confirmation && (
                                    <div className="text-red-600 text-sm mt-1">{errors.password_confirmation}</div>
                                )}
                            </div>
                        </div>

                        {/* Roles */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Assign Roles
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`role-${role.id}`}
                                            checked={data.roles.includes(role.name)}
                                            onChange={() => handleRoleChange(role.name)}
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`role-${role.id}`} className="ml-2 block text-sm text-gray-900">
                                            <span className="font-medium">
                                                {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                            </span>
                                            {role.name === 'admin' && (
                                                <span className="block text-xs text-gray-500">Full system access</span>
                                            )}
                                            {role.name === 'manager' && (
                                                <span className="block text-xs text-gray-500">Manage users and projects</span>
                                            )}
                                            {role.name === 'user' && (
                                                <span className="block text-xs text-gray-500">Basic user access</span>
                                            )}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.roles && (
                                <div className="text-red-600 text-sm mt-1">{errors.roles}</div>
                            )}
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Minimum 8 characters long</li>
                                <li>• Must contain at least one uppercase letter</li>
                                <li>• Must contain at least one lowercase letter</li>
                                <li>• Must contain at least one number</li>
                                <li>• Password confirmation must match</li>
                            </ul>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Link
                                href="/admin/users"
                                className="btn btn-outline"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary"
                            >
                                {processing ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}