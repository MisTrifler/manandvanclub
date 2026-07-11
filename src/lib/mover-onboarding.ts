import { escapeHtml } from "@/lib/html";

export const PARTNERS_EMAIL = "partners@manandvanclub.co.uk";
export const PARTNERS_REPLY_TO = PARTNERS_EMAIL;

export type MoverApplicationLike = {
  companyName?: unknown;
  company_name?: unknown;
  businessType?: unknown;
  business_type?: unknown;
  companyNumber?: unknown;
  company_number?: unknown;
  contactName?: unknown;
  contact_name?: unknown;
  position?: unknown;
  positionAuthority?: unknown;
  position_authority?: unknown;
  phone?: unknown;
  email?: unknown;
  coverageArea?: unknown;
  coverage_area?: unknown;
  townsCovered?: unknown;
  towns_covered?: unknown;
  radius?: unknown;
  capacity?: unknown;
  servicesOffered?: unknown;
  serviceHouse?: unknown;
  service_house?: unknown;
  serviceFlat?: unknown;
  service_flat?: unknown;
  serviceStudent?: unknown;
  service_student?: unknown;
  serviceFurniture?: unknown;
  service_furniture?: unknown;
  serviceOffice?: unknown;
  service_office?: unknown;
  serviceSingle?: unknown;
  service_single?: unknown;
  serviceLongDistance?: unknown;
  service_long_distance?: unknown;
  hasInsurance?: unknown;
  has_insurance?: unknown;
};

function asText(value: unknown, fallback = ""): string {
  if (value === null || value === undefined) return fallback;
  return String(value).trim() || fallback;
}

function yesNo(value: unknown): string {
  return value === true || value === "true" || value === "on" || value === "yes" ? "Yes" : "No";
}

function safeFilePart(value: unknown, fallback = "mover"): string {
  const cleaned = asText(value, fallback)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return cleaned || fallback;
}

export function getAgreementDate(date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function normaliseMoverApplication(input: MoverApplicationLike) {
  const serviceLabels = getSelectedServiceLabels(input);

  return {
    companyName: asText(input.companyName ?? input.company_name, "[Business / Trading Name]"),
    businessType: asText(input.businessType ?? input.business_type, "[Limited company / Sole trader / Partnership / Other]"),
    companyNumber: asText(input.companyNumber ?? input.company_number, "Not applicable"),
    contactName: asText(input.contactName ?? input.contact_name, "[Full Name]"),
    position: asText(input.position ?? input.positionAuthority ?? input.position_authority, "[Position]"),
    phone: asText(input.phone, "[Mover Phone]"),
    email: asText(input.email, "[Mover Email]"),
    coverageArea: asText(input.coverageArea ?? input.coverage_area, "[Main Service Area]"),
    townsCovered: asText(input.townsCovered ?? input.towns_covered, "[Towns / Postcodes Covered]"),
    radius: asText(input.radius, "[Working Radius]"),
    capacity: asText(input.capacity, "[Weekly Capacity]"),
    servicesOffered: serviceLabels.length ? serviceLabels.join(", ") : asText(input.servicesOffered, "[Services Offered]"),
    hasInsurance: yesNo(input.hasInsurance ?? input.has_insurance),
    fileSlug: safeFilePart(input.companyName ?? input.company_name),
  };
}

export function getSelectedServiceLabels(input: MoverApplicationLike): string[] {
  const services: Array<[unknown, string]> = [
    [input.serviceHouse ?? input.service_house, "House removals"],
    [input.serviceFlat ?? input.service_flat, "Flat moves"],
    [input.serviceStudent ?? input.service_student, "Student moves"],
    [input.serviceFurniture ?? input.service_furniture, "Furniture collection"],
    [input.serviceOffice ?? input.service_office, "Office moves"],
    [input.serviceSingle ?? input.service_single, "Single item delivery"],
    [input.serviceLongDistance ?? input.service_long_distance, "Long distance moves"],
  ];

  return services.filter(([selected]) => selected === true || selected === "true" || selected === "on").map(([, label]) => label);
}

function row(label: string, value: unknown) {
  return `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`;
}

function formRow(label: string, value: unknown) {
  return `<tr><th>${escapeHtml(label)}</th><td class="field">${escapeHtml(value)}</td></tr>`;
}

function section(title: string, body: string) {
  return `<h2>${escapeHtml(title)}</h2>${body}`;
}

function bullets(items: string[]) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function agreementStyles() {
  return `
    body { margin: 0; background: #f3f4f6; color: #111827; font-family: Arial, Helvetica, sans-serif; }
    .page { max-width: 820px; margin: 24px auto; background: #fff; padding: 42px 52px; box-shadow: 0 2px 18px rgba(15, 23, 42, 0.08); }
    .letterhead { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; border-bottom: 2px solid #1B2D4F; padding-bottom: 18px; margin-bottom: 34px; }
    .brand { display: flex; align-items: center; gap: 14px; }
    .mark { width: 48px; height: 48px; border-radius: 6px; background: #1B2D4F; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; letter-spacing: -1px; }
    .mark span { color: #F5781E; }
    .brand-title { color: #1B2D4F; font-size: 26px; font-weight: 800; letter-spacing: -0.3px; line-height: 1; }
    .brand-subtitle { color: #4b5563; font-size: 11px; font-weight: 700; margin-top: 6px; }
    .contact { color: #374151; font-size: 11px; line-height: 1.5; text-align: right; white-space: nowrap; }
    h1 { color: #1B2D4F; font-size: 30px; line-height: 1.15; margin: 0 0 18px; letter-spacing: -0.4px; }
    h2 { color: #1B2D4F; font-size: 17px; margin: 26px 0 8px; line-height: 1.25; }
    p { font-size: 11.5px; line-height: 1.55; margin: 0 0 9px; text-align: justify; }
    ul { margin: 6px 0 12px 20px; padding: 0; }
    li { font-size: 11.5px; line-height: 1.5; margin: 2px 0; text-align: justify; }
    .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
    .meta label { display: block; color: #1B2D4F; font-size: 11px; font-weight: 700; margin-bottom: 4px; }
    .blank, .field { background: #f3f4f6; border: 1px solid #d9dee6; color: #111827; padding: 7px 8px; min-height: 18px; }
    .summary { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px 14px; margin: 16px 0 22px; }
    .summary p { margin: 0; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0 18px; }
    th, td { border: 1px solid #d9dee6; padding: 7px 8px; vertical-align: top; font-size: 11.5px; line-height: 1.35; }
    th { width: 34%; text-align: left; background: #edf2f7; color: #1B2D4F; font-weight: 700; }
    td { background: #fff; }
    .acceptance { margin-top: 28px; }
    .footer { margin-top: 34px; padding-top: 12px; border-top: 1px solid #e5e7eb; color: #64748b; font-size: 10px; text-align: center; }
    @media print { body { background: #fff; } .page { margin: 0; box-shadow: none; max-width: none; } }
  `;
}

export function buildMoverAgreementHtml(input: MoverApplicationLike, agreementDate = getAgreementDate()) {
  const data = normaliseMoverApplication(input);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Man and Van Club Independent Approved Mover Agreement</title>
  <style>${agreementStyles()}</style>
</head>
<body>
  <div class="page">
    <div class="letterhead">
      <div class="brand">
        <div class="mark">M<span>&amp;</span>V</div>
        <div>
          <div class="brand-title">Man and Van Club</div>
          <div class="brand-subtitle">Moving Quote Platform</div>
        </div>
      </div>
      <div class="contact">
        www.manandvanclub.co.uk<br />
        partners@manandvanclub.co.uk<br />
        0121 751 1269
      </div>
    </div>

    <h1>Independent Approved Mover Agreement</h1>
    <div class="meta">
      <div><label>Agreement date:</label><div class="blank">${escapeHtml(agreementDate)}</div></div>
      <div><label>Prepared for:</label><div class="blank">${escapeHtml(data.companyName)}</div></div>
    </div>

    <div class="summary">
      <p><strong>Important summary:</strong> Man and Van Club is a moving quote platform. Man and Van Club does not carry out moves itself. Approved independent movers remain responsible for quoting, communicating with customers and carrying out any accepted booking.</p>
    </div>

    <h2>Parties</h2>
    <table>
      ${row("Platform", "Man and Van Club")}
      ${row("Website", "www.manandvanclub.co.uk")}
      ${row("Email", "partners@manandvanclub.co.uk")}
      ${row("Phone", "0121 751 1269")}
      ${formRow("Mover business / trading name", data.companyName)}
      ${formRow("Business type", data.businessType)}
      ${formRow("Company number, if applicable", data.companyNumber)}
      ${formRow("Name of authorised person", data.contactName)}
      ${formRow("Position", data.position)}
      ${formRow("Contact email", data.email)}
      ${formRow("Contact phone", data.phone)}
      ${formRow("Main service area", data.coverageArea)}
      ${formRow("Towns / postcodes covered", data.townsCovered)}
      ${formRow("Normal working radius", data.radius)}
      ${formRow("Main service types", data.servicesOffered)}
    </table>

    ${section("1. Purpose of this agreement", `
      <p>Man and Van Club operates a platform that helps customers submit man and van, delivery and moving requests and receive quotes from approved independent movers.</p>
      <p>This agreement sets out the terms under which the approved independent mover may receive suitable customer enquiries, submit quotes and carry out bookings introduced through Man and Van Club.</p>
    `)}

    ${section("2. Platform model — Man and Van Club is not the mover", `
      <p>Man and Van Club is a quote request and booking-introduction platform. Man and Van Club does not provide the removals, delivery or man and van service itself.</p>
      <p>Any accepted booking is carried out by the Mover as an independent business. The Mover is responsible for the move, the customer service connected to the move, and any issue arising from how the move is performed.</p>
      <p>The Mover must ensure that its insurance is suitable for the type of work it accepts, including the vehicle, goods carried, staff or subcontractors used, and any moving, delivery, courier or waste-related services provided.</p>
    `)}

    ${section("3. Independent business relationship", `
      <p>The Mover is an independent business. Nothing in this agreement creates an employment relationship, worker relationship, agency, franchise, joint venture, legal partnership or representative relationship between the parties.</p>
      <p>The Mover remains responsible for running its own business and for the success, risk, costs and obligations of that business. The written terms must match the real working relationship.</p>
      <p>The Mover remains responsible for:</p>
      ${bullets([
        "choosing whether to quote for any enquiry;",
        "setting its own final quote and any lawful terms for the service it provides;",
        "providing its own vehicle, equipment, labour, tools and materials;",
        "deciding how to perform the move safely and lawfully;",
        "managing its own tax, accounts, insurance, licences and business obligations;",
        "using its own staff, workers or subcontractors where appropriate and properly insured.",
      ])}
      <p>Man and Van Club does not guarantee any minimum number of enquiries, quotes, bookings or income.</p>
    `)}

    ${section("4. Approval and verification", `
      <p>Before receiving enquiries or customer contact details, the Mover may be asked to provide accurate and up-to-date information for approval and verification, including:</p>
      ${bullets([
        "business or trading name;",
        "contact details;",
        "service areas and normal working radius;",
        "vehicle type, capacity and service types offered;",
        "commercial vehicle insurance suitable for paid moving, delivery or hire-or-reward work;",
        "Goods in Transit insurance where the Mover carries customer goods;",
        "Public Liability insurance where applicable;",
        "licences or registrations required for the services offered, such as waste carrier registration where waste removal is provided;",
        "any other information reasonably required by Man and Van Club.",
      ])}
      <p>The Mover confirms that all documents and information provided to Man and Van Club are accurate, genuine and up to date.</p>
    `)}

    ${section("5. Accuracy of information and platform standards", `
      <p>The Mover confirms that all information provided to Man and Van Club is accurate and will promptly tell Man and Van Club if anything changes, including insurance, contact details, service area, vehicle capacity, staff/subcontractor arrangements or ability to accept work.</p>
      <p>Platform standards include professional communication, valid insurance, accurate business information, fair quoting, reliable attendance, lawful conduct, careful handling of customer belongings, proper use of customer data and reasonable cooperation with complaints or booking issues.</p>
      <p>Man and Van Club may refuse, pause, suspend or remove a Mover if information is inaccurate, insurance expires, complaints are received, customer data is misused or the Mover does not meet platform standards.</p>
      <p>Where the issue is not urgent, serious or safety-related, Man and Van Club will usually give the Mover a reasonable opportunity to respond before permanent removal. Man and Van Club may still suspend access immediately while reviewing serious complaints, insurance concerns, suspected fraud, customer data misuse, safety concerns, repeated no-shows or other serious issues.</p>
    `)}

    ${section("6. Insurance requirements", `
      <p>The Mover must maintain valid insurance suitable for the services it provides.</p>
      <p>Unless Man and Van Club agrees otherwise in writing, the Mover must maintain at least:</p>
      ${bullets([
        "commercial vehicle insurance that covers carrying customer goods for payment, including hire-or-reward, courier, delivery, removals or equivalent business use as applicable;",
        "Goods in Transit insurance of at least £10,000 per load or job where the Mover carries customer goods;",
        "Public Liability insurance of at least £1,000,000 where applicable to the services provided.",
      ])}
      <p>The Mover must ensure that its vehicle insurance is not limited to ordinary social, domestic, commuting or personal business use if the Mover is carrying customer goods for payment.</p>
      <p>The Mover must provide evidence of insurance when requested. Man and Van Club may request updated insurance documents at any time. If insurance expires, cannot be verified or does not appear suitable for the services offered, Man and Van Club may pause or remove access to enquiries and customer details.</p>
      <p>The Mover remains responsible for checking that its insurance covers the actual work accepted, including the vehicle used, goods carried, distance, staff, subcontractors, loading/unloading activity and any waste-related work.</p>
    `)}

    ${section("7. How enquiries work", `
      <p>Customers submit move requests through Man and Van Club. Requests may include postcodes, move date, item details, property/access notes, photos, estimated guide price and contact details.</p>
      <p>Where an enquiry appears suitable, Man and Van Club may offer the enquiry to one approved Mover or a limited number of suitable approved Movers, depending on availability, location, service type and platform requirements.</p>
      <p>The Mover is not required to quote for every enquiry and may decline any enquiry that is unsuitable, unavailable, outside its normal area or outside the services it provides.</p>
      <p>Man and Van Club does not promise exclusivity. Man and Van Club may offer enquiries to other approved movers where appropriate.</p>
    `)}

    ${section("8. Customer contact details", `
      <p>Customer contact details are not released at the initial enquiry stage. The Mover may see limited or anonymised job details so the Mover can decide whether to quote.</p>
      <p>Customer name, phone number, email and full address details are released only after the customer accepts the Mover quote and pays the Booking Deposit through Man and Van Club, unless Man and Van Club has expressly agreed otherwise in writing.</p>
      <p>The Mover must not attempt to obtain customer contact details outside the platform before they are released.</p>
    `)}

    ${section("9. Quotes and pricing", `
      <p>The Mover is responsible for setting its own final quote. Man and Van Club may show the customer an estimated guide price before submission, but that guide price is not binding on the Mover.</p>
      <p>The Mover quote should be based on the details provided by the customer. The quote should be clear, fair and should state whether VAT is included where relevant.</p>
      <p>A quote should only change if:</p>
      ${bullets([
        "the customer information was incomplete or inaccurate;",
        "the customer changes the job;",
        "access, items, distance, waiting time or other material details are different from what was submitted;",
        "the customer requests extra work;",
        "there is another genuine and reasonable reason connected to the booking.",
      ])}
      <p>The Mover must explain any quote change clearly and fairly to the customer.</p>
    `)}

    ${section("10. Booking Deposit and customer payment", `
      <p>When a customer accepts a Mover quote, the customer pays a Booking Deposit to Man and Van Club to secure the booking.</p>
      <p>The Booking Deposit is the amount shown to the customer before payment. It may be a fixed amount, a percentage of the quote, or another amount shown during the booking process.</p>
      <p>Unless otherwise agreed in writing, the Booking Deposit is retained by Man and Van Club as the platform booking and introduction fee.</p>
      <p>The Booking Deposit is deducted from the total amount the customer expects to pay for the booking. The Mover collects the remaining balance directly from the customer on moving day or as otherwise agreed with the customer.</p>
      <p>Example: if the Mover total quote is £300 and the customer pays a £25 Booking Deposit to Man and Van Club, the remaining balance payable to the Mover is £275.</p>
      <p>The Mover agrees not to ask the customer to pay the Booking Deposit amount again unless the customer has changed the job or agreed extra work.</p>
      <p>Man and Van Club may update the Booking Deposit structure, amount or calculation method from time to time. The applicable Booking Deposit for each booking is the amount shown to the customer before payment and, where available, in the booking summary.</p>
    `)}

    ${section("11. No guarantee of enquiries or bookings", `
      <p>Man and Van Club does not guarantee that every enquiry will become a booking, every quote will be accepted, every customer will proceed, a minimum number of enquiries will be available, or any particular income level will be achieved.</p>
      <p>The Mover accepts normal business risk when deciding whether to quote for customer enquiries.</p>
    `)}

    ${section("12. Service standards", `
      <p>The Mover agrees to provide any accepted booking professionally, lawfully and with reasonable care and skill.</p>
      <p>The Mover agrees to:</p>
      ${bullets([
        "communicate politely and promptly;",
        "arrive on time or notify the customer promptly of delays;",
        "handle customer belongings carefully;",
        "avoid unfair surprise charges;",
        "only increase prices where there is a genuine change, missing information or extra work;",
        "comply with applicable laws, safety requirements and insurance obligations;",
        "ensure the vehicle, equipment and staff used are suitable for the job;",
        "not behave abusively, aggressively, dishonestly or in a way that harms customer trust.",
      ])}
    `)}

    ${section("13. Responsibility for the move", `
      <p>The Mover is responsible for carrying out the move and for any loss, damage, delay, injury, complaint, dispute or claim arising from the Mover’s performance of the move.</p>
      <p>Man and Van Club may help with communication or complaint handling, but responsibility for the move remains with the Mover.</p>
      <p>The Mover is responsible for dealing with customer service issues connected to the move, including damage, delay, attendance, conduct, pricing disputes and any claim that should be handled by the Mover or the Mover’s insurer.</p>
    `)}

    ${section("14. Staff, subcontractors and other businesses", `
      <p>The Mover may use its own employees, workers or subcontractors to complete a booking, provided they are suitably trained, insured and legally allowed to perform the work.</p>
      <p>The Mover must not pass a confirmed booking to another business or subcontractor without ensuring they are suitable, insured and legally able to carry out the work.</p>
      <p>Where a different business will attend the booking, the Mover must notify Man and Van Club in advance where reasonably possible.</p>
      <p>The Mover remains fully responsible for the conduct, safety, insurance, service quality and compliance of anyone used to perform the booking.</p>
    `)}

    ${section("15. Cancellations, delays and no-shows", `
      <p>If the Mover cannot attend a confirmed booking, the Mover must notify Man and Van Club and the customer as soon as possible.</p>
      <p>The Mover should not cancel a confirmed booking without a genuine reason.</p>
      <p>A serious no-show may result in immediate suspension while Man and Van Club reviews the issue.</p>
      <p>Two confirmed no-shows within a 12-month period may result in removal from the platform, unless there are exceptional circumstances.</p>
      <p>Repeated late cancellations, no-shows, poor communication or unreliable conduct may result in suspension or removal from the platform.</p>
      <p>Where a customer cancels, Man and Van Club may decide how the Booking Deposit is handled in line with the customer terms and the circumstances of the booking.</p>
    `)}

    ${section("16. Customer data and confidentiality", `
      <p>Customer information provided through Man and Van Club must only be used for the specific enquiry or booking it relates to.</p>
      <p>The Mover must keep customer information secure and must not:</p>
      ${bullets([
        "sell customer data;",
        "share customer data with unauthorised third parties;",
        "use customer details for unrelated marketing;",
        "contact the customer about unrelated services without permission;",
        "store customer data longer than necessary, unless limited retention is needed for legal, accounting or insurance reasons;",
        "misuse customer addresses, phone numbers, emails, photos or personal information.",
      ])}
      <p>The Mover must tell Man and Van Club promptly if customer data is lost, misused, shared with the wrong person, accessed without permission or otherwise compromised.</p>
    `)}

    ${section("17. Data protection roles", `
      <p>Each party is responsible for complying with applicable UK data protection law when handling personal data.</p>
      <p>Man and Van Club and the Mover act as independent controllers for the personal data they each process for their own purposes, unless the parties expressly agree otherwise in writing.</p>
      <p>Man and Van Club is responsible for personal data it collects and uses for the platform, enquiry, quote, booking, payment, support and administration process.</p>
      <p>Once customer contact details are released for an accepted booking, the Mover is responsible for using that customer data fairly, lawfully and only for the purpose of providing the quoted move or dealing with genuine follow-up matters connected to that move.</p>
      <p>The Mover must not treat customer data as a marketing list or use it to promote unrelated services.</p>
      <p>If Man and Van Club reasonably requests information to help respond to a customer data request, complaint, deletion request or security issue, the Mover agrees to cooperate promptly.</p>
    `)}

    ${section("18. Operational notifications", `
      <p>The Mover agrees that Man and Van Club may contact the Mover by email, phone, SMS or WhatsApp about platform matters, including enquiries, quotes, accepted bookings, customer updates, cancellations, complaints, insurance checks and account status.</p>
      <p>The Mover is responsible for keeping its contact details up to date.</p>
      <p>Operational notifications are not a guarantee of enquiries or bookings.</p>
    `)}

    ${section("19. Reviews, complaints and reputation", `
      <p>Man and Van Club may request customer feedback after a booking and may use feedback to assess platform quality, investigate complaints, improve matching and decide whether a Mover remains approved.</p>
      <p>The Mover must not ask customers to leave fake, misleading or incentivised reviews.</p>
      <p>The Mover must not pressure customers to remove honest reviews or complaints.</p>
      <p>The Mover must not misrepresent its relationship with Man and Van Club, including by suggesting that it is employed by, owned by, or formally part of Man and Van Club.</p>
    `)}

    ${section("20. Non-circumvention", `
      <p>If Man and Van Club introduces a customer to the Mover, the Mover must not deliberately bypass the platform for that booking to avoid the Booking Deposit or platform process.</p>
      <p>For 12 months from the date Man and Van Club first introduces a customer to the Mover, the Mover must not deliberately encourage, arrange or accept repeat moving, removals, delivery or man and van bookings from that introduced customer outside the platform where the purpose is to avoid the Man and Van Club booking process or Booking Deposit.</p>
      <p>This does not prevent the Mover from serving:</p>
      ${bullets([
        "its own existing customers who were known to the Mover before Man and Van Club introduced them;",
        "customers who found the Mover independently without an introduction from Man and Van Club;",
        "bookings that Man and Van Club has agreed may be handled outside the platform in writing.",
      ])}
    `)}

    ${section("21. Platform access and system use", `
      <p>Access to Man and Van Club is permission-based and may be changed, paused or withdrawn in line with this agreement and platform requirements.</p>
      <p>The Mover must not misuse the platform, interfere with systems, submit false information, attempt to access unauthorised data, or allow another business to use its access.</p>
      <p>The Mover must keep any login details, access links or platform credentials secure.</p>
    `)}

    ${section("22. Fees and changes to terms", `
      <p>Man and Van Club may update its fees, Booking Deposit structure, operational processes, service standards or platform rules from time to time.</p>
      <p>Where material changes affect the Mover, Man and Van Club will notify the Mover.</p>
      <p>Continued use of the platform after notice of updated terms means the Mover accepts the updated terms.</p>
      <p>If the Mover does not accept updated terms, the Mover may stop using the platform and end this agreement by written notice.</p>
    `)}

    ${section("23. Indemnity", `
      <p>The Mover agrees to indemnify Man and Van Club against claims, losses, damages, complaints, costs, expenses or liabilities suffered or incurred by Man and Van Club to the extent they arise from:</p>
      ${bullets([
        "the Mover’s performance or non-performance of a booking;",
        "loss of or damage to customer goods;",
        "injury, delay, no-show, cancellation or poor service caused by the Mover;",
        "acts or omissions of the Mover’s staff, workers, subcontractors or other businesses used by the Mover;",
        "the Mover’s vehicle, equipment, insurance failure or legal non-compliance;",
        "the Mover’s breach of this agreement;",
        "the Mover’s misuse of customer data.",
      ])}
      <p>This indemnity does not apply to the extent that the claim, loss or liability is caused by Man and Van Club’s own breach, negligence or unlawful conduct.</p>
    `)}

    ${section("24. Limitation of liability", `
      <p>Man and Van Club is not liable for the Mover’s performance of a move, loss or damage caused during a move, customer disputes about service quality, or any failure by the Mover to comply with laws, insurance requirements or this agreement.</p>
      <p>The Mover is responsible for claims, losses, costs or complaints arising from the Mover’s service, staff, subcontractors, vehicle, equipment, breach of this agreement or misuse of customer data.</p>
      <p>Nothing in this agreement limits liability where it would be unlawful to do so.</p>
    `)}

    ${section("25. Ending this agreement", `
      <p>Either party may end this agreement for convenience by giving 7 days’ written notice by email.</p>
      <p>Man and Van Club may suspend or end this agreement immediately if the Mover:</p>
      ${bullets([
        "provides false or misleading information;",
        "loses required insurance;",
        "cannot provide suitable insurance evidence when reasonably requested;",
        "misuses customer data;",
        "repeatedly cancels or fails to attend bookings;",
        "receives serious complaints;",
        "acts dishonestly, abusively, unsafely or unlawfully;",
        "breaches this agreement.",
      ])}
      <p>Where section 5 gives the Mover a reasonable opportunity to respond before permanent removal, Man and Van Club will follow that process unless immediate suspension or termination is reasonably needed because of serious complaints, insurance concerns, suspected fraud, customer data misuse, safety concerns, repeated no-shows, dishonest or unlawful conduct, or another serious breach.</p>
      <p>Any confirmed bookings already accepted should still be handled professionally unless Man and Van Club agrees otherwise.</p>
    `)}

    ${section("26. Notices", `
      <p>Any notice under this agreement may be sent by email.</p>
      <p>Notices to Man and Van Club should be sent to partners@manandvanclub.co.uk.</p>
      <p>Notices to the Mover may be sent to the contact email provided by the Mover during application, onboarding or platform use.</p>
      <p>Each party is responsible for keeping its email address up to date.</p>
    `)}

    ${section("27. Assignment", `
      <p>The Mover must not transfer, assign or pass its rights or obligations under this agreement to another person or business without Man and Van Club’s written agreement.</p>
      <p>Man and Van Club may transfer or assign this agreement as part of a business restructure, sale, transfer of assets or change in platform ownership, provided this does not materially reduce the Mover’s rights under this agreement.</p>
    `)}

    ${section("28. Entire agreement", `
      <p>This agreement forms the agreement between Man and Van Club and the Mover in relation to approved mover access and customer enquiries introduced through the platform.</p>
      <p>It replaces any previous written or verbal discussions about the same subject, unless Man and Van Club and the Mover agree otherwise in writing.</p>
    `)}

    ${section("29. Severability", `
      <p>If any part of this agreement is found to be invalid, unlawful or unenforceable, the remaining parts will continue to apply.</p>
      <p>The parties will, where possible, interpret or replace the affected wording in a way that most closely reflects the original commercial purpose while remaining lawful and enforceable.</p>
    `)}

    ${section("30. Acceptance by email or electronic signature", `
      <p>The Mover may accept this agreement by replying by email with clear confirmation of acceptance or by signing electronically.</p>
      <p>By accepting, the person confirms they are authorised to accept this agreement on behalf of the Mover business.</p>
      <p><strong>Suggested email acceptance wording:</strong></p>
      <p>“I agree to the Man and Van Club Independent Approved Mover Agreement dated ${escapeHtml(agreementDate)} on behalf of ${escapeHtml(data.companyName)}.”</p>
    `)}

    ${section("31. Governing law", `
      <p>This agreement is governed by the laws of England and Wales.</p>
      <p>Any disputes will be handled under the courts of England and Wales unless the parties agree another method of resolving the dispute.</p>
    `)}

    <div class="acceptance">
      <h2>Acceptance record</h2>
      <p>This section may be completed manually or electronically.</p>
      <table>
        ${formRow("Mover business / trading name", data.companyName)}
        ${formRow("Name of authorised person", data.contactName)}
        ${formRow("Position", data.position)}
        ${formRow("Email", data.email)}
        ${formRow("Date", "")}
        ${formRow("Signature or email acceptance", "")}
        ${formRow("Agreement accepted", `Man and Van Club Independent Approved Mover Agreement dated ${agreementDate}`)}
      </table>
    </div>

    <div class="footer">Man and Van Club | Independent Approved Mover Agreement | www.manandvanclub.co.uk</div>
  </div>
</body>
</html>`;
}

export function buildMoverApplicationSummaryHtml(input: MoverApplicationLike, agreementDate = getAgreementDate()) {
  const data = normaliseMoverApplication(input);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>New Mover Application - ${escapeHtml(data.companyName)}</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; color: #111827; margin: 24px; }
    h1 { color: #1B2D4F; margin-bottom: 4px; }
    p { line-height: 1.5; }
    table { border-collapse: collapse; width: 100%; max-width: 760px; margin-top: 18px; }
    th, td { border: 1px solid #d9dee6; padding: 9px 10px; text-align: left; vertical-align: top; font-size: 13px; }
    th { width: 32%; background: #edf2f7; color: #1B2D4F; }
    .note { background: #fff7ed; border: 1px solid #fed7aa; padding: 12px; max-width: 760px; margin-top: 18px; }
  </style>
</head>
<body>
  <h1>New mover application</h1>
  <p><strong>Status:</strong> Pending review</p>
  <p><strong>Agreement date used for attached draft:</strong> ${escapeHtml(agreementDate)}</p>
  <table>
    ${row("Business / trading name", data.companyName)}
    ${row("Business type", data.businessType)}
    ${row("Company number", data.companyNumber)}
    ${row("Name of authorised person", data.contactName)}
    ${row("Position", data.position)}
    ${row("Email", data.email)}
    ${row("Phone", data.phone)}
    ${row("Main service area", data.coverageArea)}
    ${row("Towns / postcodes covered", data.townsCovered)}
    ${row("Normal working radius", data.radius)}
    ${row("Main service types", data.servicesOffered)}
    ${row("Typical weekly capacity", data.capacity)}
    ${row("Insurance confirmation ticked", data.hasInsurance)}
  </table>
  <div class="note">
    <p><strong>Review note:</strong> The attached agreement draft has been pre-filled with the application details above. Do not send it to the mover until the business and insurance documents have been reviewed and approved.</p>
  </div>
</body>
</html>`;
}

export function buildAdminMoverApplicationEmailHtml(input: MoverApplicationLike, agreementDate = getAgreementDate()) {
  const data = normaliseMoverApplication(input);

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 680px; margin: 0 auto; color: #111827; line-height: 1.6;">
      <h2 style="color:#1B2D4F;margin-bottom:8px;">New mover application received</h2>
      <p><strong>${escapeHtml(data.companyName)}</strong> has applied to join Man and Van Club.</p>
      <table style="border-collapse:collapse;width:100%;margin:18px 0;">
        ${row("Contact", `${data.contactName} | ${data.position} | ${data.email} | ${data.phone}`)}
        ${row("Business type", data.businessType)}
        ${row("Company number", data.companyNumber)}
        ${row("Main service area", data.coverageArea)}
        ${row("Towns / postcodes", data.townsCovered)}
        ${row("Radius", data.radius)}
        ${row("Services", data.servicesOffered)}
        ${row("Capacity", data.capacity)}
        ${row("Insurance ticked", data.hasInsurance)}
      </table>
      <p><strong>Attached:</strong></p>
      <ul>
        <li>Application summary</li>
        <li>Pre-filled Independent Approved Mover Agreement draft</li>
      </ul>
      <p>The agreement is for internal review first. Once the business is approved, send the agreement to the mover for signature or email acceptance.</p>
      <p style="font-size:12px;color:#64748b;">Agreement date on draft: ${escapeHtml(agreementDate)}</p>
    </div>
  `;
}

export function buildMoverApplicationReceivedEmailHtml() {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; color: #111827; line-height: 1.6;">
      <h2 style="color:#1B2D4F;margin-bottom:8px;">Application received</h2>
      <p>Thank you for applying to join <strong>Man and Van Club</strong>.</p>
      <p>We have received your application and it is now pending manual review.</p>
      <p>To complete your application, please email your insurance documents to <a href="mailto:${PARTNERS_EMAIL}">${PARTNERS_EMAIL}</a>. You can simply reply to this email with copies of the documents.</p>
      <ul>
        <li>Commercial vehicle insurance suitable for paid moving, delivery or hire-or-reward work</li>
        <li>Goods in Transit insurance where you carry customer goods</li>
        <li>Public Liability insurance where applicable</li>
      </ul>
      <p>If your business is approved, we will send the Independent Approved Mover Agreement for signature or email acceptance before completing onboarding.</p>
      <p>Kind regards,<br /><strong>Man and Van Club</strong><br />Approved Mover Team</p>
      <p style="font-size:12px;color:#64748b;">www.manandvanclub.co.uk</p>
    </div>
  `;
}

export function buildApprovedMoverEmailHtml(input: MoverApplicationLike, agreementDate = getAgreementDate()) {
  const data = normaliseMoverApplication(input);

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; color: #111827; line-height: 1.6;">
      <h2 style="color:#1B2D4F;margin-bottom:8px;">Man and Van Club - approved mover onboarding</h2>
      <p>Hi ${escapeHtml(data.contactName)},</p>
      <p>We have reviewed your business details and are happy to move forward with onboarding <strong>${escapeHtml(data.companyName)}</strong> as an approved independent mover for your service area.</p>
      <p>Before we can complete onboarding or release any customer contact details, please read and accept the attached Independent Approved Mover Agreement.</p>
      <p>The agreement explains how the platform works, including:</p>
      <ul>
        <li>Man and Van Club is a moving quote platform and does not carry out moves itself;</li>
        <li>you remain an independent business;</li>
        <li>you choose whether to quote for each suitable enquiry;</li>
        <li>you set your own final quote;</li>
        <li>customer contact details are only released after the customer accepts your quote and pays the Booking Deposit;</li>
        <li>you are responsible for carrying out the move, customer service, insurance and any damage, loss or service issues connected to the move;</li>
        <li>customer data must only be used for the booking it was provided for.</li>
      </ul>
      <p>Please also make sure your insurance is suitable for the services you provide. This may include commercial vehicle insurance for paid moving, delivery or hire-or-reward work, Goods in Transit insurance and Public Liability insurance.</p>
      <p>If you are happy to proceed, please reply to this email with the following wording:</p>
      <p style="background:#f8fafc;border:1px solid #cbd5e1;padding:12px;"><strong>“I agree to the Man and Van Club Independent Approved Mover Agreement dated ${escapeHtml(agreementDate)} on behalf of ${escapeHtml(data.companyName)}.”</strong></p>
      <p>Please also send any outstanding insurance documents if we have not already received them.</p>
      <p>Kind regards,<br /><strong>V</strong><br />Man and Van Club<br />${PARTNERS_EMAIL}<br />0121 751 1269<br />www.manandvanclub.co.uk</p>
    </div>
  `;
}

export function makeMoverAttachmentFilenames(input: MoverApplicationLike) {
  const data = normaliseMoverApplication(input);
  return {
    summary: `Man_and_Van_Club_Mover_Application_${data.fileSlug}.html`,
    agreement: `Man_and_Van_Club_Independent_Approved_Mover_Agreement_${data.fileSlug}.html`,
  };
}
