<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;

class EventController extends Controller
{

    public function index()
    {
        return response()->json(Event::all());
    }

    public function show(Event $event)
    {
        return response()->json($event);
    }

    public function store(StoreEventRequest $request)
    {
        $event = Event::create($request->validated());
        return response()->json($event, 201);
    }

    public function update(UpdateEventRequest $request, Event $event)
    {
        $event->update($request->validated());
        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully']);
    }
}
