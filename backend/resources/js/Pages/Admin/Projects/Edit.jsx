import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function EditProject({ project, users }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'planning',
        budget: project.budget || '',
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        user_id: project.user_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/projects/${project.id}`);
    };

    const getStatusBadgeClass = (status) => {
        const classes = {
            'planning': 'bg-blue-100 text-blue-800',
            'in_progress': 'bg-yellow-100 text-yellow-800',
            'completed': 'bg-green-100 text-green-800',
            'on_hold': 'bg-red-100 text-red-800'
        };
        return classes[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout title="Edit Project">
            <Head title={`Edit ${project.name}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
                        <div className="flex items-center space-x-2 mt-1">
                            <p className="text-gray-600">{project.name}</p>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(project.status)}`}>
                                {project.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/admin/projects/${project.id}`}
                            className="btn btn-outline"
                        >
                            View Project
                        </Link>
                        <Link
                            href="/admin/projects"
                            className="btn btn-outline"
                        >
                            Back to Projects
                        </Link>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Project Name */}
                            <div className="md:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Enter project name"
                                />
                                {errors.name && (
                                    <div className="text-red-600 text-sm mt-1">{errors.name}</div>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option value="planning">Planning</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="on_hold">On Hold</option>
                                </select>
                                {errors.status && (
                                    <div className="text-red-600 text-sm mt-1">{errors.status}</div>
                                )}
                            </div>

                            {/* Assigned User */}
                            <div>
                                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Assign to User *
                                </label>
                                <select
                                    id="user_id"
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option value="">Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                                {errors.user_id && (
                                    <div className="text-red-600 text-sm mt-1">{errors.user_id}</div>
                                )}
                            </div>

                            {/* Budget */}
                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                                    Budget ($)
                                </label>
                                <input
                                    type="number"
                                    id="budget"
                                    step="0.01"
                                    min="0"
                                    value={data.budget}
                                    onChange={(e) => setData('budget', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="0.00"
                                />
                                {errors.budget && (
                                    <div className="text-red-600 text-sm mt-1">{errors.budget}</div>
                                )}
                            </div>

                            {/* Start Date */}
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                                {errors.start_date && (
                                    <div className="text-red-600 text-sm mt-1">{errors.start_date}</div>
                                )}
                            </div>

                            {/* End Date */}
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                                {errors.end_date && (
                                    <div className="text-red-600 text-sm mt-1">{errors.end_date}</div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Enter project description"
                                />
                                {errors.description && (
                                    <div className="text-red-600 text-sm mt-1">{errors.description}</div>
                                )}
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Project Information</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Created:</span>
                                    <p className="font-medium">{new Date(project.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Updated:</span>
                                    <p className="font-medium">{new Date(project.updated_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Current User:</span>
                                    <p className="font-medium">{project.user?.name || 'Unassigned'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">ID:</span>
                                    <p className="font-medium">#{project.id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                            <Link
                                href="/admin/projects"
                                className="btn btn-outline"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary"
                            >
                                {processing ? 'Updating...' : 'Update Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}