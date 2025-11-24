<?php

namespace App\Listeners;

use App\Events\NewsletterSubscribed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendNewsletterConfirmation
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NewsletterSubscribed $event): void
    {
        \Illuminate\Support\Facades\Log::info("Sending newsletter confirmation to {$event->email}");
    }
}
