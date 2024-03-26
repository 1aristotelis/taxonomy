import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { ProjectAlreadyExists, RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const projectCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { user } = session
    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
      where: {
        authorId: user.id,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new ProjectAlreadyExists()
    }

    const { user } = session

    //const subscriptionPlan = await getUserSubscriptionPlan(user.id)
    
    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    /* if (!subscriptionPlan?.isPro) {
      const count = await db.post.count({
        where: {
          authorId: user.id,
        },
      })

      if (count >= 3) {
        throw new RequiresProPlanError()
      }
    } */

    const json = await req.json()
    const body = projectCreateSchema.parse(json)
    
    const existingProjectId = await db.project.findFirst({
      select: {
        id: true
      },
      where: {
        authorId:user.id,
        name: body.name
      }
    })
    if(existingProjectId){
      return new Response("Project already exists", { status: 403 })
    }
    const project = await db.project.create({
      data: {
        name: body.name,
        description: body.description || "",
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(project))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof ProjectAlreadyExists) {
      return new Response("Project Already Exists", { status: 403 })
    }

    /* if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    } */

    return new Response(null, { status: 500 })
  }
}
