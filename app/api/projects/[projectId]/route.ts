import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { postPatchSchema } from "@/lib/validations/post"

const routeContextSchema = z.object({
  params: z.object({
    projectId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this project.
    if (!(await verifyCurrentUserHasAccessToProject(params.projectId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the project.
    await db.project.delete({
      where: {
        id: params.projectId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this post.
    if (!(await verifyCurrentUserHasAccessToProject(params.projectId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = postPatchSchema.parse(json)

    // Update the post.
    // TODO: Implement sanitization for content.
    await db.post.update({
      where: {
        id: params.projectId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToProject(projectId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.project.count({
    where: {
      id: projectId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}
