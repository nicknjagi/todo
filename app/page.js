'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/actions";
import Todo from "@/components/Todo";
import AddTodoModal from "@/components/AddTodoModal";

export default function Home() {
  const {data, isLoading, isError, isSuccess} = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })

  if(isLoading) return <h1 className="text-xl text-center mt-12">Loading...</h1>

  if (isError) {
    return <div className="text-center mt-12">Error fetching todos</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 py-24 px-6">
      <h1 className="text-xl">Todos</h1>
      {data.map((todo, index)=> {
        return <Todo key={`${todo.title} ${index}`} todo={todo}/>
      })}
      <AddTodoModal />
    </main>
  );
}
