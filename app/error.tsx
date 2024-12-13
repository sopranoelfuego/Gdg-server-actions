
"use client"
import Link from 'next/link'
import React from 'react'

function error({}) {
  return (
    <div className='w-full min-h-screen flex items-center'>

    <div className='mx-auto flex direc items-center justify-center'>
      <p className='text-red-500'>error : </p>

    <Link href="/">Return to the home page</Link>
    </div>
    </div>
  )
}

export default error