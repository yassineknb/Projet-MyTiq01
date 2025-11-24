<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Event;
use App\Models\User;

class EventTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_can_list_events()
    {
        Event::factory()->count(3)->create();

        $response = $this->getJson('/api/events');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_admin_can_create_event()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $token = $admin->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/events', [
                'title' => 'New Event',
                'description' => 'Description',
                'date' => '2025-12-31 20:00:00',
                'location' => 'Venue',
                'capacity' => 100,
                'price' => 50.00,
            ]);

        $response->assertStatus(201)
            ->assertJson(['title' => 'New Event']);
    }

    public function test_user_cannot_create_event()
    {
        $user = User::factory()->create(['role' => 'user']);
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/events', [
                'title' => 'New Event',
            ]);

        $response->assertStatus(403);
    }
}
