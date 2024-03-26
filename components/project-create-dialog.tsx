"use client"

import React from 'react';
import { DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from "@/components/ui/use-toast"
import { Button } from './ui/button';

export function ProjectCreateDialog() {
  const [open, setOpen] = React.useState(false);
  const [projectName, setProjectName] = React.useState("")
  const [projectDescription, setProjectDescription] = React.useState("")
  const [duplicateError, setDuplicateError] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const submitNewProject = async (e:any) => {
    e.preventDefault()
    console.log(projectName, projectDescription)
    setIsLoading(true)

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: projectName,
        description: projectDescription
      })
    })

    setIsLoading(false)

    if(!response?.ok){
      if (response.status === 403) {
        setDuplicateError(true)
        /* return toast({
          title: "This project already exists",
          description: "Please choose another project name",
          variant: "destructive",
        }) */
      } else {
        return toast({
          title: "Something went wrong.",
          description: "Your project was not created. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleChangeTitle = (e:any) => {
    setDuplicateError(false)
    setProjectName(e.target.value)
  }

  const handleChangeDescription = (e:any) => {
    setProjectDescription(e.target.value)
  }

  return (
    <>
        <DialogContent>
            <DialogTitle>Create a new Project</DialogTitle>
            <DialogDescription>
                <form onSubmit={submitNewProject} className='space-y-2'>
                    <Input required value={projectName} onChange={handleChangeTitle} type='text' placeholder='Project Name'/>
                    {duplicateError && <p className='text-red-500 text-sm'>Project already exists</p>}
                    <Textarea value={projectDescription} onChange={handleChangeDescription} placeholder='Enter a description for your project'/>
                    <Button className='align-end' type='submit'>Create Project</Button>
                </form>
            </DialogDescription>
        </DialogContent>
    </>
  );
};