import { z } from "zod";

class ExampleDTO {
  id = z.object({
    id: z.string(),
  });

  hello = z.object({
    text: z.string(),
  });

  create = z.object({
    name: z.string(),
  });

  update = z.object({
    id: z.string(),
    name: z.string().optional(),
  });
}

export const Example = new ExampleDTO();
