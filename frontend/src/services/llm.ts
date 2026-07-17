import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "http://localhost:8000/v1",
  apiKey: "local-llama-server",
  dangerouslyAllowBrowser: true,
});






type Specialty = "child psychology" | "adult psychology" | "pet psychology";



const SYSTEM_PROMPT = (specialty: Specialty) => `
  You are a helpful assistant that provides concise and accurate answers to user queries. 
  You are an experienced psychotherapist specializing in ${specialty}, 
  helping parents understand their children better and providing advice on handling various situations.
`;


export const getLLMResponseForModalities = async (message: string, webContext: object, specialty?: Specialty) => {
  const response = await openai.chat.completions.create({
    model: "local-llama-server",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT(specialty || "child psychology"),
      },
      {
        role: "user",
        content: `
          Search Context: ${JSON.stringify(webContext)}
          \n\n
          USER_PROMPT: give me advice on how to handle my child when they are diagnosed with ${message}.
          Please provide data in JSON format for modalities.
        `,
      },
    ],
    stream: false,
    temperature: 0.2,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "modalitiesResponse",
        strict: true,
        schema: {
          type: "object",
          properties: {
            modalities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  resources: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: ["name", "description", "resources"],
              },
            },
          },
        },
      },
    },
  });

  const content = response.choices[0].message?.content;
  if (!content) throw new Error("No content returned from LLM response");
  return content;   
}

export const getLLMResponseForWorksheets = async (message: string, webContext: object, specialty?: Specialty) => {
  const response = await openai.chat.completions.create({
    model: "local-llama-server",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT(specialty || "child psychology"),
      },
      {
        role: "user",
        content: `
          Search Context: ${JSON.stringify(webContext)}
          \n\n
          USER_PROMPT: give me advice on how to handle my child when they are diagnosed with ${message}.
          Please provide data in JSON format for worksheets.
        `,
      },
    ],
    stream: false,
    temperature: 0.2,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "worksheetsResponse",
        strict: true,
        schema: {
          type: "object",
          properties: {
            worksheets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  link: { type: "string" },
                },
                required: ["title", "description", "link"],
              },
            },
          },    
        },
      },
    },
  });

  const content = response.choices[0].message?.content;
  if (!content) throw new Error("No content returned from LLM response");
  return content;
}

// const getLLMResponseForTips = async (message: string, webContext: object) => {

// }

// const getLLMResponseForInterventions = async (message: string, webContext: object) => {

// }

// const getLLMResponseForCourses = async (message: string, webContext: object) => {

// }

// const getLLMResponseForWorkshops = async (message: string, webContext: object) => {

// }

// interface IWebContext {

// }

export const getLLMResponse = async (
  message: string,
  webContext: object,
  specialty?: Specialty,
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "local-llama-server",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT(specialty || "child psychology"),
        },
        {
          role: "user",
          content: `
            Search Context: ${JSON.stringify(webContext)}
            \n\n
            USER_PROMPT: give me advice on how to handle my child when they are diagnosed with ${message}.
            Please provide data in JSON format for modalities, worksheets, and tips.
          `,
        },
      ],
      stream: false,
      temperature: 0.2,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "psychotherapyResponse",
          strict: true,
          schema: {
            type: "object",
            properties: {
              modalities: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    resources: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: ["name", "description", "resources"],
                },
              },
              worksheets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    link: { type: "string" },
                  },
                  required: ["title", "description", "link"],
                },
              },
              interventions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },

                    steps: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: ["name", "description", "steps"],
                },
              },
              tips: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tip: { type: "string" },
                  },
                  required: ["tip"],
                },
              },
              courses: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    link: { type: "string" },
                  },
                  required: ["title", "description", "link"],
                },
              },
              workshops: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    link: { type: "string" },
                  },
                  required: ["title", "description", "link"],
                },
              },
            },
          },
        },
      },
    });

    const content = response.choices[0].message?.content;
    if (!content) throw new Error("No content returned from LLM response");
    return content;
  } catch (error) {
    console.error("Error fetching LLM response:", error);
    throw null;
  }
};

// import api from "./api";

// export const getLLMResponse = async (message: string) => {
//   console.log("is it getting here?", message);
//   try {
//     const response = await api.post("/v1/chat/completions", {
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful assistant that provides concise and accurate answers to user queries you are a experienced psychotherapist that specializes in child psychology and you are helping a parent understand their child better and provide advice on how to handle certain situations with their child",
//         },
//         {
//           role: "user",
//           content:
//             "give me advice on how to handle my child when they are diagnosed with " +
//             message +
//             " need data in json format for modalities and worksheets and tips",
//         },
//       ],
//       // max_tokens: 300,
//       temperature: 0.2,
//     });

//     console.log("response =", response);

//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error fetching LLM response:", error);
//     throw error;
//   }
// };
