import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function ShowProject({ project }) {
    const getStatusBadgeClass = (status) => {
        const classes = {
            'planning': 'bg-blue-100 text-blue-800',
            'in_progress': 'bg-yellow-100 text-yellow-800',
            'completed': 'bg-green-100 text-green-800',
            'on_hold': 'bg-red-100 text-red-800'
        };
        return classes[status] || 'bg-gray-100 text-gray-800';
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            router.delete(`/admin/projects/${project.id}`);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount || 0);
    };

    const formatDate = (date) => {
        if (!date) return 'Not set';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AdminLayout title="Project Details">
            <Head title={project.name} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(project.status)}`}>
                                {project.status.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-600">Project #{project.id}</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="btn btn-primary"
                        >
                            Edit Project
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                        <Link
                            href="/admin/projects"
                            className="btn btn-outline"
                        >
                            Back to Projects
                        </Link>
                    </div>
                </div>

                {/* Project Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                            <div className="prose max-w-none">
                                {project.description ? (
                                    <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
                                ) : (
                                    <p className="text-gray-500 italic">No description provided</p>
                                )}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Start Date</h3>
                                        <p className="text-gray-600">{formatDate(project.start_date)}</p>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="font-medium text-gray-900">End Date</h3>
                                        <p className="text-gray-600">{formatDate(project.end_date)}</p>
                                    </div>
                                </div>
                                
                                {project.start_date && project.end_date && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-2">Project Duration</h4>
                                        <p className="text-gray-600">
                                            {Math.ceil((new Date(project.end_date) - new Date(project.start_date)) / (1000 * 60 * 60 * 24))} days
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Details */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusBadgeClass(project.status)}`}>
                                        {project.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Budget</label>
                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                        {project.budget ? formatCurrency(project.budget) : 'Not set'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Assigned User</label>
                                    <div className="mt-1">
                                        {project.user ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-sm font-medium">
                                                        {project.user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{project.user.name}</p>
                                                    <p className="text-sm text-gray-600">{project.user.email}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic">Unassigned</p>
                                        )}
                                    </div>
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
                                        {new Date(project.created_at).toLocaleString()}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date(project.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                <Link
                                    href={`/admin/projects/${project.id}/edit`}
                                    className="w-full btn btn-outline text-left"
                                >
                                    Edit Project
                                </Link>
                                
                                {project.status !== 'completed' && (
                                    <button
                                        onClick={() => {
                                            router.put(`/admin/projects/${project.id}`, {
                                                ...project,
                                                status: 'completed'
                                            });
                                        }}
                                        className="w-full btn btn-success text-left"
                                    >
                                        Mark as Completed
                                    </button>
                                )}
                                
                                <button
                                    onClick={handleDelete}
                                    className="w-full btn btn-danger text-left"
                                >
                                    Delete Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}