import { updateTodo } from "@/api/actions";
import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  DatePicker,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const EditTodoForm = ({ todo:todoToEdit, onClose }) => {
  const [todo, setTodo] = useState({...todoToEdit});
  const queryClient = useQueryClient()

  const editTodoMutation = useMutation({
    mutationFn: (updatedTodo) => updateTodo(updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['todos']})
      onClose()
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const priorities = ["Low", "Medium", "High"];

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todoObj = Object.fromEntries(formData);
    if(!todoToEdit.complete && !todoObj.complete ){
      todo['timeTaken']= Math.floor(((new Date() -new Date(todo.createdAt))/1000)/60)
    }else{
      todo['timeTaken']= ""
    }
    if(Object.values(todoObj).includes('')){
      // console.log();
    }
    editTodoMutation.mutate(todo)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        autoFocus
        size="sm"
        type="text"
        label="Title"
        name="title"
        defaultValue={todo.title}
        onChange={handleChange}
        variant="bordered"
      />
      <Textarea
        variant="bordered"
        label="Details"
        name="details"
        onChange={handleChange}
        defaultValue={todo.details}
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
      />
      <div className="flex gap-4">
        <Input
          size="sm"
          type="date"
          label="Due date"
          name="dueDate"
          defaultValue={todo.dueDate}
          onChange={handleChange}
          variant="bordered"
        />
        <Select
          size="sm"
          variant="bordered"
          label="Priority"
          className="max-w-xs"
          name="priority"
          defaultSelectedKeys={[todo.priority]}
          onChange={handleChange}
        >
          {priorities.map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Checkbox
        size="sm"
        defaultSelected={todo.complete}
        onValueChange={(e) => setTodo({ ...todo, complete: e })}
      >
        Complete
      </Checkbox>
      <Button
        type="submit"
        disabled={editTodoMutation.isPending}
        color="primary"
        className="mb-2"
      >
        Save
      </Button>
    </form>
  );
};
export default EditTodoForm;
