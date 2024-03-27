import { notFound, redirect } from "next/navigation"
import { Post, Project, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"


export default async function ProjectEditorPage() {

  return (
    <div>Project Editor Page</div>
  )
}
