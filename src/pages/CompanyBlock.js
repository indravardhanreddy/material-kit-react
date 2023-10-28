import React from 'react'
import Post from '../sections/@dashboard/blog/Post'

const CompanyBlock = () => {
  return (


    <div className="surface-1 text-center" style={{ paddingTop: '10px' }}>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-G4ZSXFL6SZ" />
      <script dangerouslySetInnerHTML={{
        __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-G4ZSXFL6SZ');
    ` }} />

      {/* <Post /> */}

      <div className="mb-3 font-bold text-3xl">
        <span className="text-900">One Product, </span>
        <span className="text-blue-600">Many Solutions</span>
      </div>
      <div className="text-700 mb-6"> With our platform, you can focus on building your portfolio instead of worrying about risks or analytics.</div>
      <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-desktop text-4xl text-blue-500" />
          </span>
          <div className="text-900 text-xl mb-3 font-medium">Built for Investors and Financials  </div>
          <span className="text-700 line-height-3">Analytics, Portfolio Tracking, Suggestions, Risks whatever it may be. We do it for you.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-lock text-4xl text-blue-500" />
          </span>
          <div className="text-900 text-xl mb-3 font-medium">End-to-End Encryption</div>
          <span className="text-700 line-height-3"> Protecting sensitive financial information is paramount. That's why our platform uses end-to-end encryption to keep your data safe. </span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
          <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
            <i className="pi pi-check-circle text-4xl text-blue-500" />
          </span>
          <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
          <span className="text-700 line-height-3">Simple to use with documentation for each of the Financial Terms. </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh', // Adjust as needed
        }}>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
              <i className="pi pi-globe text-4xl text-blue-500" />
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Fast & Global Support</div>
            <span className="text-700 line-height-3">We provide fast and reliable support to our users with specialized dedicated support team is here to help 24/7.</span>
          </div>
          <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
              <i className="pi pi-shield text-4xl text-blue-500" />
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Trusted Security</div>
            <span className="text-700 line-height-3">Trust is essential in the financial industry, and we take that seriously. Our platform has been certified compliant with major security standards.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyBlock