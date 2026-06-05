export default function Privacy() {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="grid-bg" />
        <div className="container">
          <div className="legal-hero-content">
            <span className="badge">Data & Protection</span>
            <h1>Privacy Policy</h1>
            <p className="legal-updated">Last updated: May 2026</p>
          </div>
        </div>
      </section>

      <section className="legal-content section">
        <div className="container">
          <div className="legal-body">
            <p className="legal-intro">
              At Leverbrain, we prioritize your security and data privacy. This Privacy Policy details how we collect, store, and process information when you interact with the Leverbrain marketplace, CLI applications, and decentralized smart contract interfaces.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              Because Leverbrain operates on a decentralized foundation, we minimize personal data collection. We collect the following types of information:
            </p>
            <ul>
              <li><strong>On-chain Wallet Data:</strong> Public Solana wallet addresses, transaction signatures, and payment history related to marketplace listings. We do not collect private keys, seed phrases, or personal transaction histories unrelated to our platform.</li>
              <li><strong>Publisher Metadata:</strong> Optional profile details provided by creators (handles, display names, bios, avatar URLs, GitHub profiles, or Twitter links) which are stored in our decentralized database to build creator profiles.</li>
              <li><strong>Usage Analytics:</strong> Standard logs of platform interaction (IP address, browser type, page views, and download counts) to optimize performance, prevent abuse, and track popular routines.</li>
            </ul>

            <h2>2. Local Execution Privacy</h2>
            <p className="legal-notice">
              <strong>IMPORTANT:</strong> Leverbrain CLI tools and marketplace routines execute directly on your local system or sandboxed hardware. We do not collect, intercept, or upload your terminal command history, local directory paths, agent logs, or variables processed during execution. All AI processing data remains local to your environment.
            </p>

            <h2>3. How We Use Information</h2>
            <p>We use the collected metadata and on-chain records to:</p>
            <ul>
              <li>Process and verify license purchases for marketplace listings.</li>
              <li>Validate publisher editing rights and route USDC payouts to creator wallets.</li>
              <li>Prevent sybil attacks, platform spam, and unauthorized modifications of listings.</li>
              <li>Diagnose technical issues on our web portal and API endpoints.</li>
            </ul>

            <h2>4. Third-Party Integrations & Decoupling</h2>
            <p>
              Our web applications interface with third-party providers:
            </p>
            <ul>
              <li><strong>Blockchain Nodes:</strong> Solana RPC endpoints process your transaction requests. These nodes may log standard browser/IP telemetry under their own privacy rules.</li>
              <li><strong>AI Providers:</strong> When configuring API keys (e.g. OpenAI, Anthropic, Gemini) in your local environment, your requests are routed directly to those provider endpoints. Their privacy policies govern the retention of your prompt and completion logs.</li>
            </ul>

            <h2>5. Data Retention & Deletion</h2>
            <p>
              Any off-chain profile data (handles, bios, custom listing information) is retained as long as your wallet is active on our marketplace. You can request deletion or revision of your off-chain profile elements by signing a verification message with your publisher wallet.
            </p>
            <p>
              Please note that on-chain data (transaction signatures, smart contract state, payout receipts) is permanently recorded on the Solana blockchain and cannot be edited, deleted, or anonymized.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement industry-standard cryptographic verification and database access controls to prevent unauthorized access or disclosure of publisher records. We strongly encourage all users to run third-party routines in sandboxed environments (e.g. Docker, virtual machines) to isolate execution risks.
            </p>

            <h2>7. Contact</h2>
            <p>
              For privacy inquiries, database correction requests, or support, please contact us at{' '}
              <a href="mailto:hi@leverbrain.com">hi@leverbrain.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
