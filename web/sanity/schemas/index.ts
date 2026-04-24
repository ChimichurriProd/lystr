import type { SchemaTypeDefinition } from "sanity";

import { article } from "./article";
import { author } from "./author";
import { calculatorSettings } from "./calculator-settings";
import { campaign } from "./campaign";
import { faq } from "./faq";
import { partner } from "./partner";
import { pressRelease } from "./press-release";
import { siteSettings } from "./site-settings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  calculatorSettings,
  author,
  article,
  pressRelease,
  partner,
  faq,
  campaign,
];
