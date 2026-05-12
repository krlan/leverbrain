import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'

interface SkillDemoPanelProps {
  skillId: string
}

interface LeadCandidate {
  company: string
  score: number
  role: string
  angle: string
}

interface DomainSuggestion {
  name: string
  available: boolean
}

function makeSeed(input: string): number {
  return input
    .trim()
    .split('')
    .reduce((seed, char) => seed + char.charCodeAt(0), 0)
}

function hashPick(seed: number, index: number, max: number): number {
  if (max <= 0) {
    return 0
  }
  return (seed * (index + 7) + index * 13) % max
}

function CanvasDesignDemo() {
  const [theme, setTheme] = useState<'neon-grid' | 'paper-dust' | 'night-cinema'>('neon-grid')
  const [title, setTitle] = useState('Midnight Launch Poster')

  return (
    <div className="demo-panel">
      <div className="demo-controls demo-controls-inline">
        <label className="demo-field">
          <span>Theme</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value as typeof theme)}>
            <option value="neon-grid">Neon Grid</option>
            <option value="paper-dust">Paper Dust</option>
            <option value="night-cinema">Night Cinema</option>
          </select>
        </label>
        <label className="demo-field demo-field-grow">
          <span>Poster headline</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
      </div>
      <div className={`demo-canvas-preview ${theme}`}>
        <div className="demo-canvas-noise" />
        <p className="demo-canvas-stamp">LIVE ARTIFACT PREVIEW</p>
        <h4>{title || 'Untitled Artifact'}</h4>
      </div>
    </div>
  )
}

function D3VisualizationDemo() {
  const [series, setSeries] = useState('18, 42, 25, 58, 31, 47')

  const values = useMemo(
    () =>
      series
        .split(/[,\s]+/)
        .map((item) => Number(item.trim()))
        .filter((item) => Number.isFinite(item) && item >= 0)
        .slice(0, 10),
    [series]
  )

  const maxValue = Math.max(...values, 1)

  return (
    <div className="demo-panel">
      <label className="demo-field">
        <span>Data points</span>
        <input value={series} onChange={(event) => setSeries(event.target.value)} />
      </label>
      <div className="demo-bar-chart">
        {values.map((value, index) => (
          <div key={`${value}-${index}`} className="demo-bar-column">
            <div
              className="demo-bar"
              style={{ height: `${20 + (value / maxValue) * 110}px` }}
              title={`Value ${value}`}
            />
            <span>{value}</span>
          </div>
        ))}
      </div>
      <p className="demo-muted">Interactive chart preview from pasted data.</p>
    </div>
  )
}

function VideoDownloaderDemo() {
  const [url, setUrl] = useState('https://youtube.com/watch?v=launch123')
  const [quality, setQuality] = useState('1080p')
  const [result, setResult] = useState<null | { file: string; transcript: string; summary: string }>(
    null
  )

  const runDownload = () => {
    const cleaned = url.trim()
    if (!cleaned) {
      setResult(null)
      return
    }

    const idMatch = cleaned.match(/v=([\w-]+)/)
    const clipId = idMatch?.[1] ?? `clip-${cleaned.length}`

    setResult({
      file: `downloads/${clipId}-${quality}.mp4`,
      transcript: `transcripts/${clipId}.txt`,
      summary: `This clip focuses on roadmap priorities, user friction points, and next-quarter launch bets.`,
    })
  }

  return (
    <div className="demo-panel">
      <div className="demo-controls demo-controls-inline">
        <label className="demo-field demo-field-grow">
          <span>Video URL</span>
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </label>
        <label className="demo-field">
          <span>Quality</span>
          <select value={quality} onChange={(event) => setQuality(event.target.value)}>
            <option>720p</option>
            <option>1080p</option>
            <option>4K</option>
          </select>
        </label>
      </div>
      <button type="button" className="demo-button" onClick={runDownload}>
        Run downloader pipeline
      </button>
      {result && (
        <div className="demo-output">
          <p>
            <strong>Video:</strong> {result.file}
          </p>
          <p>
            <strong>Transcript:</strong> {result.transcript}
          </p>
          <p>
            <strong>Summary:</strong> {result.summary}
          </p>
        </div>
      )}
    </div>
  )
}

function ImageEnhancerDemo() {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [clarity, setClarity] = useState(45)

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      setImageUrl(typeof result === 'string' ? result : '')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="demo-panel">
      <div className="demo-controls demo-controls-inline">
        <label className="demo-field demo-field-grow">
          <span>Upload image</span>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </label>
        <label className="demo-field">
          <span>Enhance</span>
          <input
            type="range"
            min={0}
            max={100}
            value={clarity}
            onChange={(event) => setClarity(Number(event.target.value))}
          />
        </label>
      </div>
      <div className="demo-image-compare">
        <div className="demo-image-panel">
          <span>Before</span>
          {imageUrl ? (
            <img src={imageUrl} alt="Before enhancement" />
          ) : (
            <div className="demo-image-placeholder">Upload an image to preview</div>
          )}
        </div>
        <div className="demo-image-panel">
          <span>After</span>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="After enhancement"
              style={{
                filter: `contrast(${1 + clarity / 100}) saturate(${1 + clarity / 130}) brightness(${1 +
                  clarity / 240})`,
              }}
            />
          ) : (
            <div className="demo-image-placeholder">Enhanced preview appears here</div>
          )}
        </div>
      </div>
    </div>
  )
}

function SlackGifDemo() {
  const [concept, setConcept] = useState('Team just shipped production fix')
  const [mood, setMood] = useState('celebration')
  const [result, setResult] = useState('')

  const runGenerator = () => {
    setResult(`${concept || 'Untitled concept'} -> ${mood} loop exported as slack-ready.gif`)
  }

  return (
    <div className="demo-panel">
      <div className="demo-controls demo-controls-inline">
        <label className="demo-field demo-field-grow">
          <span>Concept</span>
          <input value={concept} onChange={(event) => setConcept(event.target.value)} />
        </label>
        <label className="demo-field">
          <span>Mood</span>
          <select value={mood} onChange={(event) => setMood(event.target.value)}>
            <option value="celebration">Celebration</option>
            <option value="warning">Warning</option>
            <option value="hype">Hype</option>
          </select>
        </label>
      </div>
      <button type="button" className="demo-button" onClick={runGenerator}>
        Generate GIF preview
      </button>
      <div className="demo-gif-preview">
        <div className="demo-gif-icon" />
        <p>{result || 'No render yet. Click generate.'}</p>
      </div>
    </div>
  )
}

function MeetingInsightsDemo() {
  const [transcript, setTranscript] = useState(
    'Alex: Um, I think we should scope this smaller.\nMia: Great call.\nAlex: Like maybe focus on onboarding first.'
  )
  const [analysis, setAnalysis] = useState<null | { filler: number; speakerCount: number; ratio: string }>(
    null
  )

  const analyze = () => {
    const fillerMatches = transcript.match(/\b(um|uh|like|basically|actually)\b/gi) ?? []
    const speakerMatches = [...transcript.matchAll(/^([A-Za-z][A-Za-z\s]{1,20}):/gm)].map(
      (match) => match[1]
    )
    const uniqueSpeakers = [...new Set(speakerMatches)]
    const firstSpeaker = speakerMatches[0]
    const firstSpeakerTurns = speakerMatches.filter((speaker) => speaker === firstSpeaker).length
    const ratio = speakerMatches.length
      ? `${Math.round((firstSpeakerTurns / speakerMatches.length) * 100)}% by ${firstSpeaker ?? 'Unknown'}`
      : 'No speaker tags detected'

    setAnalysis({
      filler: fillerMatches.length,
      speakerCount: uniqueSpeakers.length,
      ratio,
    })
  }

  return (
    <div className="demo-panel">
      <label className="demo-field">
        <span>Transcript sample</span>
        <textarea value={transcript} onChange={(event) => setTranscript(event.target.value)} rows={5} />
      </label>
      <button type="button" className="demo-button" onClick={analyze}>
        Analyze communication
      </button>
      {analysis && (
        <div className="demo-output">
          <p>
            <strong>Filler words:</strong> {analysis.filler}
          </p>
          <p>
            <strong>Speakers:</strong> {analysis.speakerCount}
          </p>
          <p>
            <strong>Speaking ratio:</strong> {analysis.ratio}
          </p>
        </div>
      )}
    </div>
  )
}

function CompetitiveAdsDemo() {
  const [company, setCompany] = useState('Notion')
  const [insights, setInsights] = useState<string[]>([])

  const runExtractor = () => {
    const base = company.trim() || 'Competitor'
    setInsights([
      `${base}: strongest headline pattern is problem-first copy in under 9 words.`,
      `${base}: product UI screenshots outperform abstract graphics in paid campaigns.`,
      `${base}: CTA cluster favors low-friction starts ("try now", "see demo", "start free").`,
    ])
  }

  return (
    <div className="demo-panel">
      <label className="demo-field">
        <span>Competitor</span>
        <input value={company} onChange={(event) => setCompany(event.target.value)} />
      </label>
      <button type="button" className="demo-button" onClick={runExtractor}>
        Extract ad strategy
      </button>
      {insights.length > 0 && (
        <ul className="demo-list">
          {insights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ThemeFactoryDemo() {
  const [theme, setTheme] = useState<'ocean' | 'sunset' | 'midnight'>('ocean')
  const [copy, setCopy] = useState('Quarterly Product Narrative')

  return (
    <div className="demo-panel">
      <div className="demo-controls demo-controls-inline">
        <label className="demo-field">
          <span>Theme</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value as typeof theme)}>
            <option value="ocean">Ocean</option>
            <option value="sunset">Sunset</option>
            <option value="midnight">Midnight</option>
          </select>
        </label>
        <label className="demo-field demo-field-grow">
          <span>Content</span>
          <input value={copy} onChange={(event) => setCopy(event.target.value)} />
        </label>
      </div>
      <div className={`demo-theme-preview ${theme}`}>
        <h4>{copy}</h4>
        <p>Theme tokens applied across headline, body, and accent surfaces.</p>
      </div>
    </div>
  )
}

function LeadResearchDemo() {
  const [icp, setIcp] = useState('B2B SaaS, 50-500 employees, growth-stage')
  const [leads, setLeads] = useState<LeadCandidate[]>([])

  const generate = () => {
    const seed = makeSeed(icp)
    const companies = ['Northtrail Labs', 'Beacon Ops', 'Truepoint Cloud', 'Graphline', 'Lighthouse CRM']
    const roles = ['VP Revenue', 'Head of Growth', 'Sales Ops Lead', 'Demand Gen Manager']
    const angles = ['pipeline leakage', 'outbound conversion', 'competitive pressure', 'funnel velocity']

    const rows = Array.from({ length: 3 }).map((_, index) => ({
      company: companies[hashPick(seed, index, companies.length)],
      score: 7 + (hashPick(seed + 3, index, 4) % 4),
      role: roles[hashPick(seed + 9, index, roles.length)],
      angle: angles[hashPick(seed + 13, index, angles.length)],
    }))

    setLeads(rows)
  }

  return (
    <div className="demo-panel">
      <label className="demo-field">
        <span>Ideal customer profile</span>
        <input value={icp} onChange={(event) => setIcp(event.target.value)} />
      </label>
      <button type="button" className="demo-button" onClick={generate}>
        Generate lead targets
      </button>
      {leads.length > 0 && (
        <div className="demo-grid-list">
          {leads.map((lead) => (
            <div key={`${lead.company}-${lead.role}`} className="demo-grid-card">
              <h5>{lead.company}</h5>
              <p>{lead.role}</p>
              <span>Fit score {lead.score}/10</span>
              <small>Angle: {lead.angle}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ResumeDemo() {
  const [jobText, setJobText] = useState('Need React, analytics, stakeholder management, experimentation')
  const [resumeText, setResumeText] = useState('Built React dashboards. Led product experiments.')
  const [tailored, setTailored] = useState<string[]>([])

  const generate = () => {
    const keywords = ['react', 'analytics', 'stakeholder', 'experiment', 'python', 'leadership']
    const matches = keywords.filter((keyword) =>
      `${jobText.toLowerCase()} ${resumeText.toLowerCase()}`.includes(keyword)
    )

    const bullets = matches.map((keyword) =>
      `Emphasize ${keyword} impact with quantified outcomes in top-half experience bullets.`
    )

    setTailored(
      bullets.length > 0
        ? bullets
        : ['Highlight transferable execution wins, then align language to the target job description.']
    )
  }

  return (
    <div className="demo-panel">
      <label className="demo-field">
        <span>Job description highlights</span>
        <textarea value={jobText} onChange={(event) => setJobText(event.target.value)} rows={3} />
      </label>
      <label className="demo-field">
        <span>Your resume context</span>
        <textarea value={resumeText} onChange={(event) => setResumeText(event.target.value)} rows={3} />
      </label>
      <button type="button" className="demo-button" onClick={generate}>
        Tailor resume strategy
      </button>
      {tailored.length > 0 && (
        <ul className="demo-list">
          {tailored.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function RaffleDemo() {
  const [entries, setEntries] = useState('Ari\nMina\nNoah\nSofia\nLeo')
  const [winner, setWinner] = useState('')

  const pickWinner = () => {
    const names = entries
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean)

    if (names.length === 0) {
      setWinner('No valid entries found')
      return
    }

    const randomBuffer = new Uint32Array(1)
    crypto.getRandomValues(randomBuffer)
    const choice = names[randomBuffer[0] % names.length]
    setWinner(`${choice} selected at ${new Date().toLocaleTimeString()}`)
  }

  return (
    <div className="demo-panel">
      <label className="demo-field">
        <span>Entries (one per line)</span>
        <textarea value={entries} onChange={(event) => setEntries(event.target.value)} rows={4} />
      </label>
      <button type="button" className="demo-button" onClick={pickWinner}>
        Pick winner now
      </button>
      {winner && <p className="demo-highlight">{winner}</p>}
    </div>
  )
}

function ChangelogDemo() {
  const [commits, setCommits] = useState('feat: add billing dashboard\nfix: resolve export bug\nchore: update docs')
  const [output, setOutput] = useState('')

  const runGenerator = () => {
    const lines = commits
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)

    const features = lines.filter((line) => line.startsWith('feat'))
    const fixes = lines.filter((line) => line.startsWith('fix'))
    const improvements = lines.filter((line) => !line.startsWith('feat') && !line.startsWith('fix'))

    const asList = (items: string[]) => items.map((item) => `- ${item.replace(/^[a-z]+:\s*/i, '')}`).join('\n')

    const report = [
      '## New Features',
      features.length ? asList(features) : '- No new features in this range.',
      '',
      '## Fixes',
      fixes.length ? asList(fixes) : '- No bug fixes in this range.',
      '',
      '## Improvements',
      improvements.length ? asList(improvements) : '- No additional improvements in this range.',
    ].join('\n')

    setOutput(report)
  }

  return (
    <div className="demo-panel">
      <label className="demo-field">
        <span>Commit log</span>
        <textarea value={commits} onChange={(event) => setCommits(event.target.value)} rows={5} />
      </label>
      <button type="button" className="demo-button" onClick={runGenerator}>
        Generate release notes
      </button>
      {output && <pre className="demo-pre">{output}</pre>}
    </div>
  )
}

function DeepResearchDemo() {
  const [query, setQuery] = useState('How will edge AI shift B2B product strategy over 3 years?')
  const [mode, setMode] = useState<'quick' | 'standard' | 'deep'>('standard')
  const [result, setResult] = useState('')

  const run = () => {
    setResult(
      `Mode: ${mode}. Built 5-step report plan for "${query}" with citation slots [1]-[6], source triangulation, and final recommendation summary.`
    )
  }

  return (
    <div className="demo-panel">
      <div className="demo-controls demo-controls-inline">
        <label className="demo-field demo-field-grow">
          <span>Research query</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <label className="demo-field">
          <span>Mode</span>
          <select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}>
            <option value="quick">Quick</option>
            <option value="standard">Standard</option>
            <option value="deep">Deep</option>
          </select>
        </label>
      </div>
      <button type="button" className="demo-button" onClick={run}>
        Launch research flow
      </button>
      {result && <p className="demo-highlight">{result}</p>}
    </div>
  )
}

function SkillCreatorDemo() {
  const [name, setName] = useState('customer-insights-skill')
  const [intent, setIntent] = useState('Analyze interview notes and output a decision brief.')
  const [snippet, setSnippet] = useState('')

  const generate = () => {
    const skillText = `---\nname: ${name}\ndescription: ${intent}\n---\n\n# ${name}\n\n## When to Use\n- Run when product research data needs synthesis\n\n## Instructions\n1. Parse source notes\n2. Extract themes\n3. Recommend top actions\n`

    setSnippet(skillText)
  }

  return (
    <div className="demo-panel">
      <div className="demo-controls demo-controls-inline">
        <label className="demo-field">
          <span>Skill name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="demo-field demo-field-grow">
          <span>Intent</span>
          <input value={intent} onChange={(event) => setIntent(event.target.value)} />
        </label>
      </div>
      <button type="button" className="demo-button" onClick={generate}>
        Build SKILL.md scaffold
      </button>
      {snippet && <pre className="demo-pre">{snippet}</pre>}
    </div>
  )
}

function DomainBrainstormDemo() {
  const [project, setProject] = useState('AI sales copilot for outbound teams')
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([])

  const run = () => {
    const seed = makeSeed(project)
    const baseWords = project
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2)
      .slice(0, 2)

    const first = baseWords[0] ?? 'launch'
    const second = baseWords[1] ?? 'pilot'

    const combos = [
      `${first}${second}.com`,
      `${first}forge.io`,
      `${second}labs.ai`,
      `${first}pulse.dev`,
      `${second}stack.app`,
    ]

    const rows = combos.map((name, index) => ({
      name,
      available: hashPick(seed, index, 5) % 2 === 0,
    }))

    setSuggestions(rows)
  }

  return (
    <div className="demo-panel">
      <label className="demo-field">
        <span>Project concept</span>
        <input value={project} onChange={(event) => setProject(event.target.value)} />
      </label>
      <button type="button" className="demo-button" onClick={run}>
        Brainstorm domains
      </button>
      {suggestions.length > 0 && (
        <div className="demo-grid-list">
          {suggestions.map((suggestion) => (
            <div key={suggestion.name} className="demo-grid-card">
              <h5>{suggestion.name}</h5>
              <span className={`demo-pill ${suggestion.available ? 'ok' : 'warn'}`}>
                {suggestion.available ? 'Available' : 'Taken'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FallbackDemo() {
  return (
    <div className="demo-panel">
      <p className="demo-muted">This demo is loading. Try another card and come back in a second.</p>
    </div>
  )
}

export function SkillDemoPanel({ skillId }: SkillDemoPanelProps) {
  switch (skillId) {
    case 'canvas-design-artifacts-builder':
      return <CanvasDesignDemo />
    case 'd3-visualization':
      return <D3VisualizationDemo />
    case 'video-downloader':
      return <VideoDownloaderDemo />
    case 'image-enhancer':
      return <ImageEnhancerDemo />
    case 'slack-gif-creator':
      return <SlackGifDemo />
    case 'meeting-insights-analyzer':
      return <MeetingInsightsDemo />
    case 'competitive-ads-extractor':
      return <CompetitiveAdsDemo />
    case 'theme-factory':
      return <ThemeFactoryDemo />
    case 'lead-research-assistant':
      return <LeadResearchDemo />
    case 'tailored-resume-generator':
      return <ResumeDemo />
    case 'raffle-winner-picker':
      return <RaffleDemo />
    case 'changelog-generator':
      return <ChangelogDemo />
    case 'deep-research':
      return <DeepResearchDemo />
    case 'skill-creator':
      return <SkillCreatorDemo />
    case 'domain-name-brainstormer':
      return <DomainBrainstormDemo />
    default:
      return <FallbackDemo />
  }
}
