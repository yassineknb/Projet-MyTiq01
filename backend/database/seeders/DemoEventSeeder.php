<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class DemoEventSeeder extends Seeder
{
    public function run(): void
    {
        Event::create([
            'title' => 'Concert de Jazz (Demo)',
            'description' => 'Une soirée inoubliable de jazz pour la démo.',
            'date' => now()->addDays(10),
            'location' => 'Casablanca',
            'capacity' => 200,
            'price' => 150,
        ]);
    }
}
