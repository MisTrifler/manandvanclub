/**
 * Shared FAQ data for the homepage.
 * Used by both page.tsx (FAQPage JSON-LD schema) and HomeContent.tsx (visible FAQ).
 * Keeping a single source of truth prevents schema–content mismatch.
 */
export const HOME_FAQ_ITEMS = [
  {
    q: "What types of moves can I request?",
    a: "You can request help with single-item collections, furniture delivery, student moves, flat removals, house removals, office moves, same-day jobs and long-distance moves. The form adapts to the type of move you choose.",
  },
  {
    q: "How does matching work?",
    a: "Submit your move details for free. Approved movers see anonymised details and may submit a total quote. You receive one quote review link, pay a booking deposit only if you accept, and that deposit is deducted from the mover quote.",
  },
  {
    q: "Will multiple movers contact me?",
    a: "No. Your details are not shared with multiple companies. They are only released to the mover whose quote you accept.",
  },
  {
    q: "Is there any obligation?",
    a: "No. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote, and that deposit is deducted from the total quote.",
  },
  {
    q: "How quickly will I receive a quote?",
    a: "A verified mover can review your request and send a quote if they can help. Once you accept and pay the booking deposit, the mover receives your details and contacts you directly. You pay the remaining balance on moving day.",
  },
  {
    q: "Are movers verified?",
    a: "We help connect customers with movers who have completed our application and verification process. While we take steps to assess movers in our network, we always recommend that customers conduct their own due diligence before booking, including confirming insurance coverage and obtaining a written quote.",
  },
  {
    q: "What happens after I submit my request?",
    a: "After submitting your request, your contact details remain protected. A verified independent mover can review anonymised details and send a quote. You choose whether to accept or decline.",
  },
  {
    q: "Do I need to pay to submit a move request?",
    a: "No. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote, and that deposit is deducted from the total quote. The remaining balance is paid directly to the mover on moving day.",
  },
];
