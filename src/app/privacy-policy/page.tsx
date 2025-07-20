import Header from "@/components/Header";

export default function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy for Salystic</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: July 20, 2025</p>

            <div className="prose prose-gray max-w-none">
              <p>
                Salystic operates Salystic, a salary benchmarking platform for software engineers. This Privacy Policy explains we collect, use, disclose, and safeguard your information when you use our Service.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">1.1 LinkedIn Authentication Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>We use OAuth2 to authenticate users via LinkedIn.</li>
                <li>We receive minimal authentication data from LinkedIn such as LinkedIn ID.</li>
                <li>We immediately pseudonymize LinkedIn IDs using HMAC-SHA256 and never store the raw ID.</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">1.2 Salary Submission Data</h3>
              <p>Users submit their own salary entries, which include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Country</li>
                <li>Currency</li>
                <li>Sector such as Technology or Finance</li>
                <li>Job and Title such as Backend Developer or Senior</li>
                <li>Salary amount</li>
                <li>Employment dates including startTime and endTime</li>
                <li>Optional previous job salary or raise information</li>
              </ul>
              <p>We do <strong>not</strong> collect any other personal identifiers such as name or address.</p>

              {/* <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">1.3 Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>We automatically collect information about how the Service is accessed and used which we call Usage Data. This may include your IP address, browser type, operating system, and pages visited.</li>
                <li>Usage Data is stored in aggregated form and is used for analytics and performance monitoring.</li>
              </ul> */}

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Authentication & Security</strong>: To authenticate you via LinkedIn and manage sessions using JWTs.</li>
                <li><strong>Service Operations</strong>: To allow you to submit, view, and manage your salary entries.</li>
                <li><strong>Analytics & Insights</strong>: To generate aggregated salary benchmarks, career progression insights, and public dashboards. Only aggregated data is exposed; individual entries remain private.</li>
                <li><strong>Improving the Service</strong>: To monitor usage patterns, diagnose technical issues, and enhance the user experience.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Data Sharing and Disclosure</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Public Analytics</strong>: Aggregated, anonymous data such as average salary by job or sector is publicly accessible to encourage transparency.</li>
                <li><strong>No Personal Data Sharing</strong>: We do not sell, rent, or trade your personal data to third parties.</li>
                <li><strong>Third-Party Services</strong>: We use third-party providers such as LinkedIn for authentication and MongoDB for database. These providers have access only to the data necessary to perform their services and are bound by confidentiality obligations.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Salary Entries</strong>: Retained until you delete them or until we discontinue the Service.</li>
                <li><strong>Authentication Data</strong>: Pseudonymized IDs and JWT tokens are retained for session management; tokens expire per our JWT expiration policy.</li>
                <li><strong>Usage Data</strong>: Retained in aggregated form for up to 12 months for analytics and performance purposes.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Security</h2>
              <p>We implement industry-standard measures to protect your information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>HMAC-SHA256 pseudonymization of LinkedIn IDs</li>
                <li>HTTPS/TLS encryption in transit</li>
                <li>JWT-based authentication with secure secrets</li>
                <li>Environment-based rate limiting and CORS policies (recommended for production)</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access & Portability</strong>: You can request access to your salary entries via the API.</li>
                <li><strong>Deletion</strong>: You can delete your salary entries at any time.</li>
                <li><strong>Contact</strong>: To exercise any rights, contact us at <a href="mailto:eminsonlu@gmail.com" className="text-blue-600 hover:text-blue-800">eminsonlu@gmail.com</a>.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the -Last updated- date at the top. Continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
              <p>If you have questions or concerns regarding this Privacy Policy, please reach out to:</p>
              <div className="mt-4">
                <p className="font-medium">Salystic Team</p>
                <p>Email: <a href="mailto:eminsonlu@gmail.com" className="text-blue-600 hover:text-blue-800">eminsonlu@gmail.com</a></p>
                <p>Website: <a href="https://salystic.com" className="text-blue-600 hover:text-blue-800">https://salystic.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}