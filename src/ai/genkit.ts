import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [/*googleAI()*/], // Comentado para evitar la inicialización en la compilación estática
  model: 'googleai/gemini-2.5-flash',
});
