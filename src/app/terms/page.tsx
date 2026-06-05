export default function Terms() {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="legal-hero-content">
            <span className="badge">Ecosystem Agreement</span>
            <h1>Terms of Service</h1>
            <p className="legal-updated">Last updated: May 2026</p>
          </div>
        </div>
      </section>

      <section className="legal-content section">
        <div className="container">
          <div className="legal-body">
            <p className="legal-intro">
              Welcome to Leverbrain. These Terms of Service ("Terms") govern your relationship with Leverbrain, including the use of our on-chain AI skill marketplace and related CLI or web interfaces. By connecting your Solana wallet or using our services, you agree to these Terms.
            </p>

            <h2>1. Marketplace Operations & On-chain Identity</h2>
            <p>
              Leverbrain operates a decentralized marketplace for executable AI routines, strategies, and blueprints. All publishing rights, edit privileges, and payout distributions are anchored directly to your public Solana wallet address.
            </p>
            <ul>
              <li><strong>Publishers:</strong> By listing an agent routine, you represent that you hold all rights to the code and documentation. You designate a Solana payout wallet to receive USDC settlements. Any edits, updates, or deletions of listings must be signed and authorized by the corresponding publisher wallet.</li>
              <li><strong>Buyers:</strong> You purchase listing licenses using USDC. Transactions are settled directly peer-to-peer or via smart contracts. You acknowledge that blockchain transactions are irreversible, and Leverbrain cannot initiate refunds.</li>
            </ul>

            <h2>2. License Grant & Executable Code</h2>
            <p>
              When you purchase a listing on the Leverbrain marketplace, you are granted a non-exclusive, non-transferable, revocable license to install and run the code bundle within your own local or sandboxed environments.
            </p>
            <p>
              You are strictly prohibited from redistributing, sublicensing, reselling, or repackaging any purchased marketplace listings without explicit developer consent. 
            </p>

            <h2>3. Sandboxing & Disclaimer of Liability</h2>
            <p>
              Many marketplace listings contain code that executes commands, scripts, or hooks on your local operating system. You are solely responsible for verifying the security of any package before execution.
            </p>
            <p className="legal-warning">
              <strong>WARNING:</strong> LEVERBRAIN DOES NOT PRE-AUDIT ALL USER-SUBMITTED LISTINGS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEVERBRAIN DISCLAIMS ALL LIABILITY FOR DAMAGE TO HARDWARE, DATA CORRUPTION, PRIVACY BREACHES, OR FINANCIAL LOSSES ARISING FROM RUNNING UNTRUSTED AI ROUTINES OUTSIDE OF A SECURE SANDBOX.
            </p>

            <h2>4. Service Fees & Blockchain Settlements</h2>
            <p>
              Leverbrain may collect a protocol fee on marketplace transactions. All pricing is denominated in USDC. Gas fees (Solana network transaction fees) are the sole responsibility of the user. In the event of a blockchain fork, smart contract failure, or wallet provider outage, Leverbrain will not be liable for delayed or failed transactions.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              The Leverbrain brand, CLI source code, site design, logos, and proprietary AI models are the exclusive property of Leverbrain. User-submitted listings and open-source packages remain the property of their respective creators, subject to the license granted to buyers under Section 2.
            </p>

            <h2>6. Dispute Resolution</h2>
            <p>
              Any disputes arising out of these Terms or your use of the marketplace will be resolved through binding, individual arbitration. You waive any right to participate in class actions or jury trials.
            </p>

            <h2>7. Contact</h2>
            <p>
              If you have any questions or require support regarding these terms, please connect with us at{' '}
              <a href="mailto:hi@leverbrain.com">hi@leverbrain.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
