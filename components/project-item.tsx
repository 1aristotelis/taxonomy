import Link from "next/link"
import { Project } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/post-operations"
import { ProjectOperations } from "./project-operations"

interface ProjectItemProps {
  project: Pick<Project, "id" | "name" | "description" | "createdAt" | "updatedAt">
}

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/project/${project.id}`}
          className="font-semibold hover:underline"
        >
          {project.name}
        </Link>
        <div>
          <p className="text-sm">{project.description}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(project.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <ProjectOperations project={{ id: project.id, name: project.name }} />
    </div>
  )
}

ProjectItem.Skeleton = function ProjectItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
