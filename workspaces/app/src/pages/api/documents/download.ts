/* import { db } from "@/db/connection";
import { documents } from "@/db/schema";
import { downloadDocumentSchema } from "@/schemas/documents/downloadDocument.schema";
import { getIsUserLoggedInServer } from "@/utils/auth";
import { createPdfBuffer } from "@/utils/pdf";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { and, eq } from "drizzle-orm";*/
import { type NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) =>
{
  return res.status(501).json({ error: "Not implemented" });

  /* const supabase = createPagesServerClient({ req, res });
  const getIsUserLoggedInResult = await getIsUserLoggedInServer(supabase);

  if(!getIsUserLoggedInResult.isUserLoggedIn)
  {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { user } = getIsUserLoggedInResult;
  const parsedBody = downloadDocumentSchema.safeParse(req.body);

  if(!parsedBody.success)
  {
    return res.status(400).json({ error: parsedBody.error });
  }

  const doc = await db.query.documents.findFirst({
    where: and(
      eq(documents.id, parsedBody.data.documentId),
      eq(documents.userId, user.id)
    ) 
  });

  if(!doc)
  {
    return res.status(404).json({ error: "Document not found" });
  }

  let pdfBuffer: Buffer;

  const htmlContent = (
    "<html>" +
      "<head>" +
        "<title>" + doc.name + "</title>" +
      "</head>" +
      "<body style='font-size: 14pt'>" +
        "<h1 style='text-align: center; font-size: 24pt; margin-bottom: 1cm'> " + doc.name + "</h1>" +
        doc.content +
      "</body>" +
    "</html>"
  );

  try 
  {
    pdfBuffer = await createPdfBuffer(htmlContent);
  }
  catch (error) 
  {
    console.error("Error generating PDF:", error);
    return res.status(500).json({ error: "Error generating PDF" });
  }

  res.setHeader("Content-Disposition", "attachment; filename=document.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Length", pdfBuffer.length);

  return res.status(200).end(pdfBuffer);*/
};

export default handler;
