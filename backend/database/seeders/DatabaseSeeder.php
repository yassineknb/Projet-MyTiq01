<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        // Create Admin User
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@mytiQ.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Create Regular User
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);

        // Create 20 random events
        $events = \App\Models\Event::factory()->count(20)->create();

        // For each event, create some tickets bought by random users
        $events->each(function ($event) {
            \App\Models\Ticket::factory()
                ->count(rand(1, 5))
                ->create([
                    'event_id' => $event->id,
                    'user_id' => \App\Models\User::factory(), // Create a new user for each ticket purchase
                ]);
        });
    }
}
