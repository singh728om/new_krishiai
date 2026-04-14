'use server';
/**
 * @fileOverview An AI agent for diagnosing plant diseases from leaf photos.
 *
 * - diagnoseLeaf - A function that handles the plant disease diagnosis process.
 * - DiagnoseLeafInput - The input type for the diagnoseLeaf function.
 * - DiagnoseLeafOutput - The return type for the diagnoseLeaf function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DiagnoseLeafInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a crop leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  cropType: z.string().describe('The type of crop (e.g., Tomato, Wheat, Cotton).'),
});
export type DiagnoseLeafInput = z.infer<typeof DiagnoseLeafInputSchema>;

const DiagnoseLeafOutputSchema = z.object({
  crop: z.string().describe('The identified crop type.'),
  issue: z.string().describe('The diagnosed disease or issue.'),
  confidence: z.number().describe('The confidence level of the diagnosis, a number between 0 and 100.'),
  severity: z.enum(['LOW', 'MODERATE', 'HIGH']).describe('The severity of the disease.'),
  cureEnglish: z.string().describe('Recommended treatment in English.'),
  cureHindi: z.string().describe('Recommended treatment in Hindi.'),
});
export type DiagnoseLeafOutput = z.infer<typeof DiagnoseLeafOutputSchema>;

export async function diagnoseLeaf(input: DiagnoseLeafInput): Promise<DiagnoseLeafOutput> {
  return diagnoseLeafFlow(input);
}

const diagnoseLeafPrompt = ai.definePrompt({
  name: 'diagnoseLeafPrompt',
  input: { schema: DiagnoseLeafInputSchema },
  output: { schema: DiagnoseLeafOutputSchema },
  prompt: `You are an expert botanist and agricultural AI assistant specialized in diagnosing crop diseases. Your task is to analyze the provided image of a crop leaf and the specified crop type to identify any diseases or issues. Provide a detailed diagnosis, including a confidence score, severity level, and specific treatment recommendations in both English and Hindi.

Crop Type: {{{cropType}}}
Leaf Photo: {{media url=photoDataUri}}

Provide your response strictly in the following JSON format:
{{"crop": "identified crop type", "issue": "diagnosed disease or issue", "confidence": confidence_score (number 0-100), "severity": "LOW" | "MODERATE" | "HIGH", "cureEnglish": "recommended treatment in English", "cureHindi": "recommended treatment in Hindi"}}`,
});

const diagnoseLeafFlow = ai.defineFlow(
  {
    name: 'diagnoseLeafFlow',
    inputSchema: DiagnoseLeafInputSchema,
    outputSchema: DiagnoseLeafOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image', // Using a multi-modal model for image input
      prompt: diagnoseLeafPrompt(input),
    });
    if (!output) {
      throw new Error('No output received from the AI model.');
    }
    return output;
  }
);
