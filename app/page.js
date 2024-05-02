'use client'
import { useQuery } from "@tanstack/react-query";
import Todo from "@/components/Todo";

const TODOS = [
  {
    title:'Build UI for onboarding flow',
    details:"Make beautiful websites regardless of your design experience. Lorem ipsum dolor sit amet.",
    priority:'Medium',
    complete:false,
    timeTaken:'1hr 15mins',
    dueDate:'02/04/2024',
    createdAt:'01/02/2024 at 3:16pm'
  },
]

export default function Home() {
  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey:["todos"],
    queryFn: () => wait(1000).then(() => [...TODOS])
  })

  if(isLoading) return <h1 className="text-xl text-center mt-12">Loading...</h1>

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 py-24 px-6">
      {data.map((todo, index)=> {
        return <Todo key={`${todo.title} ${index}`} todo={todo}/>
      })}
    </main>
  );
}

function wait(duration){
  return new Promise(resolve => setTimeout(resolve, duration))
}