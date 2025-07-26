import AnalyticsSection from '@/components/site/Analytics';

export default function HomeContainer() {
  return (
    <main className="min-h-screen">

      <div id="analytics">
        <AnalyticsSection />
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Salystic?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Get insights into salary trends, career progression, and market
              data to make informed decisions about your professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-violet-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Real Data
              </h3>
              <p className="text-slate-600">
                Access authentic salary information from professionals across
                various industries and experience levels.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Career Insights
              </h3>
              <p className="text-slate-600">
                Understand salary progression, raise patterns, and career
                advancement opportunities in your field.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Privacy First
              </h3>
              <p className="text-slate-600">
                Your data is anonymized and secure. We prioritize privacy while
                providing valuable market insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-violet-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover Your Worth?
          </h2>
          <p className="text-xl text-violet-100 mb-8">
            Join thousands of professionals who use Salystic to make informed
            career decisions.
          </p>
          <a
            href="/auth/login"
            className="bg-white text-violet-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-violet-50 transition-colors inline-block"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </main>
  );
}
