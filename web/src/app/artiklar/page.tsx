import { permanentRedirect } from "next/navigation";

// Articles now live in the unified newsroom. Detail pages stay at
// /artiklar/[slug] for permalink stability and external links.
export default function ArticlesIndexRedirect(): never {
  permanentRedirect("/nyhetsrum");
}
