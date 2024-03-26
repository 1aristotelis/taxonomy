export class RequiresProPlanError extends Error {
  constructor(message = "This action requires a pro plan") {
    super(message)
  }
}

export class ProjectAlreadyExists extends Error {
  constructor(message = "A project with this title already exists") {
    super(message)
  }
}
