import { WHATSAPP_HREF } from "@/lib/constants";

/** Sitewide floating contact button, pinned to the side on every page —
 * the one always-available way to reach Club 7 directly, independent
 * of whichever booking flow a visitor is or isn't in. */
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Club 7 on WhatsApp"
      className="fixed bottom-24 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_6px_20px_-4px_rgba(0,0,0,0.55)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red md:bottom-7 md:right-7"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.42 1.26 4.86L2 22l5.32-1.28a9.9 9.9 0 0 0 4.72 1.2h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Z"
          fill="#25D366"
        />
        <path
          d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.42 1.26 4.86L2 22l5.32-1.28a9.9 9.9 0 0 0 4.72 1.2h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Z"
          stroke="#128C4A"
          strokeWidth="0.4"
        />
        <path
          d="M8.9 6.98c-.22-.5-.46-.51-.67-.52h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1-1.04 2.46s1.06 2.86 1.21 3.06c.15.2 2.04 3.27 5.04 4.46 2.5.99 3-.08 3.55-.2.55-.11 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.63-1.57-.9-2.14Z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
