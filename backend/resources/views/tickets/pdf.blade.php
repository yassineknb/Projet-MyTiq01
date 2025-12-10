<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Ticket {{ $ticket->unique_code }}</title>
    <style>
        body {
            font-family: sans-serif;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .details {
            margin-bottom: 20px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>{{ $ticket->event->title }}</h1>
        <p>Ticket Code: <strong>{{ $ticket->unique_code }}</strong></p>
    </div>

    <div class="details">
        <p><strong>Date:</strong> {{ $ticket->event->date }}</p>
        <p><strong>Location:</strong> {{ $ticket->event->location }}</p>
        <p><strong>Attendee:</strong> {{ $ticket->user->name }}</p>
        <p><strong>Purchase Date:</strong> {{ $ticket->purchase_date }}</p>
    </div>

    <div class="footer">
        <p>Thank you for your purchase!</p>
    </div>
</body>

</html>