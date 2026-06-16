interface SkillMetadata {
  description: string;
  useCases: string[];
  presetsTip: string;
}

export const CONVERSATIONAL_METADATA: Record<string, SkillMetadata> = {
  'canvas-design-artifacts-builder': {
    description: 'A visual compiler that translates raw prompts directly into polished React and Tailwind visual components, cards, or dashboards, bypassing plain-text outputs.',
    useCases: [
      'Generate production-ready marketing landing sections.',
      'Compile custom interactive dashboards for SaaS applications.',
      'Design rich, responsive slide components in a single pass.'
    ],
    presetsTip: 'Use this builder to generate rich components. You can preview style structures directly in the workbench and inspect the generated code in the inspector below.'
  },
  'deep-research': {
    description: 'An autonomous agent workflow that performs exhaustive web searches, compiles multiple sources, and generates detailed academic-grade research reports on complex topics.',
    useCases: [
      'Generate comprehensive market analysis reports for new niches.',
      'Gather academic and technical research papers on specialized domains.',
      'Conduct competitive intelligence audits on emerging startups.'
    ],
    presetsTip: 'Deploy this strategy in your agent runtime. It will perform recursive search loops and output structured reports to your workspace.'
  },
  'skill-creator': {
    description: 'An automation engine designed to bootstrap, package, and document new Leverbrain skills, streamlining the creation of reusable agent instruction modules.',
    useCases: [
      'Bootstrap a brand new custom skill structure with standard config files.',
      'Auto-generate standard `SKILL.md` and `EXTEND.md` configurations.',
      'Package local automation scripts into discoverable marketplace modules.'
    ],
    presetsTip: 'Run `npx leverbrain get anthropics/skill-creator` to bootstrap your own skill creation workbench locally.'
  },
  'competitive-ads-extractor': {
    description: 'A strategic pipeline that scrapes and analyzes competitor advertising campaigns across major networks to find high-performing creative hooks and strategies.',
    useCases: [
      'Extract active ad copy and visual layouts from target brands.',
      'Identify recurring hooks and messaging frameworks in your industry.',
      'Compile ad intelligence reports to inspire your next growth campaign.'
    ],
    presetsTip: 'Execute this strategy locally to gather and summarize ad listings into a neat markdown overview.'
  },
  'lead-research-assistant': {
    description: 'A lead generation booster that discovers prospects, maps corporate decision-makers, and drafts hyper-personalized outbound outreach templates.',
    useCases: [
      'Identify target department heads at high-growth target companies.',
      'Extract contact emails and social media profiles from public datasets.',
      'Write highly contextual cold email drafts matching recent company news.'
    ],
    presetsTip: 'Run this skill inside your workspace to automate prospect enrichment and personalized copywriting.'
  },
  'changelog-generator': {
    description: 'A clean workflow utility that parses git commit logs since your last tag, categorizes changes, and formats them into user-friendly public changelogs.',
    useCases: [
      'Create polished release notes for product launches automatically.',
      'Categorize development commits into Features, Fixes, and Refactors.',
      'Format output in clean, readable markdown ready for GitHub or your blog.'
    ],
    presetsTip: 'Run this in your repository root during CI/CD steps to auto-update your `CHANGELOG.md` file.'
  },
  'tailored-resume-generator': {
    description: 'An AI assistant that analyzes a target job description and optimizes your master resume content to emphasize matching skills and achievements.',
    useCases: [
      'Re-align project bullet points to highlight skills mentioned in job descriptions.',
      'Format resumes in ATS-friendly structures automatically.',
      'Generate customized cover letters highlighting key matching experiences.'
    ],
    presetsTip: 'Provide your master resume and the target job description to run this matching routine.'
  },
  'd3-visualization': {
    description: 'A code generator that compiles raw JSON datasets into beautiful, responsive D3.js interactive charts and network graphs.',
    useCases: [
      'Render complex network topologies from raw JSON graphs.',
      'Create animated, responsive dashboard timelines.',
      'Generate interactive scatter plots for multi-dimensional datasets.'
    ],
    presetsTip: 'Input your raw JSON data and compile it into an interactive HTML visualization using this skill.'
  },
  'meeting-insights-analyzer': {
    description: 'A meeting transcript analyzer that extracts core decisions, action items, and topic timelines from raw audio transcript text.',
    useCases: [
      'Generate a quick executive summary of a 1-hour team meeting.',
      'List specific assignees, action items, and deadlines automatically.',
      'Extract major discussion themes and organize them on a timeline.'
    ],
    presetsTip: 'Feed your Zoom or Google Meet text transcripts into this skill to get instant, organized digests.'
  },
  'baoyu-article-illustrator': {
    description: 'A creative visual skill that analyzes article structures, identifies perfect positions for visual aids, and designs consistent, topic-relevant illustrations.',
    useCases: [
      'Illustrate tech tutorials with clean blueprints or schematics.',
      'Add consistent hand-drawn style illustrations to blog posts.',
      'Decorate newsletters with minimalist vector scenes matching the text.'
    ],
    presetsTip: 'To apply any style from the gallery (e.g., Blueprint, Editorial, Notion), pass the style name when prompted or configure `preferred_style: "notion"` in your local config.'
  },
  'baoyu-comic': {
    description: 'A visual storytelling skill that compiles narrative text scripts into multi-panel comic strips using consistent styles, layout structures, and framing.',
    useCases: [
      'Turn short stories into beautiful graphic novel panels.',
      'Illustrate step-by-step case studies in a comic style.',
      'Create custom avatar stories or visual tutorials for social media.'
    ],
    presetsTip: 'Select styles like Comic, Watercolor, or Retro from the gallery by setting the `--style` argument in your prompt construction.'
  },
  'baoyu-compress-image': {
    description: 'A lightweight file optimizer that compresses, crops, and converts images into modern web formats directly from the command line.',
    useCases: [
      'Optimize web illustrations for fast page load performance.',
      'Batch convert PNG/JPG images to modern WebP format.',
      'Resize heavy screenshot mockups to match standard screen container ratios.'
    ],
    presetsTip: 'Run this CLI utility locally to optimize image files without losing visual clarity.'
  },
  'baoyu-cover-image': {
    description: 'A graphic layout designer that generates eye-catching title covers with clean typographic overlay, geometric framing, and topic-aligned artwork.',
    useCases: [
      'Design cover pictures for WeChat Official Accounts and blogs.',
      'Create high-contrast YouTube or podcast cover thumbnails.',
      'Generate premium card headers for social media sharing links.'
    ],
    presetsTip: 'Choose between various layouts and font sizes in the gallery. Apply them by passing `--layout` or setting your preference in the metadata.'
  },

  'baoyu-danger-x-to-markdown': {
    description: 'A social data extractor that converts threads, replies, and tweets from X (formerly Twitter) into clean, structured Markdown logs.',
    useCases: [
      'Archive educational X threads into a local knowledge base.',
      'Convert customer feedback threads into structured feature requests.',
      'Back up social posts and links to personal obsidian vaults.'
    ],
    presetsTip: 'Provide the URL of the tweet or thread to fetch and format its contents automatically.'
  },
  'baoyu-diagram': {
    description: 'An architectural diagram compiler that turns text specs and requirements into clean diagrams (flowcharts, comparison charts, framework trees).',
    useCases: [
      'Draw system architecture diagrams from markdown text.',
      'Illustrate workflows, data pipelines, and user onboarding steps.',
      'Map side-by-side product comparisons in a clean tabular view.'
    ],
    presetsTip: 'Choose a style preset from the gallery (e.g. Blueprint, Hand-drawn) by specifying the `--style` flag in your local execution.'
  },

  'baoyu-format-markdown': {
    description: 'A markdown linter and formatter that cleans up heading structures, checks code blocks, and fixes typographic spacing inconsistencies.',
    useCases: [
      'Clean up auto-generated AI text to match publication quality.',
      'Standardize typography, spaces, and punctuation across files.',
      'Verify links and format code block tags correctly.'
    ],
    presetsTip: 'Install this utility in your workspace to instantly prettify any markdown documents.'
  },

  'baoyu-infographic': {
    description: 'A data visualizer skill that extracts key metrics and concepts from reports and renders them into clear, visual infographic sheets.',
    useCases: [
      'Turn text-heavy reports into clean, visual infographic sheets.',
      'Create high-contrast metrics slides for executive presentations.',
      'Design summary timelines illustrating historical growth milestones.'
    ],
    presetsTip: 'Use presets like Blueprint or Flat to adjust the color schemes and structures of your generated infographics.'
  },
  'baoyu-markdown-to-html': {
    description: 'A clean compiler that renders markdown files into highly-optimized, semantic HTML outputs with pre-styled typography.',
    useCases: [
      'Compile markdown articles into beautiful email newsletters.',
      'Convert developer documentation pages into lightweight static HTML.',
      'Create clean blog posts with embedded CSS layout primitives.'
    ],
    presetsTip: 'Pass your markdown files through this compiler to output production-ready HTML.'
  },

  'baoyu-post-to-x': {
    description: 'A thread creator that decomposes long articles into highly engaging, readable X (Twitter) threads with optimized hook hooks.',
    useCases: [
      'Decompose 1,000-word blog posts into viral 5-tweet threads.',
      'Generate catchy hooks for high-CTR thread click-throughs.',
      'Format quotes and code snippets to render beautifully on mobile feeds.'
    ],
    presetsTip: 'Feed any blog post or doc link to get a thread preview structured and ready for schedule.'
  },
  'baoyu-slide-deck': {
    description: 'A presentation deck generator that creates clean slide visuals, structuring topics into title slides, contents, grids, and comparison layouts.',
    useCases: [
      'Draft business pitch decks from product specifications.',
      'Generate technical tutorial slides with embedded code templates.',
      'Format metrics slides with clear charts and typography.'
    ],
    presetsTip: 'Select styles like Minimal, Retro, or Sci-Fi from the gallery above to style your deck components.'
  },

  'baoyu-url-to-markdown': {
    description: 'A web page extractor that scrapes online articles, removes header navigation and ads, and saves clean body content as structured Markdown.',
    useCases: [
      'Save online reference documentation for offline search.',
      'Feed clean article content into LLM context windows.',
      'Archive web essays into personal markdown journals.'
    ],
    presetsTip: 'Run `npx leverbrain get baoyu/baoyu-url-to-markdown` and pass the URL to extract a clean markdown file.'
  },

  'baoyu-xhs-images': {
    description: 'A visual designer tailored to generate beautiful, trendy image slides with custom typography layouts for Xiaohongshu (Red).',
    useCases: [
      'Generate high-engagement cover slides with cute or minimalist fonts.',
      'Design sparse text layouts explaining tips, charts, or quotes.',
      'Create consistent visual styles for lifestyle or knowledge feeds.'
    ],
    presetsTip: 'Select preset styles like Cute, Sparse, or Retro from the gallery above by setting `--style` or configuring your preferences.'
  },
  'baoyu-youtube-transcript': {
    description: 'A YouTube audio analyzer that fetches video transcripts, formats them with timestamps, and generates comprehensive chapter summaries.',
    useCases: [
      'Create readable text logs from video lectures or podcasts.',
      'Generate clean outlines of long tutorials with timestamps.',
      'Extract key announcements from developer keynote videos.'
    ],
    presetsTip: 'Provide any YouTube video link to fetch and format its transcript instantly.'
  }
};

export function getConversationalOverview(slug: string, fallbackDesc: string, readme?: string): SkillMetadata {
  const meta = CONVERSATIONAL_METADATA[slug];
  if (meta) {
    return meta;
  }

  // Generate dynamic metadata for imported / custom skills
  const description = fallbackDesc || 'A custom Leverbrain automation skill designed to integrate with your developer workspace workflows.';
  const useCases: string[] = [];

  if (readme) {
    // 1. Try to find bulleted list items in markdown
    const lines = readme.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      // Look for bullet points or numbered lists
      if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
        // Strip bullet marker and markdown symbols
        const cleanItem = trimmed
          .replace(/^[-*\d.]+\s+/, '') // strip bullet
          .replace(/`([^`]+)`/g, '$1') // strip backticks
          .replace(/\*\*([^*]+)\*\*/g, '$1') // strip bold
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip links
          .trim();
        
        if (cleanItem && cleanItem.length > 10 && cleanItem.length < 150) {
          // Capitalize first letter and ensure it ends with period
          let formatted = cleanItem.charAt(0).toUpperCase() + cleanItem.slice(1);
          if (!formatted.endsWith('.') && !formatted.endsWith('!') && !formatted.endsWith('?')) {
            formatted += '.';
          }
          if (!useCases.includes(formatted)) {
            useCases.push(formatted);
          }
        }
      }
      if (useCases.length >= 3) break;
    }
  }

  // 2. Fallback to parsing description sentences if we don't have enough use cases
  if (useCases.length < 3) {
    const sentences = description.split(/[.!?]\s+/).map(s => s.trim()).filter(s => s.length > 5);
    for (const s of sentences) {
      let cleanSentence = s.charAt(0).toUpperCase() + s.slice(1);
      if (!cleanSentence.endsWith('.') && !cleanSentence.endsWith('!') && !cleanSentence.endsWith('?')) {
        cleanSentence += '.';
      }
      if (!useCases.includes(cleanSentence)) {
        useCases.push(cleanSentence);
      }
      if (useCases.length >= 3) break;
    }
  }

  // 3. Absolute fallbacks if still not enough items
  const readableTitle = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const defaultUseCases = [
    `Automate repetitive ${readableTitle.toLowerCase()} development routines.`,
    `Standardize workspace output and document generation for ${readableTitle.toLowerCase()}.`,
    `Integrate advanced ${readableTitle.toLowerCase()} model directives into your agent pipeline.`
  ];

  while (useCases.length < 3) {
    const nextFallback = defaultUseCases[useCases.length];
    useCases.push(nextFallback);
  }

  // Format presets tip dynamically
  const presetsTip = `Deploy this strategy in your agent runtime. Inspect the repository details and codebase configurations in the inspector below to customize the ${readableTitle} behavior.`;

  return {
    description,
    useCases: useCases.slice(0, 3),
    presetsTip
  };
}
