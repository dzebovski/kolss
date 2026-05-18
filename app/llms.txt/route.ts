import { seoRoutes } from "@/lib/seo/routes";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function buildLlmsTxt() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} to oficjalna strona firmy oferującej kuchnie i zabudowy na wymiar dla Warszawy, Legionowa i okolic.`,
    "",
    "## Main pages",
    ...seoRoutes.map(
      (route) =>
        `- [${route.title}](${absoluteUrl(route.path)}): ${route.llmsNote}`,
    ),
    "",
  ];

  return lines.join("\n");
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
