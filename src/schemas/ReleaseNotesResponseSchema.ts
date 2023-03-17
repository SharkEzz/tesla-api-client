import { z } from 'zod';

const ReleaseNotesResponseSchema = z.object({
  response: z.object({
    release_notes: z.array(
      z.object({
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        customer_version: z.string(),
        image_url: z.string(),
      }),
    ),
    deployed_version: z.string(),
    staged_version: z.unknown(),
  }),
});

export default ReleaseNotesResponseSchema;
