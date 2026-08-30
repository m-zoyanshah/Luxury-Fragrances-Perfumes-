import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923132307950"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:bg-green-400"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-500/40" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-ink-soft px-3 py-2 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
