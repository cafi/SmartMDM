'use server';
/**
 * @fileOverview Implements the duplicate detection flow using AI-powered matching algorithms.
 *
 * - detectAndMergeDuplicates - A function that identifies and merges duplicate records.
 * - DuplicateDetectionInput - The input type for the detectAndMergeDuplicates function.
 * - DuplicateDetectionOutput - The return type for the detectAndMergeDuplicates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DuplicateDetectionInputSchema = z.object({
  record1: z.string().describe('The first record to compare.'),
  record2: z.string().describe('The second record to compare.'),
  automationLevel: z
    .enum(['low', 'medium', 'high'])
    .describe(
      'The level of automation for merging duplicates. Low requires manual confirmation, medium suggests merges, and high automatically merges.'
    ),
});
export type DuplicateDetectionInput = z.infer<typeof DuplicateDetectionInputSchema>;

const DuplicateDetectionOutputSchema = z.object({
  areDuplicates: z
    .boolean()
    .describe('Whether the two records are duplicates.'),
  confidenceScore: z
    .number()
    .describe('The confidence score of the duplicate detection.'),
  suggestedAction: z
    .string()
    .describe(
      'The suggested action based on the automation level (e.g., merge, review, confirm).'
    ),
});
export type DuplicateDetectionOutput = z.infer<typeof DuplicateDetectionOutputSchema>;

export async function detectAndMergeDuplicates(
  input: DuplicateDetectionInput
): Promise<DuplicateDetectionOutput> {
  return duplicateDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'duplicateDetectionPrompt',
  input: {schema: DuplicateDetectionInputSchema},
  output: {schema: DuplicateDetectionOutputSchema},
  prompt: `You are an expert data quality analyst.

You will determine if two records are duplicates based on their content and the desired level of automation.

Record 1: {{{record1}}}
Record 2: {{{record2}}}

Automation Level: {{{automationLevel}}}

Based on the content of the records and the automation level, determine if they are duplicates. Provide a confidence score between 0 and 1.
Also, suggest an action based on the automation level:
- Low: Suggest manual review.
- Medium: Suggest merging if the confidence score is above 0.7.
- High: Automatically merge if the confidence score is above 0.9.

Output the results in JSON format.`,
});

const duplicateDetectionFlow = ai.defineFlow(
  {
    name: 'duplicateDetectionFlow',
    inputSchema: DuplicateDetectionInputSchema,
    outputSchema: DuplicateDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

