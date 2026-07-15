import api from "./api";

export const getLLMResponse = async (message: string) => {
  console.log("is it getting here?", message);
  try {
    const response = await api.post("/v1/chat/completions", {
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that provides concise and accurate answers to user queries you are a experienced psychotherapise that specializes in child psychology and you are helping a parent understand their child better and provide advice on how to handle certain situations with their child",
        },
        {
          role: "user",
          content:
            "give me advice on how to handle my child when they are diagnosed with " +
            message +
            " need data in json format for modalities and worksheets and tips",
        },
      ],
      max_tokens: 300,
      temperature: 0.2,
    });

    console.log("response =", response);

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching LLM response:", error);
    throw error;
  }
};
