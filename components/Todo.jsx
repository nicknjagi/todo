import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Chip, Checkbox} from "@nextui-org/react";

export default function Todo({todo}) {
  const {title, details, priority, complete, timeTaken, dueDate, createdAt} = todo
  return (
    <Card className="max-w-[360px]">
      <CardHeader className="flex gap-3 justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Chip color="warning" size="sm" radius="sm">{priority}</Chip>
      </CardHeader>
      <CardBody className="py-0 text-sm overflow-y-visible">
        <p className="pb-3">{details}</p>
        <div className="flex gap-6">
            <Checkbox defaultSelected isSelected={complete} size="sm" color="success">Complete</Checkbox>
            <span>Time taken: <span className="text-neutral-600">{timeTaken}</span></span>
        </div>
      </CardBody>
      <CardFooter className="flex gap-3 justify-between">
        <small className="text-neutral-400">{createdAt}</small>
        <small>Due - <span className="text-teal-600">{dueDate}</span></small>
      </CardFooter>
    </Card>
  );
}
