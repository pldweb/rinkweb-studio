import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
        { name: 'Users', href: '/admin/users', icon: '👥' },
        { name: 'Roles', href: '/admin/roles', icon: '🔐' },
        { name: 'Projects', href: '/admin/projects', icon: '📁' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-center h-16 bg-primary-600">
                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                </div>
                <nav className="mt-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-200"
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                <span className="sr-only">Open sidebar</span>
                                ☰
                            </button>
                            <h2 className="ml-4 text-xl font-semibold text-gray-900">{title}</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">Welcome, {auth.user.name}</span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="btn btn-outline text-sm"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}