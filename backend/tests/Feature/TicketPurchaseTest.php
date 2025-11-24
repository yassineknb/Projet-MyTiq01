<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use App\Events\TicketPurchased;

class TicketPurchaseTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_purchase_ticket()
    {
        Event::fake([TicketPurchased::class]);
        Mail::fake();

        $user = User::factory()->create();
        $event = \App\Models\Event::factory()->create(['capacity' => 10, 'price' => 50]);
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/tickets/purchase', [
                'event_id' => $event->id,
            ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['message', 'ticket']);

        $this->assertDatabaseHas('tickets', [
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);

        Event::assertDispatched(TicketPurchased::class);
    }

    public function test_cannot_purchase_if_sold_out()
    {
        $user = User::factory()->create();
        $event = \App\Models\Event::factory()->create(['capacity' => 1]);

        // Fill capacity
        \App\Models\Ticket::create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'purchase_date' => now(),
            'unique_code' => 'TEST',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/tickets/purchase', [
                'event_id' => $event->id,
            ]);

        $response->assertStatus(400)
            ->assertJson(['message' => 'Event is sold out']);
    }
}
