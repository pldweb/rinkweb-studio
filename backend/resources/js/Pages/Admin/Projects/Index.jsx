import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function ProjectsIndex({ projects }) {
    const handleDelete = (project) => {
        if (confirm(`Are you sure you want to delete project "${project.name}"?`)) {
            router.delete(`/admin/projects/${project.id}`);
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            planning: 'bg-blue-100 text-blue-800',
            in_progress: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
            on_hold: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
                {status.replace('_', ' ').toUpperCase()}
            </span>
        );
    };

    return (
        <AdminLayout title="Projects">
            <Head title="Projects" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                        <p className="text-gray-600">Manage your projects</p>
                    </div>
                    <Link
                        href="/admin/projects/create"
                        className="btn btn-primary"
                    >
                        Add New Project
                    </Link>
                </div>

                {/* Projects Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Project
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assigned To
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Budget
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dates
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {projects.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <span className="text-4xl mb-2">📁</span>
                                                <p className="text-lg font-medium">No projects found</p>
                                                <p className="text-sm">Get started by creating your first project.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    projects.data.map((project) => (
                                        <tr key={project.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {project.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">
                                                        {project.description || 'No description'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(project.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{project.user.name}</div>
                                                <div className="text-sm text-gray-500">{project.user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {project.budget ? `$${parseFloat(project.budget).toLocaleString()}` : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div>
                                                    {project.start_date && (
                                                        <div>Start: {new Date(project.start_date).toLocaleDateString()}</div>
                                                    )}
                                                    {project.end_date && (
                                                        <div>End: {new Date(project.end_date).toLocaleDateString()}</div>
                                                    )}
                                                    {!project.start_date && !project.end_date && '-'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        href={`/admin/projects/${project.id}`}
                                                        className="text-primary-600 hover:text-primary-900"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={`/admin/projects/${project.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(project)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {projects.links && projects.links.length > 3 && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-700">
                                    Showing {projects.from} to {projects.to} of {projects.total} results
                                </div>
                                <div className="flex space-x-1">
                                    {projects.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 text-sm rounded-md ${
                                                link.active
                                                    ? 'bg-primary-600 text-white'
                                                    : link.url
                                                    ? 'text-gray-700 hover:bg-gray-100'
                                                    : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}