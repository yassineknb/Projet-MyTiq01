<!DOCTYPE html>
<html>

<head>
    <title>Ticket</title>
    <style>
        body {
            font-family: sans-serif;
            text-align: center;
            border: 2px dashed #333;
            padding: 20px;
        }

        h1 {
            color: #d32f2f;
        }

        .code {
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            margin: 20px 0;
        }

        .details {
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <h1>MyTiq Ticket</h1>
    <h2>{{ $ticket->event->title }}</h2>
    <div class="code">{{ $ticket->unique_code }}</div>
    <div class="details">
        <p><strong>Attendee:</strong> {{ $ticket->user->name }}</p>
        <p><strong>Date:</strong> {{ $ticket->event->date->format('F j, Y g:i A') }}</p>
        <p><strong>Location:</strong> {{ $ticket->event->location }}</p>
        <p><strong>Price:</strong> ${{ $ticket->event->price }}</p>
    </div>
</body>

</html>