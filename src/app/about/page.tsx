export default function About() {
  return (
    <div className="bg-white">
      <section className="bg-background py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Story</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Building the UK's most transparent marketplace for local moving services.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg text-text-secondary mx-auto">
            <h2 className="text-3xl font-bold text-primary">Why we built the platform</h2>
            <p>
              Moving home or office is ranked as one of life's most stressful events. We found that the process of finding a reliable "man with a van" was often confusing, with opaque pricing and a lack of trust.
            </p>
            <p>
              We created Man & Van Club to change that. Our mission is to provide transparency, reliability, and ease of use to both customers and professional movers.
            </p>

            <h2 className="text-3xl font-bold text-primary mt-12">What makes us different</h2>
            <p>
              Unlike simple directories, we vet every mover on our platform. We also provide an instant estimate before you share your contact details, so you know exactly what to expect in terms of cost.
            </p>

            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 mt-12">
              <h3 className="text-xl font-bold text-primary mb-4">Our Commitment</h3>
              <ul className="space-y-4">
                <li><strong>Transparency:</strong> No hidden fees for customers or movers.</li>
                <li><strong>Quality:</strong> Only vetted, professional movers allowed.</li>
                <li><strong>Efficiency:</strong> Get matched with the right local service in seconds.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
