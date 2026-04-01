import Link from 'next/link'
import { templates } from '@/lib/templates'
import EmailOptIn from '@/components/EmailOptIn'

export default function Home() {
  return (
    <main>
      {/* Urgency Banner */}
      <div className="bg-red-600 text-white text-center py-3 px-4 font-semibold text-sm">
        🔥 LIMITED TIME: React Dashboard &amp; Vue E-Commerce templates — <strong>$9 each TODAY ONLY</strong> (normally $29-$39). Don&apos;t miss it!
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Premium Code Templates for Every Project</h1>
          <p className="text-xl mb-8 opacity-90">
            Handpicked, AI-assisted, production-ready code snippets & boilerplates. Download instantly.
          </p>
          <div className="space-x-4">
            <a href="#gallery" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Browse Templates
            </a>
            <a href="#gallery" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600">
              See Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Code Craft?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
              <p className="text-gray-600">Download immediately after purchase. No waiting, no emails.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Production Ready</h3>
              <p className="text-gray-600">All templates tested, documented, and ready to deploy.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Fully Customizable</h3>
              <p className="text-gray-600">Source code included. Modify and use in your projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Opt-In */}
      <section className="py-16 bg-white">
        <div className="max-w-md mx-auto px-6">
          <EmailOptIn />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Featured Templates</h2>
          <p className="text-center text-gray-600 mb-12">Hand-picked code templates for every tech stack</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Link key={template.id} href={`/product/${template.id}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer">
                  {/* Image placeholder */}
                  <div className="bg-gradient-to-br from-indigo-500 to-pink-500 h-40 flex items-center justify-center">
                    <div className="text-4xl">{template.icon}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-indigo-600 font-semibold">{template.language}</span>
                      <span className="text-2xl font-bold text-indigo-600">${template.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to speed up your development?</h2>
          <p className="text-lg mb-8 opacity-90">Start with premium templates. Deploy in minutes.</p>
          <a href="#gallery" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block">
            Browse All Templates
          </a>
        </div>
      </section>
    </main>
  )
}
