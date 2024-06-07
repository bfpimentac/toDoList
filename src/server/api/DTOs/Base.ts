import { z } from "zod";

class BaseDTO {
  id = z.object({
    id: z.string(),
  });
}

export default BaseDTO;
