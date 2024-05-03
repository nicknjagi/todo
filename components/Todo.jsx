import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Chip, Button, Checkbox} from "@nextui-org/react";
import EditTodoModal from "./EditTodoModal";
import { deleteTodo } from "@/api/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate, formatTime } from "@/utils/utils";

export default function Todo({todo}) {
  const queryClient = useQueryClient()
  const deleteTodoMutation = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['todos']})
    }
  });

  const priorityMap = {
    Low: "success",
    Medium: "warning",
    High: "danger",

  }

  const {title, details, priority, complete, timeTaken, dueDate, createdAt} = todo

  return (
    <Card className="w-full max-w-[360px]">
      <CardHeader className="flex gap-3 justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Chip color={priorityMap[priority]} size="sm" radius="sm">{priority}</Chip>
      </CardHeader>
      <CardBody className="py-0 text-sm overflow-y-visible">
        <p className="pb-3">{details}</p>
        <div className="flex gap-6">
            <Checkbox defaultSelected isSelected={complete} size="sm" color="success" className="pointer-events-none">Complete</Checkbox>
            {timeTaken !== "" && <span>Time taken: <span className="text-neutral-600">{formatTime(timeTaken)}</span></span>}
        </div>
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <small className="text-neutral-400">{formatDate(createdAt)}</small>
          <small>Due: <span className="text-teal-600">{dueDate}</span></small>
        </div>
        <div className="flex justify-end w-full">
          <EditTodoModal todo={todo}/>
          <Button color="danger" size="sm" variant="light" onClick={()=> deleteTodoMutation.mutate(todo.id)}>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
