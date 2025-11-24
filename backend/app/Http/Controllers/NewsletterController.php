<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsletterSubscription;
use App\Events\NewsletterSubscribed;

class NewsletterController extends Controller
{

    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletter_subscriptions,email'
        ]);

        NewsletterSubscription::create([
            'email' => $request->email,
            'verified_at' => now(), // Auto-verify for now
        ]);

        event(new NewsletterSubscribed($request->email));

        return response()->json(['message' => 'Subscribed successfully']);
    }
}
