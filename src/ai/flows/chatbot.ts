/**
 * @fileOverview A simple chatbot flow using Gemini.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

// Imports de Zod y Genkit eliminados para la exportación estática.

const MessageSchema = {
  role: 'user' || 'model',
  content: '',
};

export type ChatInput = {
  history: Array<typeof MessageSchema>;
  incidentContext?: {
    title: string;
    description: string;
    category: string;
    status: string;
  };
};

export type ChatOutput = {
  response: string;
};

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return { response: "Lo sentimos, el chat no está disponible en la versión estática." };
}
