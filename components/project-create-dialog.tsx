"use client"

import React from 'react';
import { DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export function ProjectCreateDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
        <DialogContent>
            <DialogTitle>Create a new Project</DialogTitle>
            <DialogDescription>
                <form className='space-y-2'>
                    <Input type='text' placeholder='Project Title'/>
                    <Textarea placeholder='Enter a description for your project'/>
                    <Button className='align-end' type='submit'>Create Project</Button>
                </form>
            </DialogDescription>
        </DialogContent>
    </>
  );
};