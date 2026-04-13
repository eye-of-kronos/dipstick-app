export type Category =
  | "Strategy to Execution Alignment"
  | "Speed"
  | "Predictability"
  | "Commitment"
  | "Quality"
  | "AI Enablement";

export interface ResponseOption {
  label: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: ResponseOption[];
  category: Category;
}

export interface MaturityBand {
  label: string;
  color: "red" | "yellow" | "green" | "blue";
  emoji: string;
  scoreRange: [number, number];
  insight: string;
}

export interface CategoryConfig {
  name: Category;
  icon: string;
  maxScore: number;
  bands: MaturityBand[];
}

export const questions: Question[] = [
  // Strategy to Execution Alignment
  {
    id: 1,
    text: "Do delivery teams clearly understand how their backlog connects to business outcomes (revenue, customer value)?",
    options: [
      { label: "No", score: 0 },
      { label: "Partially", score: 1 },
      { label: "Always", score: 2 },
    ],
    category: "Strategy to Execution Alignment",
  },
  // Speed
  {
    id: 2,
    text: "Do delivery teams consistently transform validated ideas into tangible customer value at speed?",
    options: [
      { label: "Rarely", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Consistently", score: 2 },
    ],
    category: "Speed",
  },
  {
    id: 3,
    text: "Do teams deliver meeting or exceeding customer commitment/SLA?",
    options: [
      { label: "Rarely", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Consistently", score: 2 },
    ],
    category: "Speed",
  },
  // Predictability
  {
    id: 4,
    text: "Do you have a clear way to assess delivery progress across iteration or delivery cycle?",
    options: [
      { label: "No", score: 0 },
      { label: "Partially", score: 1 },
      { label: "Always", score: 2 },
    ],
    category: "Predictability",
  },
  {
    id: 5,
    text: "Are delivery teams able to spot early warning signals that indicate potential delivery risks?",
    options: [
      { label: "Rarely", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Consistently", score: 2 },
    ],
    category: "Predictability",
  },
  {
    id: 6,
    text: "Does your delivery engine handle requirement changes while maintaining predictable outcomes?",
    options: [
      { label: "Rarely", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Consistently", score: 2 },
    ],
    category: "Predictability",
  },
  // Commitment
  {
    id: 7,
    text: "Do teams complete what they start within an iteration or delivery cycle?",
    options: [
      { label: "No", score: 0 },
      { label: "Partially", score: 1 },
      { label: "Always", score: 2 },
    ],
    category: "Commitment",
  },
  // Quality
  {
    id: 8,
    text: "How often does completed work require rework or urgent fixes?",
    options: [
      { label: "Often", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Rarely", score: 2 },
    ],
    category: "Quality",
  },
  // AI Enablement
  {
    id: 9,
    text: "When tough trade-offs are needed, do leaders use real-time data and AI to decide quickly and confidently?",
    options: [
      { label: "Rarely", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Extensively", score: 2 },
    ],
    category: "AI Enablement",
  },
  {
    id: 10,
    text: "Do delivery teams use AI tools to enhance speed of execution and quality of deliverable?",
    options: [
      { label: "Rarely", score: 0 },
      { label: "Sometimes", score: 1 },
      { label: "Extensively", score: 2 },
    ],
    category: "AI Enablement",
  },
];

export const categoryConfigs: CategoryConfig[] = [
  {
    name: "Strategy to Execution Alignment",
    icon: "🎯",
    maxScore: 2,
    bands: [
      {
        label: "Low",
        color: "red",
        emoji: "🔴",
        scoreRange: [0, 0],
        insight:
          "The execution lacks alignment with measurable business values increasing risk of misaligned investment.",
      },
      {
        label: "Moderate",
        color: "yellow",
        emoji: "🟡",
        scoreRange: [1, 1],
        insight:
          "Some linkage between backlog and outcomes exists, but prioritization may still drift from strategic intent.",
      },
      {
        label: "High",
        color: "green",
        emoji: "🟢",
        scoreRange: [2, 2],
        insight:
          "Execution is purposeful and strategically aligned on delivering business value.",
      },
    ],
  },
  {
    name: "Speed",
    icon: "⚡",
    maxScore: 4,
    bands: [
      {
        label: "Low",
        color: "red",
        emoji: "🔴",
        scoreRange: [0, 1],
        insight:
          "Cycle times are inconsistent or slow. Value realization is delayed, impacting customer responsiveness and competitive positioning.",
      },
      {
        label: "Moderate",
        color: "yellow",
        emoji: "🟡",
        scoreRange: [2, 3],
        insight:
          "Delivery speed is stable but constrained by bottlenecks, dependency friction, or shifting priorities.",
      },
      {
        label: "High",
        color: "green",
        emoji: "🟢",
        scoreRange: [4, 4],
        insight:
          "Teams convert ideas into customer value rapidly and reliably. Speed is a differentiator rather than a pressure point.",
      },
    ],
  },
  {
    name: "Predictability",
    icon: "📈",
    maxScore: 6,
    bands: [
      {
        label: "Fragile",
        color: "red",
        emoji: "🔴",
        scoreRange: [0, 1],
        insight:
          "Delivery outcomes are reactive and variance is high. Risks are typically discovered late, leading to escalations and erosion of stakeholder confidence.",
      },
      {
        label: "Developing",
        color: "yellow",
        emoji: "🟡",
        scoreRange: [2, 3],
        insight:
          "Some forecasting discipline exists, but delivery confidence fluctuates. Risk detection and dependency management need strengthening.",
      },
      {
        label: "Mature",
        color: "green",
        emoji: "🟢",
        scoreRange: [4, 5],
        insight:
          "Forecasting is data-driven and generally reliable. Risks and dependencies are proactively managed before impacting commitments.",
      },
      {
        label: "Systemic",
        color: "blue",
        emoji: "🔵",
        scoreRange: [6, 6],
        insight:
          "Delivery is highly predictable with early-warning systems embedded into execution. Stakeholders view commitments as dependable and credible.",
      },
    ],
  },
  {
    name: "Commitment",
    icon: "🤝",
    maxScore: 2,
    bands: [
      {
        label: "Low",
        color: "red",
        emoji: "🔴",
        scoreRange: [0, 0],
        insight:
          "Teams frequently overcommit or under-deliver. Iteration integrity is weak, affecting trust and execution rhythm.",
      },
      {
        label: "Moderate",
        color: "yellow",
        emoji: "🟡",
        scoreRange: [1, 1],
        insight:
          "Commitment discipline exists but is inconsistently upheld. External dependencies or planning inaccuracies affect team velocity.",
      },
      {
        label: "High",
        color: "green",
        emoji: "🟢",
        scoreRange: [2, 2],
        insight:
          "Teams consistently deliver what they commit. Planning discipline and execution ability reinforce credibility.",
      },
    ],
  },
  {
    name: "Quality",
    icon: "🛠",
    maxScore: 2,
    bands: [
      {
        label: "Low",
        color: "red",
        emoji: "🔴",
        scoreRange: [0, 0],
        insight:
          "High rework or defect leakage suggests quality is inspected in rather than built in. This increases cost and erodes stakeholder confidence.",
      },
      {
        label: "Moderate",
        color: "yellow",
        emoji: "🟡",
        scoreRange: [1, 1],
        insight:
          "Quality practices exist but gaps result in occasional rework or production instability.",
      },
      {
        label: "High",
        color: "green",
        emoji: "🟢",
        scoreRange: [2, 2],
        insight:
          "Quality is embedded into the delivery system. Low rework and stable releases enhance both speed and cost efficiency.",
      },
    ],
  },
  {
    name: "AI Enablement",
    icon: "🤖",
    maxScore: 4,
    bands: [
      {
        label: "Low",
        color: "red",
        emoji: "🔴",
        scoreRange: [0, 1],
        insight:
          "AI is minimally used or limited to experimentation. Decision-making remains manual and reactive.",
      },
      {
        label: "Moderate",
        color: "yellow",
        emoji: "🟡",
        scoreRange: [2, 3],
        insight:
          "AI is supporting parts of execution, but is not yet embedded into delivery planning and execution.",
      },
      {
        label: "High",
        color: "green",
        emoji: "🟢",
        scoreRange: [4, 4],
        insight:
          "AI augments planning, prioritization, forecasting, risk sensing, and decision-making. Leaders receive proactive insights, reducing subjectivity and improving foresight.",
      },
    ],
  },
];

export const TOTAL_MAX_SCORE = categoryConfigs.reduce(
  (sum, c) => sum + c.maxScore,
  0
);

export function getOverallMaturityZone(score: number, maxScore: number): { label: string; color: string; insight: string } {
  const pct = score / maxScore;
  if (pct >= 0.85) {
    return {
      label: "Excelling",
      color: "green",
      insight: "Delivery meeting the business goals and market demands.",
    };
  } else if (pct >= 0.6) {
    return {
      label: "Progressing",
      color: "yellow",
      insight:
        "Delivery is on track but has areas that need attention to consistently meet business goals.",
    };
  } else {
    return {
      label: "Needs Attention",
      color: "red",
      insight:
        "Significant gaps exist in delivery maturity. Focused intervention is needed to align execution with business outcomes.",
    };
  }
}
