
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"
import { ProjectCreateButton } from "@/components/project-create-button"
import { ProjectItem } from "@/components/project-item"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
 

  const projects = await db.project.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
      <DashboardShell>
        <DashboardHeader heading="Projects" text="Create and manage projects">
            <ProjectCreateButton />
        </DashboardHeader>
        <div>
          {projects?.length ? (
            <div className="divide-y divide-border rounded-md border">
              {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>No projects created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any projects yet. Start creating systems.
              </EmptyPlaceholder.Description>
                <ProjectCreateButton variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
      </DashboardShell>
  )
}
