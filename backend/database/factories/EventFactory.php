<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'date' => fake()->dateTimeBetween('+1 week', '+1 month'),
            'location' => fake()->address(),
            'capacity' => fake()->numberBetween(50, 500),
            'price' => fake()->randomFloat(2, 10, 100),
        ];
    }
}
