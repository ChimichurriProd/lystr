import { permanentRedirect } from "next/navigation";

// Press releases now live in the unified newsroom. Detail pages stay
// at /press/[slug] for permalink stability and external links.
export default function PressIndexRedirect(): never {
  permanentRedirect("/nyhetsrum");
}
