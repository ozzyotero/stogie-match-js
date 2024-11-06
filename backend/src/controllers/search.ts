import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { openai } from '../lib/openai';
import { SearchCriteria } from '../types';

const searchCriteriaSchema = z.object({
  flavor: z.string(),
  body: z.string(),
  origin: z.string(),
  occasion: z.string(),
});

const nameSearchSchema = z.object({
  name: z.string().min(1),
});

export async function searchByPreferences(req: Request, res: Response) {
  try {
    const criteria = searchCriteriaSchema.parse(req.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a cigar expert. Return a JSON object with a 'cigars' array containing cigar recommendations."
        },
        {
          role: "user",
          content: `Recommend 5 cigars based on these preferences:
            Flavor: ${criteria.flavor}
            Body: ${criteria.body}
            Origin: ${criteria.origin}
            Occasion: ${criteria.occasion}
            
            Return a JSON object with a 'cigars' array. Each cigar object should have:
            {
              "id": "unique-string",
              "name": "cigar name",
              "description": "detailed description",
              "flavor": "flavor profile",
              "body": "body strength",
              "origin": "country of origin",
              "occasion": "best occasion",
              "price": "price range",
              "maker": "manufacturer",
              "makerUrl": "manufacturer website"
            }`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    const parsed = JSON.parse(content);
    const results = parsed.cigars || [];

    await prisma.search.create({
      data: {
        criteria: JSON.stringify(criteria),
        results: JSON.stringify(results),
        type: 'preferences',
      },
    });

    res.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to process search' });
  }
}

export async function searchByName(req: Request, res: Response) {
  try {
    const { name } = nameSearchSchema.parse(req.body);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a cigar expert. Return a JSON object with a 'cigars' array containing the searched cigar and similar recommendations."
        },
        {
          role: "user",
          content: `Find the cigar named "${name}" and suggest 4 similar cigars.
            
            Return a JSON object with a 'cigars' array. Each cigar object should have:
            {
              "id": "unique-string",
              "name": "cigar name",
              "description": "detailed description",
              "flavor": "flavor profile",
              "body": "body strength",
              "origin": "country of origin",
              "occasion": "best occasion",
              "price": "price range",
              "maker": "manufacturer",
              "makerUrl": "manufacturer website"
            }`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    const parsed = JSON.parse(content);
    const results = parsed.cigars || [];

    await prisma.search.create({
      data: {
        criteria: JSON.stringify({ name }),
        results: JSON.stringify(results),
        type: 'name',
      },
    });

    res.json({ results });
  } catch (error) {
    console.error('Name search error:', error);
    res.status(500).json({ error: 'Failed to process name search' });
  }
}