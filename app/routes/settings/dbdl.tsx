import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import JSZip from "jszip"
import fs from "fs"
import path from "path"
import invariant from "tiny-invariant"

export const loader: LoaderFunction = async () => {
  return redirect("/settings")
}

export const action: ActionFunction = async () => {
  const zip = new JSZip()

  try {
    invariant(
      typeof process.env.DATABASE_URL === "string",
      "Database must be set"
    )

    const dbPath = path.resolve(process.env.DATABASE_URL.replace("file:", ""))
    const dbData = fs.readFileSync(dbPath)
    zip.file("lblretro.db", dbData)

    const zipBlob = await zip.generateAsync({ type: "blob" })

    return new Response(zipBlob, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="lblretro.zip"',
      },
      status: 200,
    })
  } catch (err) {
    console.error(err)
    return err
  }
}
