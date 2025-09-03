import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Dashboard({ stats }) {
    const cards = [
        {
            title: 'Total Users',
            value: stats?.users || 0,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            ),
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            change: '+12%',
            changeType: 'increase'
        },
        {
            title: 'Active Projects',
            value: stats?.projects || 0,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            change: '+8%',
            changeType: 'increase'
        },
        {
            title: 'Total Roles',
            value: stats?.roles || 0,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            change: '+3%',
            changeType: 'increase'
        },
        {
            title: 'System Status',
            value: 'Online',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            change: '99.9%',
            changeType: 'stable'
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />
            
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white opacity-10 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white opacity-10 rounded-full"></div>
                    <div className="relative">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
                            Welcome back, Admin! 👋
                        </h1>
                        <p className="text-primary-100 text-sm sm:text-base lg:text-lg">
                            Here's what's happening with your application today.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {cards.map((card, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border border-gray-100 hover:scale-105 group">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className={`${card.bgColor} rounded-xl p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className={`${card.textColor} w-5 h-5 sm:w-6 sm:h-6`}>
                                        {card.icon}
                                    </div>
                                </div>
                                <div className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded-full ${
                                    card.changeType === 'increase' ? 'bg-green-100 text-green-600' :
                                    card.changeType === 'decrease' ? 'bg-red-100 text-red-600' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    {card.changeType === 'increase' && '↗'}
                                    {card.changeType === 'decrease' && '↘'}
                                    {card.changeType === 'stable' && '→'}
                                    {card.change}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Activity</h2>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-900">New user registered</p>
                                    <p className="text-xs text-gray-500 mt-1">john.doe@example.com joined the platform</p>
                                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-900">Project updated</p>
                                    <p className="text-xs text-gray-500 mt-1">E-commerce website project modified</p>
                                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-900">Role permissions updated</p>
                                    <p className="text-xs text-gray-500 mt-1">Admin role permissions modified</p>
                                    <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                            <button className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200">
                                View all activities →
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-3 sm:gap-4">
                            <a
                                href="/admin/users/create"
                                className="group flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-blue-200 transition-colors duration-300 flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-primary-700">Add User</p>
                                    <p className="text-xs sm:text-sm text-gray-500">Create new user account</p>
                                </div>
                            </a>
                            <a
                                href="/admin/projects/create"
                                className="group flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-300"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-green-200 transition-colors duration-300 flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-green-700">New Project</p>
                                    <p className="text-xs sm:text-sm text-gray-500">Create new project</p>
                                </div>
                            </a>
                            <a
                                href="/admin/roles/create"
                                className="group flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-purple-200 transition-colors duration-300 flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-purple-700">Add Role</p>
                                    <p className="text-xs sm:text-sm text-gray-500">Create new role</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}