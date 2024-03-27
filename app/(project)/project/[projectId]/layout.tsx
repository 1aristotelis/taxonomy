import { ModeToggle } from "@/components/mode-toggle"
import { ProjectNav } from "@/components/project-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { projectConfig } from "@/config/project"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Project, User } from "@prisma/client"
import { notFound, redirect } from "next/navigation"

async function getProjectForUser(projectId: Project["id"], userId: User["id"]) {
  return await db.project.findFirst({
    where: {
      id: projectId,
      authorId: userId,
    },
  })
}

export interface ProjectEditorPageProps {
  children?: React.ReactNode
  params: { projectId: string }
}
  
export default async function EditorLayout({ children, params }: ProjectEditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const project = await getProjectForUser(params.projectId, user.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <ProjectNav projectId={project.id} items={projectConfig.mainNav} />
          <div className="flex space-x-6 items-center">
            <div className="hidden sm:block">
              <ModeToggle/>
            </div>
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </div>
      </header>
      <main className="flex  w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
  