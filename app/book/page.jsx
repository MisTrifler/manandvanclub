"use client";

import React, { useEffect, useMemo, useState } from "react";

const BUSINESS_EMAIL = "info@westmidlandscleaner.co.uk";

const serviceGroups = [
  {
    title: "Home cleaning",
    services: [
      {
        label: "Regular House Cleaning",
        value: "Regular House Cleaning",
        baseRate: 30,
        minimumHours: 2,
        helper: "Routine cleaning for kitchens, bathrooms, floors and general rooms."
      },
      {
        label: "Deep Cleaning",
        value: "Deep Cleaning",
        baseRate: 35,
        minimumHours: 3,
        helper: "A more detailed clean for homes that need extra attention."
      }
    ]
  },
  {
    title: "Moving home",
    services: [
      {
        label: "Pre-Move Clean",
        value: "Pre-Move Clean",
        baseRate: 34,
        minimumHours: 3,
        helper: "For cleaning before moving into a property."
      },
      {
        label: "Move-Out Clean",
        value: "Move-Out Clean",
        baseRate: 36,
        minimumHours: 4,
        helper: "For cleaning when leaving a property."
      },
      {
        label: "End of Tenancy Clean",
        value: "End of Tenancy Clean",
        baseRate: 38,
        minimumHours: 4,
        helper: "For tenants, landlords and agents where the expected standard is higher."
      }
    ]
  },
  {
    title: "Property cleaning",
    services: [
      {
        label: "Airbnb Changeover",
        value: "Airbnb Changeover",
        baseRate: 33,
        minimumHours: 2.5,
        helper: "Changeover cleaning for short-stay and holiday let properties."
      },
      {
        label: "Landlord Cleaning",
        value: "Landlord Cleaning",
        baseRate: 35,
        minimumHours: 3,
        helper: "For landlords and property professionals preparing homes."
      },
      {
        label: "After Builders Clean",
        value: "After Builders Clean",
        baseRate: 40,
        minimumHours: 4,
        helper: "For dust and mess after building or renovation work."
      }
    ]
  }
];

const propertyTypes = ["House", "Flat", "Apartment", "Bungalow", "Studio", "Office / commercial"];

const providerPreferenceOptions = [
  {
    value: "business",
    label: "I prefer a cleaning business / company",
    helper:
      "Best for larger cleans, landlord jobs, end-of-tenancy, Airbnb or after-builders cleaning."
  },
  {
    value: "self_employed_cleaner",
    label: "I prefer an independent self-employed cleaner",
    helper:
      "Best for regular domestic cleaning or customers who prefer a more personal service."
  },
  {
    value: "no_preference",
    label: "No preference — match me with the best available approved provider",
    helper:
      "We’ll consider your area, service type, availability and job details."
  }
];

const conditionLevels = [
  {
    label: "Light",
    extraHours: 0,
    helper: "Recently cleaned"
  },
  {
    label: "Standard",
    extraHours: 0,
    helper: "Normal clean"
  },
  {
    label: "Heavy",
    extraHours: 1,
    helper: "Needs extra attention"
  },
  {
    label: "Very heavy",
    extraHours: 2,
    helper: "Heavy build-up"
  }
];

const extraTasks = [
  {
    label: "Inside oven",
    price: 25,
    hours: 0.5,
    icon: "▣"
  },
  {
    label: "Inside fridge",
    price: 15,
    hours: 0.25,
    icon: "▤"
  },
  {
    label: "Interior windows",
    price: 25,
    hours: 0.5,
    icon: "▦"
  },
  {
    label: "Ironing",
    price: 20,
    hours: 0.5,
    icon: "⌁"
  },
  {
    label: "Laundry",
    price: 20,
    hours: 0.5,
    icon: "◌"
  },
  {
    label: "Carpet refresh",
    price: 35,
    hours: 0.75,
    icon: "▥"
  },
  {
    label: "Pets in property",
    price: 10,
    hours: 0,
    icon: "●"
  }
];

const hourChoices = [2, 2.5, 3, 3.5];

const bookingProgressSteps = [
  "Clean type",
  "Property",
  "Extras",
  "Date & details",
  "Review"
];

function getMinimumBookingIsoDate(daysAhead = 2) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + daysAhead);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatFriendlyDate(isoDate) {
  if (!isoDate) return "";

  const date = new Date(`${isoDate}T12:00:00`);

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function formatMoney(value) {
  const number = Number(value || 0);

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(number);
}

function normalisePhone(value) {
  return String(value || "").replace(/\s+/g, "").trim();
}

function getSafeAreaParam(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function getSafeServiceParam(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function getSafePostcodeParam(value) {
  return String(value || "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase()
    .slice(0, 10);
}


function getAreaFromPostcode(postcode) {
  const value = String(postcode || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");

  const districtMatch = value.match(/^[A-Z]{1,2}\d{1,2}/);
  const district = districtMatch ? districtMatch[0] : "";
  const areaMatch = value.match(/^[A-Z]{1,2}/);
  const postcodeArea = areaMatch ? areaMatch[0] : "";

  const exactDistrictAreas = {
    WS1: "Walsall",
    WS2: "Walsall",
    WS3: "Bloxwich",
    WS4: "Walsall",
    WS5: "Walsall",
    WS6: "Walsall",
    WS7: "Burntwood",
    WS8: "Brownhills",
    WS9: "Aldridge",
    WS10: "Darlaston",
    WS11: "Cannock",
    WS12: "Cannock",
    WS13: "Lichfield",
    WS14: "Lichfield",
    WS15: "Rugeley",

    WV1: "Wolverhampton",
    WV2: "Wolverhampton",
    WV3: "Wolverhampton",
    WV4: "Wolverhampton",
    WV5: "Wolverhampton",
    WV6: "Wolverhampton",
    WV7: "Wolverhampton",
    WV8: "Wolverhampton",
    WV9: "Wolverhampton",
    WV10: "Wolverhampton",
    WV11: "Wolverhampton",
    WV12: "Willenhall",
    WV13: "Willenhall",
    WV14: "Bilston",
    WV15: "Bridgnorth",
    WV16: "Bridgnorth",

    DY1: "Dudley",
    DY2: "Dudley",
    DY3: "Dudley",
    DY4: "Tipton",
    DY5: "Brierley Hill",
    DY6: "Kingswinford",
    DY7: "Stourbridge",
    DY8: "Stourbridge",
    DY9: "Stourbridge",
    DY10: "Kidderminster",
    DY11: "Kidderminster",
    DY12: "Bewdley",
    DY13: "Stourport-on-Severn",
    DY14: "Kidderminster",

    CV1: "Coventry",
    CV2: "Coventry",
    CV3: "Coventry",
    CV4: "Coventry",
    CV5: "Coventry",
    CV6: "Coventry",
    CV7: "Coventry",
    CV8: "Kenilworth",
    CV9: "Atherstone",
    CV10: "Nuneaton",
    CV11: "Nuneaton",
    CV12: "Bedworth",
    CV21: "Rugby",
    CV22: "Rugby",
    CV23: "Rugby",
    CV31: "Leamington Spa",
    CV32: "Leamington Spa",
    CV33: "Leamington Spa",
    CV34: "Warwick",
    CV35: "Warwick",
    CV37: "Stratford-upon-Avon",
    CV47: "Southam",

    B60: "Bromsgrove",
    B61: "Bromsgrove",
    B62: "Halesowen",
    B63: "Halesowen",
    B64: "Cradley Heath",
    B65: "Rowley Regis",
    B66: "Smethwick",
    B67: "Smethwick",
    B68: "Oldbury",
    B69: "Oldbury",
    B70: "West Bromwich",
    B71: "West Bromwich",
    B72: "Sutton Coldfield",
    B73: "Sutton Coldfield",
    B74: "Sutton Coldfield",
    B75: "Sutton Coldfield",
    B76: "Sutton Coldfield",
    B77: "Tamworth",
    B78: "Tamworth",
    B79: "Tamworth",
    B80: "Studley",
    B90: "Solihull",
    B91: "Solihull",
    B92: "Solihull",
    B93: "Solihull",
    B94: "Solihull"
  };

  if (exactDistrictAreas[district]) {
    return exactDistrictAreas[district];
  }

  if (postcodeArea === "B") return "Birmingham";
  if (postcodeArea === "WS") return "Walsall";
  if (postcodeArea === "WV") return "Wolverhampton";
  if (postcodeArea === "DY") return "Dudley";
  if (postcodeArea === "CV") return "Coventry";
  if (postcodeArea === "ST") return "Staffordshire";
  if (postcodeArea === "WR") return "Worcestershire";
  if (postcodeArea === "TF") return "Telford";

  return "";
}

function getAllServices() {
  return serviceGroups.flatMap((group) => group.services);
}

function calculateFeePercent(jobSize) {
  return 15;
}

function getProviderPreferenceSummary(value) {
  const option =
    providerPreferenceOptions.find((item) => item.value === value) ||
    providerPreferenceOptions.find((item) => item.value === "no_preference");

  return option?.label || "No preference — match me with the best available approved provider";
}

function createQuoteReference() {
  return `WMC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function roundHalf(value) {
  return Math.ceil(Number(value || 0) * 2) / 2;
}

function roundMoney(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function getSavedReference(data, fallbackReference) {
  return (
    data?.job?.quote_reference ||
    data?.job?.quoteReference ||
    data?.quote_reference ||
    data?.quoteReference ||
    fallbackReference
  );
}

function getSavedCustomerTotal(data, fallbackTotal) {
  const possibleValues = [
    data?.job?.customer_total_price,
    data?.job?.customerTotalPrice,
    data?.customer_total_price,
    data?.customerTotalPrice,
    fallbackTotal
  ];

  for (const value of possibleValues) {
    const number = Number(value);

    if (Number.isFinite(number) && number >= 0) {
      return Math.round(number * 100) / 100;
    }
  }

  return fallbackTotal;
}

function BookingProgress({ currentStep }) {
  const currentStepLabel = bookingProgressSteps[currentStep - 1] || "Booking details";

  return (
    <div className="bookingProgressWrap" aria-label={`Booking progress: step ${currentStep} of ${bookingProgressSteps.length}, ${currentStepLabel}`}>
      <div className="bookingProgressSummary">
        Step {currentStep} of {bookingProgressSteps.length}: <strong>{currentStepLabel}</strong>
      </div>

      <div className="bookingProgressInner">
        {bookingProgressSteps.map((step, index) => (
          <div
            key={step}
            className={
              index + 1 === currentStep
                ? "bookingProgressStep active"
                : index + 1 < currentStep
                ? "bookingProgressStep complete"
                : "bookingProgressStep"
            }
            aria-current={index + 1 === currentStep ? "step" : undefined}
          >
            <span className="bookingProgressCircle">{index + 1 < currentStep ? "✓" : ""}</span>
            <span className="bookingProgressText">{step}</span>
          </div>
        ))}
      </div>

      <div className="bookingProgressLine">
        <span style={{ width: `${(currentStep / bookingProgressSteps.length) * 100}%` }} />
      </div>
    </div>
  );
}

export default function BookPage() {
  const minimumBookingDate = getMinimumBookingIsoDate(2);

  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState({
    serviceType: "Regular House Cleaning",
    providerPreference: "no_preference",
    propertyType: "House",
    bedrooms: 1,
    bathrooms: 1,
    frequency: "One-off",
    conditionLevel: "Standard",
    selectedHours: 2,
    useRecommendedHours: true,
    cleaningProducts: "customer_provides",
    preferredDate: "",
    preferredTime: "",
    isFlexible: false,
    selectedExtras: [],
    customerName: "",
    phone: "",
    customerEmail: "",
    propertyAddress: "",
    postcode: "",
    areaTown: "",
    notes: "",
    accessNotes: "",
    parkingNotes: "",
    understands: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const postcodeFromUrl = getSafePostcodeParam(params.get("postcode"));
    const areaFromUrl = getSafeAreaParam(params.get("area")) || getAreaFromPostcode(postcodeFromUrl);
    const serviceFromUrl = getSafeServiceParam(params.get("service"));
    const matchingService = getAllServices().find((service) => service.value === serviceFromUrl);

    if (!areaFromUrl && !postcodeFromUrl && !matchingService) return;

    setForm((previous) => ({
      ...previous,
      postcode: previous.postcode.trim() ? previous.postcode : postcodeFromUrl,
      areaTown: previous.areaTown.trim() ? previous.areaTown : areaFromUrl,
      serviceType: matchingService ? matchingService.value : previous.serviceType,
      useRecommendedHours: matchingService ? true : previous.useRecommendedHours
    }));
  }, []);

  const selectedService = useMemo(() => {
    return getAllServices().find((service) => service.value === form.serviceType) || getAllServices()[0];
  }, [form.serviceType]);

  const recommendedHours = useMemo(() => {
    const bedrooms = Number(form.bedrooms || 0);
    const bathrooms = Number(form.bathrooms || 0);
    const condition = conditionLevels.find((item) => item.label === form.conditionLevel) || conditionLevels[1];

    let hours = Number(selectedService.minimumHours || 2);

    if (bedrooms > 1) {
      hours += (bedrooms - 1) * 0.5;
    }

    if (bathrooms > 1) {
      hours += (bathrooms - 1) * 0.5;
    }

    hours += condition.extraHours;

    for (const extra of extraTasks) {
      if (form.selectedExtras.includes(extra.label)) {
        hours += extra.hours;
      }
    }

    return Math.max(2, roundHalf(hours));
  }, [
    selectedService,
    form.bedrooms,
    form.bathrooms,
    form.conditionLevel,
    form.selectedExtras
  ]);

  const pricing = useMemo(() => {
    const hours = form.useRecommendedHours
      ? recommendedHours
      : Math.max(2, Number(form.selectedHours || 2));

    const hourlyRate = Number(selectedService.baseRate || 30);
    const cleaningProductsFee = form.cleaningProducts === "wmc_provides" ? 6 : 0;

    const selectedExtraItems = extraTasks.filter((extra) => form.selectedExtras.includes(extra.label));
    const extrasTotal = selectedExtraItems.reduce((total, extra) => total + extra.price, 0);

    const cleaningOnly = roundMoney(hours * hourlyRate);
    const customerTotal = roundMoney(cleaningOnly + extrasTotal + cleaningProductsFee);

    let jobSize = "small";

    if (customerTotal >= 220 || hours >= 5) {
      jobSize = "large";
    } else if (customerTotal >= 100 || hours >= 3) {
      jobSize = "medium";
    }

    const wmcFeePercent = calculateFeePercent(jobSize);
    const wmcFeeAmount = roundMoney((customerTotal * wmcFeePercent) / 100);
    const cleanerPayout = roundMoney(customerTotal - wmcFeeAmount);

    return {
      hours,
      hourlyRate,
      cleaningOnly,
      extrasTotal,
      cleaningProductsFee,
      customerTotal,
      jobSize,
      wmcFeePercent,
      wmcFeeAmount,
      cleanerPayout
    };
  }, [
    form.useRecommendedHours,
    form.selectedHours,
    form.selectedExtras,
    form.cleaningProducts,
    recommendedHours,
    selectedService
  ]);

  const selectedExtrasLabel = form.selectedExtras.length ? form.selectedExtras.join(", ") : "None selected";

  function update(field, value) {
    setErrorMessage("");

    setFieldErrors((current) => ({
      ...current,
      [field]: ""
    }));

    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function adjustNumber(field, amount, minimum = 0) {
    setForm((current) => ({
      ...current,
      [field]: Math.max(minimum, Number(current[field] || 0) + amount),
      useRecommendedHours: true
    }));
  }

  function chooseHours(hours) {
    setForm((current) => ({
      ...current,
      selectedHours: hours,
      useRecommendedHours: false
    }));
  }

  function chooseRecommendedHours() {
    setForm((current) => ({
      ...current,
      selectedHours: recommendedHours,
      useRecommendedHours: true
    }));
  }

  function toggleExtra(label) {
    setErrorMessage("");

    setForm((current) => {
      const selectedExtras = current.selectedExtras.includes(label)
        ? current.selectedExtras.filter((item) => item !== label)
        : [...current.selectedExtras, label];

      return {
        ...current,
        selectedExtras,
        useRecommendedHours: true
      };
    });
  }

  function validateStep(step) {
    const errors = {};

    if (step === 1) {
      if (!form.serviceType) errors.serviceType = "Please choose a cleaning service.";
    }

    if (step === 2) {
      if (!form.propertyAddress.trim()) errors.propertyAddress = "Please enter the property address.";
      if (!form.postcode.trim()) errors.postcode = "Please enter your postcode.";
      if (!form.areaTown.trim()) errors.areaTown = "Please enter your area or town.";
      if (!form.propertyType) errors.propertyType = "Please choose a property type.";
    }

    if (step === 4) {
      if (!form.preferredDate) errors.preferredDate = "Please choose a preferred date.";

      if (form.preferredDate && form.preferredDate < minimumBookingDate) {
        errors.preferredDate = `Please choose ${formatFriendlyDate(minimumBookingDate)} or later so providers have time to review and quote.`;
      }

      if (!form.preferredTime.trim()) errors.preferredTime = "Please enter a preferred time.";
      if (!form.customerName.trim()) errors.customerName = "Please enter your name.";
      if (!normalisePhone(form.phone)) errors.phone = "Please enter your phone number.";
      if (!form.customerEmail.trim()) errors.customerEmail = "Please enter your email address.";
    }

    if (step === 5) {
      if (!form.understands) {
        errors.understands = "Please confirm you understand this is a quote request, not a confirmed booking.";
      }
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function goToNextStep() {
    if (!validateStep(currentStep)) {
      setErrorMessage("Please check the highlighted details before continuing.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setErrorMessage("");
    setCurrentStep((step) => Math.min(5, step + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToPreviousStep() {
    setErrorMessage("");
    setCurrentStep((step) => Math.max(1, step - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitBooking(event) {
    event.preventDefault();

    if (!validateStep(5)) {
      setErrorMessage("Please check the highlighted details before submitting your request.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    const quoteReference = createQuoteReference();

    const notesWithBookingDetails = [
      `Property address: ${form.propertyAddress.trim()}, ${form.areaTown.trim()}, ${form.postcode.trim().toUpperCase()}`,
      `Customer provider preference: ${getProviderPreferenceSummary(form.providerPreference)}`,
      form.notes.trim(),
      `Selected hours: ${pricing.hours}`,
      `Hourly guide rate: ${formatMoney(pricing.hourlyRate)}`,
      `Cleaning products: ${
        form.cleaningProducts === "wmc_provides"
          ? "WMC/cleaner partner to provide basic sprays and cloths where available"
          : "Customer will provide products/equipment"
      }`,
      "Frequency: One-off only",
      "If repeat cleaning is wanted, customer can request this later in notes.",
      `Selected extras: ${selectedExtrasLabel}`
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      quoteReference,
      quote_reference: quoteReference,

      serviceType: form.serviceType,
      service_type: form.serviceType,
      providerPreference: form.providerPreference,
      provider_preference: form.providerPreference,
      providerPreferenceLabel: getProviderPreferenceSummary(form.providerPreference),
      provider_preference_label: getProviderPreferenceSummary(form.providerPreference),

      propertyType: form.propertyType,
      property_type: form.propertyType,

      bedrooms: Number(form.bedrooms || 0),
      bathrooms: Number(form.bathrooms || 0),
      frequency: "One-off",
      conditionLevel: form.conditionLevel,
      condition_level: form.conditionLevel,

      preferredDate: form.preferredDate,
      preferred_date: form.preferredDate,

      preferredTime: form.preferredTime,
      preferred_time: form.preferredTime,

      isFlexible: form.isFlexible,
      is_flexible: form.isFlexible,

      isUrgent: false,
      is_urgent: false,

      customerName: form.customerName.trim(),
      customer_name: form.customerName.trim(),

      phone: form.phone.trim(),
      customerPhone: form.phone.trim(),
      customer_phone: form.phone.trim(),

      customerEmail: form.customerEmail.trim(),
      customer_email: form.customerEmail.trim(),

      propertyAddress: form.propertyAddress.trim(),
      property_address: form.propertyAddress.trim(),

      postcode: form.postcode.trim().toUpperCase(),
      areaTown: form.areaTown.trim(),
      area_town: form.areaTown.trim(),

      extras: selectedExtrasLabel,
      notes: notesWithBookingDetails,
      accessNotes: [`Full address: ${form.propertyAddress.trim()}, ${form.areaTown.trim()}, ${form.postcode.trim().toUpperCase()}`, form.accessNotes.trim()].filter(Boolean).join("\n"),
      access_notes: [`Full address: ${form.propertyAddress.trim()}, ${form.areaTown.trim()}, ${form.postcode.trim().toUpperCase()}`, form.accessNotes.trim()].filter(Boolean).join("\n"),
      parkingNotes: form.parkingNotes.trim(),
      parking_notes: form.parkingNotes.trim(),

      customerTotalPrice: pricing.customerTotal,
      customer_total_price: pricing.customerTotal,

      wmcFeePercent: pricing.wmcFeePercent,
      wmc_fee_percent: pricing.wmcFeePercent,

      wmcFeeAmount: pricing.wmcFeeAmount,
      wmc_fee_amount: pricing.wmcFeeAmount,

      cleanerPayout: pricing.cleanerPayout,
      cleaner_payout: pricing.cleanerPayout,

      estimatedHours: pricing.hours,
      estimated_hours: pricing.hours,

      jobSize: pricing.jobSize,
      job_size: pricing.jobSize,

      jobStatus: "submitted",
      job_status: "submitted",

      paymentStatus: "not_paid",
      payment_status: "not_paid"
    };

    try {
      const response = await fetch("/api/marketplace/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || `Could not submit booking request. Server status: ${response.status}`);
        setSubmitting(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const finalReference = getSavedReference(data, quoteReference);
      const savedCustomerTotal = getSavedCustomerTotal(data, pricing.customerTotal);

      window.location.href = `/book/success?reference=${encodeURIComponent(
        finalReference
      )}&estimate=${encodeURIComponent(savedCustomerTotal)}`;
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong submitting your booking request.");
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className="page">
      <section className="section shell" id="post-job">
        <BookingProgress currentStep={currentStep} />

        <div className="quoteGrid wizardQuoteGrid">
          <form className="card formCard wizardFormCard" onSubmit={submitBooking}>
            {errorMessage && (
              <div className="warningBox" style={{ marginBottom: 22 }}>
                {errorMessage}
              </div>
            )}

            {currentStep === 1 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 1 of 5</p>

                <h1 className="bookFormTitle">
                  {form.areaTown.trim()
                    ? `What do you need cleaned in ${form.areaTown.trim()}?`
                    : form.postcode.trim()
                      ? "What do you need cleaned in your local area?"
                      : "What do you need cleaned?"}
                </h1>

                <p className="bookFormIntro">
                  Choose the cleaning service you need and tell us your provider preference. You can review the details before submitting.
                </p>

                <div className="grid3" style={{ marginTop: 18 }}>
                  {serviceGroups.map((group) => (
                    <div key={group.title} className="guideBox">
                      <strong>{group.title}</strong>

                      <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                        {group.services.map((service) => {
                          const active = form.serviceType === service.value;

                          return (
                            <button
                              key={service.value}
                              type="button"
                              onClick={() =>
                                setForm((current) => ({
                                  ...current,
                                  serviceType: service.value,
                                  useRecommendedHours: true
                                }))
                              }
                              className={active ? "btn btnPrimary" : "btn btnSecondary"}
                              style={{
                                width: "100%",
                                justifyContent: "flex-start",
                                textAlign: "left"
                              }}
                            >
                              {service.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="notice" style={{ marginTop: 18 }}>
                  <strong>{selectedService.label}</strong>
                  <br />
                  {selectedService.helper}
                </div>

                <div className="guideBox" style={{ marginTop: 18 }}>
                  <p className="kicker">Provider preference</p>
                  <h2 style={{ marginTop: 0 }}>Who would you prefer to carry out the clean?</h2>
                  <p>
                    West Midlands Cleaner is a local cleaning marketplace. Your clean may be
                    carried out by an approved independent self-employed cleaner or an approved
                    cleaning business partner. Please tell us your preference.
                  </p>

                  <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                    {providerPreferenceOptions.map((option) => {
                      const active = form.providerPreference === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => update("providerPreference", option.value)}
                          className={active ? "btn btnPrimary" : "btn btnSecondary"}
                          style={{
                            width: "100%",
                            justifyContent: "flex-start",
                            textAlign: "left",
                            display: "grid",
                            gap: 4
                          }}
                        >
                          <strong>{option.label}</strong>
                          <span style={{ fontWeight: 600 }}>{option.helper}</span>
                        </button>
                      );
                    })}
                  </div>

                  <small>
                    Your preference helps suitable providers understand the job, but availability may vary. If your preferred provider type is not available, you can still review any other suitable provider quotes before choosing whether to book.
                  </small>
                </div>

              </section>
            )}

            {currentStep === 2 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 2 of 5</p>

                <h1 className="bookFormTitle">Tell us about the property</h1>

                <p className="bookFormIntro">
                  Add the property location, type, condition, bedrooms and bathrooms.
                </p>

                <div className="formGrid" style={{ marginTop: 18 }}>
                  <label className="field" style={{ gridColumn: "1 / -1" }}>
                    <span>Property address</span>
                    <input
                      value={form.propertyAddress}
                      onChange={(event) => update("propertyAddress", event.target.value)}
                      placeholder="House number, street and any flat or apartment details"
                      autoComplete="address-line1"
                      enterKeyHint="next"
                    />
                    <small>This is required so the selected approved provider knows where to attend after confirmation.</small>
                    {fieldErrors.propertyAddress && <small>{fieldErrors.propertyAddress}</small>}
                  </label>

                  <label className="field">
                    <span>Postcode</span>
                    <input
                      value={form.postcode}
                      onChange={(event) => update("postcode", event.target.value)}
                      placeholder="Enter postcode"
                      autoComplete="postal-code"
                      inputMode="text"
                      autoCapitalize="characters"
                      enterKeyHint="next"
                    />
                    {fieldErrors.postcode && <small>{fieldErrors.postcode}</small>}
                  </label>

                  <label className="field">
                    <span>Area / town</span>
                    <input
                      value={form.areaTown}
                      onChange={(event) => update("areaTown", event.target.value)}
                      placeholder="Example: Walsall"
                      autoComplete="address-level2"
                      enterKeyHint="next"
                    />
                    {fieldErrors.areaTown && <small>{fieldErrors.areaTown}</small>}
                  </label>

                  <label className="field">
                    <span>Property type</span>
                    <select
                      value={form.propertyType}
                      onChange={(event) => update("propertyType", event.target.value)}
                    >
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.propertyType && <small>{fieldErrors.propertyType}</small>}
                  </label>

                  <label className="field">
                    <span>Condition</span>
                    <select
                      value={form.conditionLevel}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          conditionLevel: event.target.value,
                          useRecommendedHours: true
                        }))
                      }
                    >
                      {conditionLevels.map((condition) => (
                        <option key={condition.label} value={condition.label}>
                          {condition.label} — {condition.helper}
                        </option>
                      ))}
                    </select>
                    <small>Light = recently cleaned. Standard = normal clean. Heavy = extra attention.</small>
                  </label>
                </div>

                <div className="grid2" style={{ marginTop: 18 }}>
                  <div className="guideBox">
                    <strong>Bedrooms</strong>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "64px 1fr 64px",
                        marginTop: 14,
                        border: "1px solid #d8e1ea",
                        borderRadius: 14,
                        overflow: "hidden"
                      }}
                    >
                      <button
                        type="button"
                        className="btn btnSecondary"
                        style={{ borderRadius: 0 }}
                        onClick={() => adjustNumber("bedrooms", -1, 0)}
                      >
                        −
                      </button>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900
                        }}
                      >
                        {form.bedrooms}
                      </div>

                      <button
                        type="button"
                        className="btn btnSecondary"
                        style={{ borderRadius: 0 }}
                        onClick={() => adjustNumber("bedrooms", 1, 0)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="guideBox">
                    <strong>Bathrooms</strong>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "64px 1fr 64px",
                        marginTop: 14,
                        border: "1px solid #d8e1ea",
                        borderRadius: 14,
                        overflow: "hidden"
                      }}
                    >
                      <button
                        type="button"
                        className="btn btnSecondary"
                        style={{ borderRadius: 0 }}
                        onClick={() => adjustNumber("bathrooms", -1, 1)}
                      >
                        −
                      </button>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 900
                        }}
                      >
                        {form.bathrooms}
                      </div>

                      <button
                        type="button"
                        className="btn btnSecondary"
                        style={{ borderRadius: 0 }}
                        onClick={() => adjustNumber("bathrooms", 1, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {currentStep === 3 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 3 of 5</p>

                <h1 className="bookFormTitle">Hours and extras</h1>

                <p className="bookFormIntro">
                  Choose the time needed and add any extra tasks.
                </p>

                <div className="notice" style={{ marginBottom: 18 }}>
                  Recommended: <strong>{recommendedHours} hours</strong>. Regular cleaning starts from
                  a 2-hour minimum.
                </div>

                <div className="grid3" style={{ marginBottom: 18 }}>
                  {hourChoices.map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => chooseHours(hours)}
                      className={
                        !form.useRecommendedHours && Number(form.selectedHours) === hours
                          ? "btn btnPrimary"
                          : "btn btnSecondary"
                      }
                    >
                      {hours.toFixed(1)} hours
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => chooseHours(Math.max(4, recommendedHours))}
                    className={
                      !form.useRecommendedHours && Number(form.selectedHours) >= 4
                        ? "btn btnPrimary"
                        : "btn btnSecondary"
                    }
                  >
                    More
                  </button>

                  <button
                    type="button"
                    onClick={chooseRecommendedHours}
                    className={form.useRecommendedHours ? "btn btnGreen" : "btn btnSecondary"}
                  >
                    Use recommended
                  </button>
                </div>

                <p className="kicker" style={{ marginTop: 24 }}>
                  Optional extras
                </p>

                <div className="grid3">
                  {extraTasks.map((extra) => {
                    const active = form.selectedExtras.includes(extra.label);

                    return (
                      <button
                        key={extra.label}
                        type="button"
                        onClick={() => toggleExtra(extra.label)}
                        className={active ? "btn btnPrimary" : "btn btnSecondary"}
                        style={{
                          minHeight: 110,
                          display: "grid",
                          alignContent: "center",
                          gap: 8,
                          textAlign: "center"
                        }}
                      >
                        <span style={{ fontSize: 26 }}>{extra.icon}</span>
                        <strong>{extra.label}</strong>
                        <span>+{formatMoney(extra.price)}</span>
                      </button>
                    );
                  })}
                </div>

                <p className="kicker" style={{ marginTop: 24 }}>
                  Cleaning products
                </p>

                <div className="grid2">
                  <button
                    type="button"
                    onClick={() => update("cleaningProducts", "customer_provides")}
                    className={form.cleaningProducts === "customer_provides" ? "btn btnPrimary" : "btn btnSecondary"}
                  >
                    I will provide products
                  </button>

                  <button
                    type="button"
                    onClick={() => update("cleaningProducts", "wmc_provides")}
                    className={form.cleaningProducts === "wmc_provides" ? "btn btnPrimary" : "btn btnSecondary"}
                  >
                    Cleaner brings basic products (+£6)
                  </button>
                </div>

                <p className="muted" style={{ marginTop: 12 }}>
                  Basic products may include sprays and cloths. Vacuum, mop, bucket or specialist
                  products may still need to be provided unless agreed before booking.
                </p>
              </section>
            )}

            {currentStep === 4 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 4 of 5</p>

                <h1 className="bookFormTitle">Date and contact details</h1>

                <p className="bookFormIntro">
                  Add your preferred date, time and contact details.
                </p>

                <div className="notice" style={{ marginBottom: 18 }}>
                  Choose a preferred date at least 2 days ahead so suitable approved providers have time to review your request and send quotes where available. If your timing is flexible, tick the box below to improve your chance of receiving quotes.
                </div>

                <div className="formGrid">
                  <label className="field">
                    <span>Preferred date</span>
                    <input
                      type="date"
                      min={minimumBookingDate}
                      value={form.preferredDate}
                      onChange={(event) => update("preferredDate", event.target.value)}
                    />
                    {fieldErrors.preferredDate && <small>{fieldErrors.preferredDate}</small>}
                  </label>

                  <label className="field">
                    <span>Preferred time</span>
                    <input
                      value={form.preferredTime}
                      onChange={(event) => update("preferredTime", event.target.value)}
                      placeholder="Example: 10am"
                      autoComplete="off"
                      enterKeyHint="next"
                    />
                    {fieldErrors.preferredTime && <small>{fieldErrors.preferredTime}</small>}
                  </label>
                </div>

                <label className="checkbox" style={{ marginBottom: 18 }}>
                  <input
                    type="checkbox"
                    checked={form.isFlexible}
                    onChange={(event) => update("isFlexible", event.target.checked)}
                  />
                  My date or time is flexible by 1–2 days
                </label>

                <div className="formGrid">
                  <label className="field">
                    <span>Your name</span>
                    <input
                      value={form.customerName}
                      onChange={(event) => update("customerName", event.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      enterKeyHint="next"
                    />
                    {fieldErrors.customerName && <small>{fieldErrors.customerName}</small>}
                  </label>

                  <label className="field">
                    <span>Phone / WhatsApp number</span>
                    <input
                      type="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      enterKeyHint="next"
                    />
                    {fieldErrors.phone && <small>{fieldErrors.phone}</small>}
                  </label>

                  <label className="field">
                    <span>Email address</span>
                    <input
                      type="email"
                      value={form.customerEmail}
                      onChange={(event) => update("customerEmail", event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      inputMode="email"
                      enterKeyHint="done"
                      required
                    />
                    {fieldErrors.customerEmail && <small>{fieldErrors.customerEmail}</small>}
                  </label>
                </div>

                <details className="guideBox" style={{ marginTop: 18 }}>
                  <summary style={{ cursor: "pointer", fontWeight: 900 }}>
                    Add notes, access or parking details
                  </summary>

                  <div style={{ marginTop: 18 }}>
                    <label className="field">
                      <span>Customer notes</span>
                      <textarea
                        value={form.notes}
                        onChange={(event) => update("notes", event.target.value)}
                        placeholder="Tell us anything important about the cleaning job. You can also mention if you may want repeat cleaning later."
                        autoComplete="off"
                      />
                    </label>

                    <label className="field">
                      <span>Access notes</span>
                      <textarea
                        value={form.accessNotes}
                        onChange={(event) => update("accessNotes", event.target.value)}
                        placeholder="Keys, code, customer present, agent access, etc."
                        autoComplete="off"
                      />
                    </label>

                    <label className="field">
                      <span>Parking notes</span>
                      <textarea
                        value={form.parkingNotes}
                        onChange={(event) => update("parkingNotes", event.target.value)}
                        placeholder="Driveway, permit, paid parking, restricted parking, etc."
                        autoComplete="off"
                      />
                    </label>
                  </div>
                </details>
              </section>
            )}

            {currentStep === 5 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 5 of 5</p>

                <h1 className="bookFormTitle">Review and submit</h1>

                <p className="bookFormIntro">
                  Check your guide price only. No payment is taken now. Approved providers may review the safe job details and submit their own quotes before you choose who to book.
                </p>

                <div className="guideBox" style={{ marginBottom: 18 }}>
                  <strong>Guide price only:</strong>{" "}
                  <span style={{ fontSize: 30, fontWeight: 950 }}>
                    {formatMoney(pricing.customerTotal)}
                  </span>
                  <br />
                  <strong>Service:</strong> {form.serviceType}
                  <br />
                  <strong>Provider preference:</strong> {getProviderPreferenceSummary(form.providerPreference)}
                  <br />
                  <strong>Property:</strong> {form.bedrooms} bedroom
                  {Number(form.bedrooms) === 1 ? "" : "s"}, {form.bathrooms} bathroom
                  {Number(form.bathrooms) === 1 ? "" : "s"}
                  <br />
                  <strong>Address:</strong> {form.propertyAddress || "Not provided"}, {form.areaTown || "Not provided"} {form.postcode || ""}
                  <br />
                  <strong>Hours:</strong> {pricing.hours}
                  <br />
                  <strong>Extras:</strong> {selectedExtrasLabel}
                  <br />
                  <strong>Date:</strong>{" "}
                  {form.preferredDate ? formatFriendlyDate(form.preferredDate) : "Not selected"}
                  <br />
                  <strong>Time:</strong> {form.preferredTime || "Not selected"}
                </div>

                <details className="notice" style={{ marginBottom: 18 }}>
                  <summary style={{ cursor: "pointer", fontWeight: 900 }}>
                    View price breakdown
                  </summary>

                  <div style={{ marginTop: 12 }}>
                    Cleaning: {pricing.hours} hours × {formatMoney(pricing.hourlyRate)} ={" "}
                    {formatMoney(pricing.cleaningOnly)}
                    <br />
                    Extras: {formatMoney(pricing.extrasTotal)}
                    <br />
                    Products: {formatMoney(pricing.cleaningProductsFee)}
                    <br />
                    Job size: {pricing.jobSize}
                  </div>
                </details>

                <div className="notice" style={{ marginBottom: 18 }}>
                  No payment is taken now. Your request is posted to suitable approved providers. Providers can review the safe job details and guide price only, then submit their own quotes. You will be emailed when quotes are available so you can compare, choose and pay securely.
                </div>

                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={form.understands}
                    onChange={(event) => update("understands", event.target.checked)}
                  />
                  I understand this is a quote request, not a confirmed booking. Approved providers may review the safe job details and guide price only, then submit their own quotes. I can compare available quotes and choose a provider before paying.
                </label>

                {fieldErrors.understands && (
                  <div className="warningBox" style={{ marginTop: 14 }}>
                    {fieldErrors.understands}
                  </div>
                )}
              </section>
            )}

            <div className={currentStep === 1 ? "wizardNavigation wizardNavigationFirst" : "wizardNavigation"}>
              {currentStep > 1 && (
                <button type="button" className="btn btnSecondary" onClick={goToPreviousStep}>
                  Back
                </button>
              )}

              {currentStep < 5 ? (
                <button type="button" className="btn btnPrimary wizardNextButton" onClick={goToNextStep}>
                  {currentStep === 1 ? "Continue to property details" : "Continue"}
                </button>
              ) : (
                <button type="submit" className="btn btnPrimary wizardNextButton" disabled={submitting}>
                  {submitting ? "Submitting request..." : "Send my quote request"}
                </button>
              )}
            </div>
          </form>

          <aside className="sideCard card liveEstimateCard wizardEstimateCard">
            <p className="kicker liveEstimateKicker">Instant quote preview</p>

            <h2 className="liveEstimateTitle">Guide price only</h2>

            <div className="mobileEstimateTotal">
              <span>Guide price only</span>
              <strong>{formatMoney(pricing.customerTotal)}</strong>
              <small>
                {pricing.hours} hours • {form.serviceType}
              </small>
            </div>

            <div className="guideBox liveEstimateSummary" style={{ marginBottom: 18 }}>
              <strong>Service:</strong> {form.serviceType}
              <br />
              <strong>Property:</strong> {form.bedrooms} bedroom
              {Number(form.bedrooms) === 1 ? "" : "s"}, {form.bathrooms} bathroom
              {Number(form.bathrooms) === 1 ? "" : "s"}
              <br />
              <strong>Condition:</strong> {form.conditionLevel}
              <br />
              <strong>Hours:</strong> {pricing.hours}
            </div>

            <div className="notice livePriceBreakdown" style={{ marginBottom: 18 }}>
              <strong style={{ fontSize: 24 }}>
                {formatMoney(pricing.customerTotal)}
              </strong>
              <br />
              <span className="muted">
                Guide price only. Approved providers may use this as guidance and submit their own quotes before you choose and pay WMC securely.
              </span>
            </div>

            <div className="guideBox liveEstimateExtra" style={{ marginBottom: 18 }}>
              <strong>What happens next?</strong>
              <br />
              1. Submit your request
              <br />
              2. Approved providers review safe details
              <br />
              3. Providers submit quotes
              <br />
              4. You compare, choose and pay
            </div>

            <div className="notice liveEstimateExtra" style={{ marginBottom: 18 }}>
              ✓ No payment taken now
              <br />
              ✓ Secure Stripe payment after choosing a provider
              <br />
              ✓ Approved providers submit quotes first
              <br />
              ✓ You choose before paying
            </div>

            <div className="notice liveEstimateExtra">
              Need support before posting? Use the contact page or email <strong>{BUSINESS_EMAIL}</strong>.
            </div>
          </aside>
        </div>

        <div className="launchLegalNote" style={{ marginTop: 28 }}>
          West Midlands Cleaner is a cleaning marketplace/platform. Cleaning is carried out by the
          independent self-employed cleaner or cleaning business selected by the customer, not by WMC
          employees. Bookings depend on approved provider availability. Provider quote, payment,
          cancellation and refund details are shown before payment.
        </div>
      </section>
    </main>
  );
}