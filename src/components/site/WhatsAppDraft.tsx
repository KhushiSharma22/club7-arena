"use client";

export default function WhatsAppDraft({ href, onEdit }: { href: string; onEdit: () => void }) {
  return <div className="whatsapp-draft" role="status">
    <h2>Your WhatsApp draft is ready.</h2>
    <p>Review the details in WhatsApp and tap Send to share them with Club 7. Nothing is sent automatically. The team will confirm availability and payment directly.</p>
    <a href={href} target="_blank" rel="noopener noreferrer">Open WhatsApp again ↗</a>
    <button type="button" onClick={onEdit}>Edit my details</button>
    <p className="whatsapp-draft-help">If WhatsApp didn’t open, use the link above. You can also call <a href="tel:+919911046717">9911046717</a>.</p>
  </div>;
}
