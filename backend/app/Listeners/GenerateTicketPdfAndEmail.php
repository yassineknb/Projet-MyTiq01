<?php

namespace App\Listeners;

use App\Events\TicketPurchased;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use App\Mail\TicketConfirmation;
use Illuminate\Support\Facades\Storage;

class GenerateTicketPdfAndEmail
{
    public function handle(TicketPurchased $event): void
    {
        $ticket = $event->ticket;

        // Generate PDF
        $pdf = Pdf::loadView('emails.ticket_pdf', ['ticket' => $ticket]);
        $pdfName = 'tickets/' . $ticket->unique_code . '.pdf';

        // Save to storage
        Storage::put('public/' . $pdfName, $pdf->output());

        // Update ticket path
        $ticket->update(['pdf_path' => $pdfName]);

        // Send Email
        Mail::to($ticket->user->email)->send(new TicketConfirmation($ticket, $pdf->output()));
    }
}
