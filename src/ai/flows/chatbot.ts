'use server';
/**
 * @fileOverview A simple chatbot flow using Gemini.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history }) => {
    const systemPrompt = `You are a helpful and friendly customer service assistant for EJA TransGlobal, a global logistics and transportation company.
Your name is EJA-Bot.
Your goal is to assist users with their questions about the company's services, shipment tracking, and general inquiries.
Keep your answers concise and helpful.
The user is interacting with you through a chat widget on the company website.
The current date is ${new Date().toLocaleDateString('es-ES')}.
If you don't know the answer, say that you will connect them with a human agent.`;

    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: history.map(m => ({
          role: m.role,
          content: [{ text: m.content }],
        })),
      system: systemPrompt,
      config: {
        temperature: 0.7,
      },
    });

    return {
      response: output?.text ?? "Lo siento, no he podido procesar tu solicitud en este momento.",
    };
  }
);
