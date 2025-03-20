import React from 'react'
import { ModeToggle } from '../ui/theme-toggle'

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0'>
        <div className='flex-1 lg:max-w-2xl'>
          <div className='shadow-base rounded-lg border bg-card text-card-foreground'>
            <div className='p-6 pt-6'>
              <form className='space-y-8'>
                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Theme</label>
                <ModeToggle />
              </form>

            </div>
          </div>
        </div>
        <div className='lg:w-1/5'>

        </div>
      </div>
    </div>
  )
}

export default SettingsPage