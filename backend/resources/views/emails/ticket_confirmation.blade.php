<!DOCTYPE html>
<html>

<head>
    <title>Ticket Confirmation</title>
</head>

<body>
    <h1>Hello {{ $ticket->user->name }},</h1>
    <p>Thank you for purchasing a ticket for <strong>{{ $ticket->event->title }}</strong>.</p>
    <p>Your unique ticket code is: <strong>{{ $ticket->unique_code }}</strong></p>
    <p>Please find your ticket attached as a PDF.</p>
    <p>Event Date: {{ $ticket->event->date->format('F j, Y g:i A') }}</p>
    <p>Location: {{ $ticket->event->location }}</p>
</body>

</html>