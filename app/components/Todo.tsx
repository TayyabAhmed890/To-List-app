"use client"
import React, { JSXElementConstructor } from 'react'
import { useState } from 'react'

interface Task {
  title: string;
  desc: string;
}

const Todo:React.FC = () => {

//Decleare Variables

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [task, setTask] = useState<Task[]>([]);

//Submit Handler

  const submitHandler = (e: { preventDefault: () => void; }) =>{
    e.preventDefault();
    if (!title.trim() || !desc.trim()){
      return;
    }
    setTask([...task,{title:title.trim(),desc:desc.trim()}])
   setTitle("")
   setDesc("")
   console.log(task)
  }

  const deleteHandler = (i:number) =>{
    const copyTask = [...task];
    copyTask.splice(i,1)
    setTask(copyTask)

  }

  const completeHandler =(i:number) =>{
    const copyTask = [...task];
    copyTask.splice(i,1)
    setTask(copyTask)
  }

  let RenderTask: JSX.Element | JSX.Element[] = <h1>No Task Available</h1> 

  if (task.length > 0) {
    RenderTask = task.map((t,i)=>{
      return (
        <li key={i} className='w-full shadow-lg flex sm:items-center flex-wrap flex-col sm:flex-row sm:justify-between mb-5 bg-white px-4 py-4 rounded'>
      <div className='sm:flex sm:flex-col w-2/3'>
        <h5 className='text-2xl font-semibold break-words '>{t.title}</h5>
        <h6 className='text-lg sm:text-xl font-light break-words'>{t.desc}</h6>
      </div>
      <div className='flex gap-4'>
      <button onClick={()=>{
        deleteHandler(i)
      }} className='bg-green-400 px-4 py-2 rounded text-white font-bold'>Complete</button>
      <button onClick={()=>{
        completeHandler(i)
      }} className='bg-red-400 px-4 py-2 rounded text-white font-bold'>Delete</button>
      </div>

        </li>
      );
    })
  }


  return (
    <>
    <div>
        <h1 className=' bg-slate-200 p-5 font-bold text-xl'>Todo List App</h1>
      <form onSubmit={submitHandler} className='w-full h-auto text-center flex flex-col items-center justify-center p-6'>
        <input className='m-5 text-black shadow-xl border-gray-500 border-2 px-4 py-2 rounded w-60' type="text" 
        placeholder='Enter Title Here'
        value={title}
        onChange={(e)=>{
          setTitle(e.target.value)
        }} 
        />
        <input className='shadow-xl border-gray-500 border-2 m-5 text-black px-4 py-2 rounded w-60'
       type="text" 
       placeholder='Enter Description Here'
       value={desc}
       onChange={(e)=>{
        setDesc(e.target.value)
       }} 
      />
        <button className=' rounded font-bold bg-slate-200 shadow-xl px-4 py-2 text-xl mx-6 hover:bg-slate-400 hover:text-white'>Add Task</button>
      </form>
      <div className='p-5 bg-slate-200'>
      <ul>
        {RenderTask}
      </ul>
      </div>
    </div>
    </>
  )
}

export default Todo;