import { site, whatsappLink } from "@/data/site";

const PREFILL = `Hi ${site.shortName}, I'd like to know about membership plans and batch timings.`;

/**
 * Fixed call + WhatsApp buttons. On a local gym site most visitors arrive on a
 * phone already intending to call, so these stay reachable at every scroll
 * position rather than living only in the header.
 */
export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 sm:bottom-7 sm:right-7">
      <a
        href={whatsappLink(PREFILL)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-forest shadow-lg shadow-black/40 transition-colors"
        style={{ height: "3.25rem", width: "3.25rem" }}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.95-.94 1.15-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.35ZM12.04 21.5h-.01a9.44 9.44 0 0 1-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.4 9.4 0 0 1-1.44-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.67 2.77 9.36 9.36 0 0 1 2.76 6.68c0 5.2-4.24 9.45-9.44 9.45ZM20.5 3.49A11.8 11.8 0 0 0 12.04 0C5.5 0 .2 5.31.2 11.84c0 2.09.55 4.13 1.59 5.93L.1 24l6.37-1.67a11.8 11.8 0 0 0 5.66 1.44h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.16-1.23-6.14-3.47-8.38Z" />
        </svg>
      </a>
      <a
        href={`tel:${site.phone}`}
        aria-label={`Call ${site.name} on ${site.phoneDisplay}`}
        className="flex items-center justify-center rounded-full bg-gold shadow-lg shadow-black/40 transition-colors"
        style={{ height: "3.25rem", width: "3.25rem" }}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-ink" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" />
        </svg>
      </a>
    </div>
  );
}
