import './styles.css';

export default function IAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-25 to-green-50 text-gray-900 font-sans leading-relaxed">

      <main>
        {/* Hero Section */}
        <section className="equal-gradient-light py-20 text-center">
          <div className="max-w-6xl mx-auto px-5">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">EQUAL IDENTITY PRIVATE LIMITED</h1>
            <p className="text-xl equal-text-secondary font-normal">SEBI Registered Investment Adviser</p>
            <p className="text-xl equal-text-secondary font-normal">Your Fiduciary Partner in Strategic Growth and Investment</p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-4xl font-semibold text-center mb-10 text-gray-900">About Us</h2>
            <p className="text-center max-w-2xl mx-auto text-gray-700 leading-relaxed">
              Equal Identity Private Limited is a <strong>SEBI Registered Investment Advisor (RIA)</strong> offers expert investment advisory services with a core principle to offer custom, unbiased investment products for every type of investor. Grow your wealth with our investment advisory services, including stock, mutual fund, and fixed income products tailored to meet your financial goals.
            </p>
          </div>
        </section>
      </main>

      <footer className="equal-gradient text-white py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b-2 border-white/30 pb-2">Company Details</h4>
              <p className="mb-2"><strong>EQUAL IDENTITY PRIVATE LIMITED</strong></p>
              <p className="mb-2"><strong>Type of Registration:</strong> Non-Individual</p>
              <p className="mb-2"><strong>SEBI Registration No.:</strong> INA000018124</p>
              <p className="mb-2"><strong>Validity of Registration:</strong> Perpetual</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b-2 border-white/30 pb-2">Contact Information</h4>
              <p className="mb-2"><strong>Address:</strong> 2nd floor The sky view sky view 10 SY No 83 1 Raidurg Hyderabad, HYDERABAD, TELANGANA, 500081</p>
              <p className="mb-2"><strong>Phone:</strong> 022229840842236</p>
              <p className="mb-2"><strong>Email:</strong> abhishek.s@equal.in</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 border-b-2 border-white/30 pb-2">Principal Officer</h4>
              <p className="mb-2"><strong>Name:</strong> Abhishek Sambangi</p>
              <p className="mb-2"><strong>Contact No:</strong> 022229840842236</p>
              <p className="mb-2"><strong>Email:</strong> abhishek.s@equal.in</p>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-lg border border-white/20 text-sm text-center">
            <p className="mb-2"><strong>Standard Warning:</strong> Investment in securities market are subject to market risks. Read all the related documents carefully before investing.</p>
            <p><strong>Disclaimer:</strong> Registration granted by SEBI, enlistment with IAASB and certification from NISM in no way guarantee performance of the IA or provide any assurance of returns to investors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

