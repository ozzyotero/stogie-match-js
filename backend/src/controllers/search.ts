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

    const existingSearch = await prisma.search.findFirst({
      where: {
        criteria: JSON.stringify(criteria),
        type: 'preferences',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (existingSearch) {
      return res.json({ results: JSON.parse(existingSearch.results) });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a cigar expert. Respond with an array of cigar objects in valid JSON format."
        },
        {
          role: "user",
          content: `Recommend 5 cigars based on these preferences:
            Flavor: ${criteria.flavor}
            Body: ${criteria.body}
            Origin: ${criteria.origin}
            Occasion: ${criteria.occasion}
            
            Return ONLY a JSON array of objects with these properties:
            - id (uuid string)
            - name (string)
            - description (string)
            - flavor (string)
            - body (string)
            - origin (string)
            - occasion (string)
            - price (string)
            - maker (string)
            - makerUrl (string)`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    let results;
    try {
      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No content in OpenAI response');
      }
      const parsed = JSON.parse(content);
      results = Array.isArray(parsed.cigars) ? parsed.cigars : parsed;
    } catch (parseError) {
      console.error('Parse error:', parseError);
      throw new Error('Failed to parse OpenAI response');
    }

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

    const existingSearch = await prisma.search.findFirst({
      where: {
        criteria: JSON.stringify({ name }),
        type: 'name',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (existingSearch) {
      return res.json({ results: JSON.parse(existingSearch.results) });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a cigar expert. Respond with an array of cigar objects in valid JSON format."
        },
        {
          role: "user",
          content: `Provide information about the cigar named "${name}" and suggest 4 similar cigars.
            
            Return ONLY a JSON array of objects with these properties:
            - id (uuid string)
            - name (string)
            - description (string)
            - flavor (string)
            - body (string)
            - origin (string)
            - occasion (string)
            - price (string)
            - maker (string)
            - makerUrl (string)`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    let results;
    try {
      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error('No content in OpenAI response');
      }
      const parsed = JSON.parse(content);
      results = Array.isArray(parsed.cigars) ? parsed.cigars : parsed;
    } catch (parseError) {
      console.error('Parse error:', parseError);
      throw new Error('Failed to parse OpenAI response');
    }

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