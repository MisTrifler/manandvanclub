import { Mail, MessageCircle, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-background min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
            <p className="text-text-secondary">Have a question? We're here to help.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-border">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Your Name</label>
                    <input className="w-full p-3 border border-border rounded-md" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Email Address</label>
                    <input type="email" className="w-full p-3 border border-border rounded-md" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Subject</label>
                  <select className="w-full p-3 border border-border rounded-md bg-white">
                    <option>Customer Enquiry</option>
                    <option>Business/Driver Enquiry</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Message</label>
                  <textarea className="w-full p-3 border border-border rounded-md h-32" required></textarea>
                </div>
                <button className="btn-orange px-8 py-3">Send Message</button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-border text-accent h-fit">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-text-secondary text-sm">support@manandvanclub.co.uk</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-border text-accent h-fit">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Response Time</h3>
                  <p className="text-text-secondary text-sm">We aim to respond within 2 business hours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-border text-accent h-fit">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">FAQ</h3>
                  <p className="text-text-secondary text-sm">Check our <a href="/how-it-works" className="text-accent underline">FAQ page</a> for quick answers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
