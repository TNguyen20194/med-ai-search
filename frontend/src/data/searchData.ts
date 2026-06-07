export type SearchCategory =
  | "Term Suggestions"
  | "Modalities"
  | "Interventions"
  | "Worksheets"
  | "Professional Tips"
  | "Courses and Workshops";

export type SearchCondition =
  | "depression"
  | "anxiety"
  | "stress"
  | "trauma";

export type SearchAudience =
  | "children"
  | "adolescents"
  | "adults"
  | "caregivers"
  | "clinicians";

export type SearchData = {
  id: string;
  condition: SearchCondition;
  category: SearchCategory;
  title: string;
  content?: string;
  url?: string;
  tags: string[];
  audience?: SearchAudience[];
};

export const sampleData: SearchData[] = [
  {
    id: "dep_term_001",
    condition: "depression",
    category: "Term Suggestions",
    title: "Childhood Depression",
    tags: ["Depression", "Children", "Mood"],
    audience: ["children", "caregivers", "clinicians"],
  },
  {
    id: "dep_term_002",
    condition: "depression",
    category: "Term Suggestions",
    title: "Adolescent Depression",
    tags: ["Depression", "Adolescents", "Teen", "Mood"],
    audience: ["adolescents", "caregivers", "clinicians"],
  },
  {
    id: "dep_mod_001",
    condition: "depression",
    category: "Modalities",
    title: "Cognitive Behavioral Therapy",
    content:
      "CBT helps children and adolescents identify links between thoughts, feelings, and behaviors.",
    tags: ["CBT", "Depression", "Children", "Adolescents", "Thoughts", "Behavior"],
    audience: ["children", "adolescents", "clinicians"],
  },
  {
    id: "dep_mod_002",
    condition: "depression",
    category: "Modalities",
    title: "Interpersonal Therapy for Adolescents",
    content:
      "IPT-A focuses on relationships, communication, role transitions, and interpersonal stressors related to depressive symptoms.",
    tags: ["IPT-A", "Depression", "Adolescents", "Relationships", "Communication"],
    audience: ["adolescents", "clinicians"],
  },
  {
    id: "dep_int_001",
    condition: "depression",
    category: "Interventions",
    title: "Mood Tracking",
    content:
      "A daily check-in tool for helping clients notice mood patterns, triggers, and changes over time.",
    tags: ["Mood Tracking", "Depression", "Self-Awareness", "Daily Check-In"],
    audience: ["children", "adolescents", "clinicians"],
  },
  {
    id: "dep_ws_001",
    condition: "depression",
    category: "Worksheets",
    title: "Depression Worksheets for Children",
    content: "Worksheet resources for children experiencing depressive symptoms.",
    url: "https://www.therapistaid.com/therapy-worksheets/depression/children",
    tags: ["Worksheet", "Depression", "Children", "Therapist Aid", "CBT"],
    audience: ["children", "caregivers", "clinicians"],
  },
  {
    id: "dep_tip_001",
    condition: "depression",
    category: "Professional Tips",
    title: "Assess Functioning Across Settings",
    content:
      "Ask about changes at home, school, friendships, hobbies, sleep, appetite, and daily routine.",
    tags: ["Assessment", "Depression", "Children", "Adolescents", "Functioning"],
    audience: ["clinicians"],
  },
  {
    id: "dep_course_001",
    condition: "depression",
    category: "Courses and Workshops",
    title: "CBT for Depression in Children and Adolescents",
    content:
      "Training focused on CBT concepts, behavioral activation, cognitive restructuring, and youth depression treatment planning.",
    tags: ["CBT", "Depression", "Training", "Children", "Adolescents"],
    audience: ["clinicians"],
  },

  {
    id: "anx_term_001",
    condition: "anxiety",
    category: "Term Suggestions",
    title: "Childhood Anxiety",
    tags: ["Anxiety", "Children", "Worry", "Fear"],
    audience: ["children", "caregivers", "clinicians"],
  },
  {
    id: "anx_mod_001",
    condition: "anxiety",
    category: "Modalities",
    title: "Cognitive Behavioral Therapy for Anxiety",
    content:
      "CBT helps clients identify anxious thoughts, reduce avoidance, and practice coping skills.",
    tags: ["CBT", "Anxiety", "Worry", "Avoidance", "Coping Skills"],
    audience: ["children", "adolescents", "clinicians"],
  },
  {
    id: "anx_int_001",
    condition: "anxiety",
    category: "Interventions",
    title: "Grounding Exercise",
    content:
      "A present-moment coping skill that helps clients notice sensory information and reduce anxiety intensity.",
    tags: ["Grounding", "Anxiety", "Coping Skills", "Regulation"],
    audience: ["children", "adolescents", "clinicians"],
  },
  {
    id: "anx_ws_001",
    condition: "anxiety",
    category: "Worksheets",
    title: "Anxiety Worksheets for Children",
    content: "Worksheet resources for children experiencing anxiety symptoms.",
    url: "https://www.therapistaid.com/therapy-worksheets/anxiety/children",
    tags: ["Worksheet", "Anxiety", "Children", "CBT"],
    audience: ["children", "caregivers", "clinicians"],
  },
  {
    id: "anx_tip_001",
    condition: "anxiety",
    category: "Professional Tips",
    title: "Watch for Avoidance Patterns",
    content:
      "Anxiety often becomes stronger when avoidance is reinforced. Explore what the client avoids and what support they need to approach situations gradually.",
    tags: ["Anxiety", "Avoidance", "Assessment", "Exposure"],
    audience: ["clinicians"],
  },
  {
    id: "anx_course_001",
    condition: "anxiety",
    category: "Courses and Workshops",
    title: "Exposure-Based CBT for Youth Anxiety",
    content:
      "Training on gradual exposure, fear hierarchies, cognitive coping, and caregiver-supported anxiety treatment.",
    tags: ["Anxiety", "CBT", "Exposure", "Training"],
    audience: ["clinicians"],
  },

  {
    id: "stress_term_001",
    condition: "stress",
    category: "Term Suggestions",
    title: "Stress Management",
    tags: ["Stress", "Coping", "Wellbeing"],
    audience: ["adolescents", "adults", "clinicians"],
  },
  {
    id: "stress_mod_001",
    condition: "stress",
    category: "Modalities",
    title: "Mindfulness-Based Stress Reduction",
    content:
      "Mindfulness-based approaches help clients notice stress responses and practice nonjudgmental awareness.",
    tags: ["Stress", "Mindfulness", "Regulation", "Self-Awareness"],
    audience: ["adolescents", "adults", "clinicians"],
  },
  {
    id: "stress_int_001",
    condition: "stress",
    category: "Interventions",
    title: "Stress Mapping",
    content:
      "A structured activity for identifying stressors, body signals, thoughts, coping responses, and support options.",
    tags: ["Stress", "Mapping", "Coping Skills", "Self-Awareness"],
    audience: ["adolescents", "adults", "clinicians"],
  },
  {
    id: "stress_ws_001",
    condition: "stress",
    category: "Worksheets",
    title: "Stress Management Worksheets",
    content:
      "Worksheet resources for identifying stressors and building coping strategies.",
    url: "https://www.therapistaid.com/therapy-worksheets/stress",
    tags: ["Worksheet", "Stress", "Coping Skills", "Self-Care"],
    audience: ["adolescents", "adults", "clinicians"],
  },
  {
    id: "stress_tip_001",
    condition: "stress",
    category: "Professional Tips",
    title: "Separate Stressors from Stress Responses",
    content:
      "Help clients distinguish external stressors from internal responses such as thoughts, body sensations, emotions, and behaviors.",
    tags: ["Stress", "Assessment", "Psychoeducation", "Coping"],
    audience: ["clinicians"],
  },
  {
    id: "stress_course_001",
    condition: "stress",
    category: "Courses and Workshops",
    title: "Stress Management Skills for Clinical Practice",
    content:
      "Training on stress assessment, coping plans, regulation skills, and psychoeducation.",
    tags: ["Stress", "Training", "Coping Skills", "Regulation"],
    audience: ["clinicians"],
  },

  {
    id: "trauma_term_001",
    condition: "trauma",
    category: "Term Suggestions",
    title: "Childhood Trauma",
    tags: ["Trauma", "Children", "Safety", "Support"],
    audience: ["children", "caregivers", "clinicians"],
  },
  {
    id: "trauma_mod_001",
    condition: "trauma",
    category: "Modalities",
    title: "Trauma-Focused Cognitive Behavioral Therapy",
    content:
      "TF-CBT is a structured therapy approach for children and adolescents affected by trauma, often involving coping skills, gradual processing, and caregiver support.",
    tags: ["TF-CBT", "Trauma", "Children", "Adolescents", "Caregivers"],
    audience: ["children", "adolescents", "caregivers", "clinicians"],
  },
  {
    id: "trauma_int_001",
    condition: "trauma",
    category: "Interventions",
    title: "Safety and Stabilization Planning",
    content:
      "A planning activity focused on emotional regulation, support people, predictable routines, and steps to use when distress increases.",
    tags: ["Trauma", "Safety", "Stabilization", "Regulation"],
    audience: ["children", "adolescents", "caregivers", "clinicians"],
  },
  {
    id: "trauma_ws_001",
    condition: "trauma",
    category: "Worksheets",
    title: "Trauma Worksheets",
    content:
      "Worksheet resources for trauma-related coping, grounding, and emotional regulation.",
    url: "https://www.therapistaid.com/therapy-worksheets/trauma",
    tags: ["Worksheet", "Trauma", "Grounding", "Coping Skills"],
    audience: ["adolescents", "adults", "clinicians"],
  },
  {
    id: "trauma_tip_001",
    condition: "trauma",
    category: "Professional Tips",
    title: "Prioritize Stabilization First",
    content:
      "Focus on safety, regulation, predictable routines, and support before moving into trauma processing.",
    tags: ["Trauma", "Safety", "Stabilization", "Clinical Judgment"],
    audience: ["clinicians"],
  },
  {
    id: "trauma_course_001",
    condition: "trauma",
    category: "Courses and Workshops",
    title: "Trauma-Informed Care for Children and Adolescents",
    content:
      "Training on trauma-informed assessment, stabilization, caregiver involvement, and trauma-sensitive interventions.",
    tags: ["Trauma", "Training", "Trauma-Informed Care", "Children", "Adolescents"],
    audience: ["clinicians"],
  },
];
