<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'view projects',
            'create projects',
            'edit projects',
            'delete projects',
            'view dashboard',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $managerRole = Role::create(['name' => 'manager']);
        $userRole = Role::create(['name' => 'user']);

        // Assign permissions to roles
        $adminRole->givePermissionTo(Permission::all());
        $managerRole->givePermissionTo([
            'view users',
            'view roles',
            'view projects',
            'create projects',
            'edit projects',
            'view dashboard',
        ]);
        $userRole->givePermissionTo([
            'view projects',
            'view dashboard',
        ]);

        // Create admin user
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@rinkwebstudio.com',
            'password' => Hash::make('password'),
        ]);

        $admin->assignRole('admin');

        // Create manager user
        $manager = User::create([
            'name' => 'Manager',
            'email' => 'manager@rinkwebstudio.com',
            'password' => Hash::make('password'),
        ]);

        $manager->assignRole('manager');
    }
}
