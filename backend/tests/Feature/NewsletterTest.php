<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Event;
use App\Events\NewsletterSubscribed;

class NewsletterTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_subscribe_to_newsletter()
    {
        Event::fake();

        $response = $this->postJson('/api/newsletter/subscribe', [
            'email' => 'subscriber@example.com',
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Subscribed successfully']);

        $this->assertDatabaseHas('newsletter_subscriptions', [
            'email' => 'subscriber@example.com',
        ]);

        Event::assertDispatched(NewsletterSubscribed::class);
    }
}
