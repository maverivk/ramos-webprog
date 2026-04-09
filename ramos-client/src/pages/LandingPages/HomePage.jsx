import Button from '../../components/Button';

const HomePage = () => {
    return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Wireframe Studio
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Modern Web Design Starts with Smart Wireframing
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Transform your ideas into reality with our intuitive wireframing tools. 
              We help designers and developers create stunning interfaces that users love.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Get Started
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-6 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop" 
              alt="Wireframing workspace"
              className="w-full h-64 object-cover rounded-[1.25rem]"
            />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Our Impact
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Trusted by creators worldwide</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-3xl font-bold text-zinc-900">500+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Projects Completed
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-3xl font-bold text-zinc-900">50+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Happy Clients
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-3xl font-bold text-zinc-900">100%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Client Satisfaction
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-3xl font-bold text-zinc-900">24/7</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Support Available
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            What We Offer
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Powerful features for modern design</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 hover:shadow-lg transition-shadow">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop" 
                alt="Design tools"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Intuitive Design Tools</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Create beautiful wireframes with our drag-and-drop interface. No coding required.
            </p>
            <Button className="mt-4" variant="primary">Learn More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 hover:shadow-lg transition-shadow">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" 
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Real-time Collaboration</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Work together with your team in real-time. Share feedback instantly.
            </p>
            <Button className="mt-4" variant="primary">Learn More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 hover:shadow-lg transition-shadow">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" 
                alt="Analytics dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Smart Analytics</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Track your design performance with detailed insights and recommendations.
            </p>
            <Button className="mt-4" variant="primary">Learn More</Button>
          </article>
        </div>
      </section>
    </div>
    );
};

export default HomePage;