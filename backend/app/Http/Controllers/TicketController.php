<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Ticket;
use App\Events\TicketPurchased;
use Illuminate\Support\Str;

class TicketController extends Controller
{
    public function purchase(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
        ]);

        $event = Event::findOrFail($request->event_id);

        // Check capacity
        if ($event->tickets()->count() >= $event->capacity) {
            return response()->json(['message' => 'Event is sold out'], 400);
        }

        // Create Ticket
        $ticket = Ticket::create([
            'user_id' => $request->user()->id,
            'event_id' => $event->id,
            'purchase_date' => now(),
            'unique_code' => Str::upper(Str::random(10)),
        ]);

        // Dispatch Event
        event(new TicketPurchased($ticket));

        return response()->json([
            'message' => 'Ticket purchased successfully',
            'ticket' => $ticket
        ], 201);
    }
}
