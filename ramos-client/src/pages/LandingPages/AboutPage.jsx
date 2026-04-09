import Button from '../../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section with Image */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-6 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
              alt="Team working together"
              className="w-full h-80 object-cover rounded-[1.25rem]"
            />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Our Story
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              We're on a mission to revolutionize digital design
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Founded in 2020, Wireframe Studio has helped over 500 designers and developers 
              create exceptional digital experiences. We believe in simplicity, collaboration, 
              and the power of great design.
            </p>
          </div>
        </div>
      </section>

      {/* Values and Team Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Our Values
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">What drives us forward</h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Innovation First</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  We constantly push boundaries and explore new possibilities in design technology.
                  Our team stays ahead of trends to deliver cutting-edge solutions.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">User-Centric Design</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Every decision we make puts users first. We create tools that are intuitive,
                  accessible, and truly helpful for creative professionals.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Community Focused</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  We believe in the power of community. Through workshops, resources, and events,
                  we help designers grow and connect with each other.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Our Team
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" 
                  alt="Team member"
                  className="w-24 h-24 rounded-full object-cover border-2 border-zinc-900"
                />
                <p className="mt-3 font-semibold text-zinc-900">Sarah Chen</p>
                <p className="text-xs text-zinc-500">Creative Director</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" 
                  alt="Team member"
                  className="w-24 h-24 rounded-full object-cover border-2 border-zinc-900"
                />
                <p className="mt-3 font-semibold text-zinc-900">Marcus Rodriguez</p>
                <p className="text-xs text-zinc-500">Lead Developer</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" 
                  alt="Team member"
                  className="w-24 h-24 rounded-full object-cover border-2 border-zinc-900"
                />
                <p className="mt-3 font-semibold text-zinc-900">Emma Thompson</p>
                <p className="text-xs text-zinc-500">UX Designer</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" 
                  alt="Team member"
                  className="w-24 h-24 rounded-full object-cover border-2 border-zinc-900"
                />
                <p className="mt-3 font-semibold text-zinc-900">David Kim</p>
                <p className="text-xs text-zinc-500">Product Manager</p>
              </div>
            </div>
            <Button className="mt-5 w-full">Join Our Team</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;