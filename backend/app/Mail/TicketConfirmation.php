<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $ticket;
    public $pdfContent;

    public function __construct($ticket, $pdfContent)
    {
        $this->ticket = $ticket;
        $this->pdfContent = $pdfContent;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Ticket Confirmation',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.ticket_confirmation',
        );
    }

    public function attachments(): array
    {
        return [
            \Illuminate\Mail\Mailables\Attachment::fromData(fn() => $this->pdfContent, 'ticket.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
