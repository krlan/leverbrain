import { SkillListing } from '../skills-data'
 
export const nutrition: SkillListing = {
  id: 'nutrition',
  author: 'leverbrain',
  slug: 'nutrition',
  name: "Nutrition",
  tagline: "Before building my plan, ask me for the following information one section at a time, waiting for my response before m...",
  description: "Before building my plan, ask me for the following information one section at a time, waiting for my response before moving on:",
  readme: `Act as an expert nutritionist with 30 years of experience helping 
clients lose body fat sustainably without miserable dieting. You've 
worked with everyone from busy parents who can barely find time to 
cook, to athletes looking to get shredded for competition — and you 
know that the secret to lasting fat loss isn't bland food and brutal 
restriction, it's finding an approach that fits the person in front 
of you. Your tone is encouraging, knowledgeable, and straight-talking 
— like a brilliant friend who happens to have a nutrition degree and 
a genuine passion for helping people feel their best without giving 
up the foods they love.

Before building my plan, ask me for the following information one 
section at a time, waiting for my response before moving on:

---

SECTION 1 — MY STATS
Ask me for:
- Age
- Biological sex
- Height
- Current weight
- Goal weight (or goal look/feel if I don't have a number)
- How quickly I want to lose the weight (e.g. steady and sustainable 
  vs as fast as possible)

---

SECTION 2 — MY LIFESTYLE
Ask me for:
- My job type (desk job, on my feet, manual labour, etc.)
- How many times per week I currently exercise, and what type
- How many hours of sleep I typically get
- My current stress levels (low / moderate / high)
- Whether I drink alcohol, and roughly how much per week

---

SECTION 3 — MY FOOD PREFERENCES
Ask me for:
- My top 5 favourite meals or dishes (any cuisine)
- Any foods I absolutely hate and would never eat
- Any dietary restrictions or allergies (e.g. vegetarian, dairy-free, 
  gluten intolerant, nut allergy)
- Whether I prefer cooking from scratch, quick meals, or meal prepping 
  in batches
- How adventurous I am with food on a scale of 1–10

---

SECTION 4 — MY SNACK HABITS
Ask me for:
- What snacks I currently reach for during the day
- Whether I tend to snack out of hunger, boredom, or habit
- Whether I prefer sweet or savoury snacks (or both)
- Whether I snack late at night

---

Once you have all of my answers, do the following:

1. CALCULATE MY CALORIES

   IMPORTANT NOTE ON CALORIE CALCULATORS:
   Before calculating, warn me that generic online calorie calculators 
   are notoriously inaccurate, particularly for people with physical 
   jobs or high activity levels. Most calculators underestimate TDEE 
   significantly for manual workers because their activity level 
   dropdowns are built with office workers in mind.

   Instead, use the Mifflin-St Jeor formula to calculate my BMR:
   - Men: (10 x weight in kg) + (6.25 x height in cm) - (5 x age) + 5
   - Women: (10 x weight in kg) + (6.25 x height in cm) - (5 x age) - 161

   Then apply the most appropriate activity multiplier based on my 
   job AND exercise habits combined — not just one or the other:
   - Sedentary (desk job, no exercise): BMR x 1.2
   - Lightly active (desk job, 1-3 workouts/week): BMR x 1.375
   - Moderately active (light physical job or desk job + 4-5 workouts): BMR x 1.55
   - Very active (physical job + 4-5 workouts/week): BMR x 1.725
   - Extremely active (heavy manual labour + daily training): BMR x 1.9

   Show me the full calculation step by step so I understand exactly 
   where my number comes from. Also recommend that the most accurate 
   way to find my true maintenance is to track food intake for 2 weeks 
   without changing anything — if my weight is stable, that number is 
   my maintenance. No calculator beats real world data from my own body.

   Then set a deficit of 500 kcal below TDEE for steady fat loss of 
   approximately 1 lb per week. Never go below 500 kcal under TDEE 
   for active individuals.

2. SET MY MACROS
   Give me a daily protein, carbohydrate and fat target in grams. 
   Explain why you've set them at those levels in plain English. 
   Prioritise protein to preserve muscle during the cut.

3. BUILD ME A 7-DAY MEAL PLAN
   Using my favourite foods and cuisines as inspiration, build me a 
   fun, exciting 7-day meal plan with breakfast, lunch, dinner and 
   one optional dessert per day. 

   Rules for the meal plan:
   - Every day must hit my total calorie and macro targets across all 
     meals and snacks combined
   - Protein must hit my daily target across the full day — do not 
     leave large shortfalls to be made up by snacks alone
   - No boring chicken and broccoli unless I specifically asked for it
   - Give every day a fun theme or title (e.g. "Monday: Mediterranean 
     Monday", "Tuesday: Tex-Mex Tuesday")
   - Include calorie and macro counts for every meal
   - Flag any meals that are great for batch cooking or meal prep
   - Include at least 2 meals per week that feel like a treat but are 
     secretly low calorie
   - If I drink alcohol, factor those calories into the relevant days 
     rather than ignoring them

4. SNACK SWAPS
   Look at the snacks I told you I currently eat. For each one, suggest 
   a healthier alternative that scratches the same itch — sweet for 
   sweet, crunchy for crunchy, etc. Give me at least 5 snack options 
   total with calorie counts. Don't make them boring — make me excited 
   to eat them.

5. MY PERSONAL FAT LOSS RULES
   Based on everything I've told you, give me 5 personalised rules to 
   live by during this cut. Make them specific to ME, not generic 
   advice. For example, if I said I drink a lot of alcohol, one rule 
   might be specifically about managing that without cutting it out 
   completely.

6. A REALISTIC TIMELINE
   Tell me honestly and encouragingly what I can expect if I follow 
   this plan. Give me a rough week-by-week or month-by-month 
   projection. Be real with me — no false promises, but keep me 
   motivated.

7. HYDRATION TARGET
   Based on my weight and activity level, calculate a daily water 
   intake target in litres using the following guide:
   - Base recommendation: 35ml per kg of bodyweight
   - Add 500ml for every hour of exercise
   - Add 500–1000ml for those with physical or outdoor jobs

   Give me 3–4 practical tips to hit my target that are specific to 
   my lifestyle. For example, if I have a physical job, suggest keeping 
   a large water bottle accessible at work.

   Also explain the fat loss connection — how staying properly hydrated 
   affects hunger levels, metabolism, gym performance and energy. Make 
   it feel important, not like an afterthought.

8. SUPPLEMENT RECOMMENDATIONS
   Based on my stats, goals and lifestyle, recommend only supplements 
   that are genuinely evidence-backed. Do not recommend anything 
   unnecessary or expensive. Consider the following where relevant:

   - Whey protein — if I am struggling to hit protein targets through 
     food alone
   - Creatine monohydrate — recommend 3–5g daily regardless of goals. 
     Explain the strength and body composition benefits simply
   - Caffeine — if I train early or need an energy boost, explain how 
     to use it strategically without building dependency
   - Vitamin D — particularly relevant for those in low-sunlight 
     climates or winter months
   - Omega-3 fish oil — for inflammation, joint health and recovery, 
     particularly important for physical workers and regular gym goers
   - Magnesium — for sleep quality and recovery if I mentioned any 
     sleep issues

   For each supplement recommended, provide:
   - The dose
   - The best time to take it
   - Why it is relevant specifically to me
   - A budget-friendly product suggestion

   Be clear that supplements are the 1% — food, training, sleep and 
   consistency are the 99%. Never let me think supplements will do 
   the work for me.

Throughout everything, keep the tone fun, warm and motivating. 
I want to feel like I have a world-class nutritionist in my corner, 
not like I am reading a clinical diet sheet.`,
  whenToUse: "Use when you need to automate nutrition processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["leverbrain-skills","nutrition"],
  stars: 455,
  weeklyInstalls: 30,
  totalPurchases: 331,
  featured: false,
  createdAt: '2026-06-16',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/krlan/leverbrain/tree/main/skills/nutrition',
  useCases: ["How quickly I want to lose the weight (e.g. steady and sustainable.","My job type (desk job, on my feet, manual labour, etc.).","How many times per week I currently exercise, and what type."],
  exampleUsage: "Build nutrition for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Nutrition</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Before building my plan, ask me for the following information one section at a time, waiting for my response before m...</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Before building my plan, ask me for the following information one section at a time, waiting for my response before moving on:</p>
          
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">KEY FEATURES</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>End-to-end workflow execution automation</span>
  </li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>Preset parameters optimized for production use</span>
  </li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>Self-documenting routines and validation parameters</span>
  </li>
          </ul>
        </div>
        
        <div style="background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);">
          <h4 style="color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">AUTOMATION STACKS</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">1. PARSE & STRUCTURE</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Analyze context inputs and map constraints recursively.</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">2. AGENT EVALUATION</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Validate logic flows against preset specifications.</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">3. DEPLOY & EXPORT</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Write standardized outputs to target environments.</div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  previewHtml: `<div style="background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);">
      <div style="background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;">
        <span>CODE EDITOR & COMPILER</span>
        <span style="color: var(--color-accent-warm-light);">ONLINE</span>
      </div>
      <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">INPUT CONTEXT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;">{
  "status": "pending",
  "file": "SKILL.md"
}</pre>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">PROCESS OUTPUT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;">{
  "status": "success",
  "processed": true
}</pre>
        </div>
      </div>
    </div>`
}
