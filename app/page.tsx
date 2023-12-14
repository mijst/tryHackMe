'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'

export default function Home() {
  const [data, setData] = useState<{ _id: string, task: string }[]>([])
  const [task, setTask] = useState<string>("")
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<{ id: string, task: string }>({ id: "", task: '' })

  const fetchData = async () => {
    const response = await fetch('http://localhost:3000/tasks',);
    const res = await response.json();
    setData(res)
  };

  const handleFormSubmit = async () => {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: task })
    };

    await fetch('http://localhost:3000/tasks', requestOptions)
    setTask('');
    fetchData();
  };

  const handleFormDelete = async (taskId: string) => {
    const requestOptions: RequestInit = {
      method: 'DELETE',
    };
    await fetch(`http://localhost:3000/tasks/${taskId}`, requestOptions)
    fetchData();
  };

  const handleEditFormSubmit = async (id: string, updatedTask: string) => {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: updatedTask })
    };
    console.log(task)
    await fetch(`http://localhost:3000/tasks/${id}`, requestOptions)
      .then((res) => console.log(res))
    setIsEditing(false);
    setTask('');
    fetchData();
  };

  const handleEditTask = (id: string, task: string) => {
    setIsEditing(true)
    setEditingTask({ id, task })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex mt-10 justify-center items-center flex-col">
      <h1 className="flex justify-center border-b-2 border-black p-4 w-2/3 md:w-1/3 ">
        <div className='flex justify-start text-xl'>
          Try
        </div>
        <div className='flex font-bold text-4xl'>
          Task
        </div>
        <div className='flex flex-col justify-end text-xl '>
          Me
        </div>
      </h1>
      <div className="table border-b-2 border-black w-2/3 md:w-1/3 p-1">
        {data.map((item: { task: string, _id: string }, index: number) => (
          <tr key={index} className='flex justify-between table-auto'>
            <td className='truncate max-w-xs md:max-w-lg'>
              {item.task}
            </td>
            <td className='flex flex-row'>
              <Image
                src="/edit.svg"
                alt="Edit Logo"
                width={24}
                height={24}
                className='mr-2 cursor-pointer'
                onClick={() => handleEditTask(item._id, item.task)}
              />
              <Image
                src="/delete.svg"
                alt="Delete Logo"
                width={24}
                height={24}
                className='cursor-pointer'
                onClick={() => handleFormDelete(item._id)}
              />
            </td>
          </tr>
        ))}
      </div>
      <div className='flex p-4 border-b-2 border-black w-2/3 md:w-1/3 flex-row '>
        {isEditing ?
          <>
            <input className='w-full mr-2' type="text" placeholder={`Editing task: ${editingTask.task}`} value={task} onChange={handleInputChange} />
            <button onClick={() => handleEditFormSubmit(editingTask.id, task)} className='flex' >Amend</button>
            <button onClick={() => setIsEditing(false)} className='flex ml-2' >Cancel</button>
          </>
          :
          <>
            <input className='w-full mr-2' type="text" placeholder='Add a task...' value={task} onChange={handleInputChange} />
            <button onClick={handleFormSubmit} className='flex' >Submit</button>
          </>
        }
      </div>
    </div >
  )
}
