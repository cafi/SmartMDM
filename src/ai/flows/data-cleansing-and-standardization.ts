'use server';

/**
 * @fileOverview A data cleansing and standardization AI agent.
 *
 * - cleanseAndStandardize - A function that handles the data cleansing and standardization process.
 * - CleanseAndStandardizeInput - The input type for the cleanseAndStandardize function.
 * - CleanseAndStandardizeOutput - The return type for the cleanseAndStandardize function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CleanseAndStandardizeInputSchema = z.object({
  rawData: z
    .string()
    .describe('The raw material or service master data to be cleansed and standardized.'),
  dataType: z
    .enum(['material', 'service'])
    .describe('The type of data, either material or service.'),
  rules: z
    .string()
    .optional()
    .describe('Optional rules to use during the data cleansing. If not provided, the LLM will use its best judgement.'),
});
export type CleanseAndStandardizeInput = z.infer<typeof CleanseAndStandardizeInputSchema>;

const CleanseAndStandardizeOutputSchema = z.object({
  cleansedData: z
    .string()
    .describe('The cleansed and standardized material or service master data.'),
  dataQualityScore: z
    .number()
    .describe('A score indicating the quality of the cleansed data (0-100).'),
  improvements: z
    .string()
    .optional()
    .describe('A summary of improvements made to the data during cleansing.'),
});
export type CleanseAndStandardizeOutput = z.infer<typeof CleanseAndStandardizeOutputSchema>;

export async function cleanseAndStandardize(input: CleanseAndStandardizeInput): Promise<CleanseAndStandardizeOutput> {
  return cleanseAndStandardizeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cleanseAndStandardizePrompt',
  input: {schema: CleanseAndStandardizeInputSchema},
  output: {schema: CleanseAndStandardizeOutputSchema},
  prompt: `You are a master data management expert specializing in cleansing and standardizing data for ERP systems.

You will receive raw data, and your task is to cleanse and standardize it according to best practices and any specific rules provided.

Input Data Type: {{{dataType}}}
Raw Data: {{{rawData}}}

Specific Rules: {{#if rules}}{{{rules}}}{{else}}Use best practices for cleansing and standardization.{{/if}}

You will also assess the quality of the cleansed data and provide a data quality score (0-100).
Finally, provide a summary of the improvements made to the data during cleansing.

Ensure that the output is well-formatted and easy to understand. Follow the CleanseAndStandardizeOutputSchema description.
`,
});

const cleanseAndStandardizeFlow = ai.defineFlow(
  {
    name: 'cleanseAndStandardizeFlow',
    inputSchema: CleanseAndStandardizeInputSchema,
    outputSchema: CleanseAndStandardizeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
