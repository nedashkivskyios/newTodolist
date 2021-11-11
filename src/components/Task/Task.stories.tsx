import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../.storybook/ReduxStoreProviderDecorator";

export default {
  title: "Task Component",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
}

export const TaskBaseExample = () => {
  return <>
    <Task todolistId={"todolistId1"} task={{id: "task1", title: "Task One", isDone: false}}/>
    <Task todolistId={"todolistId2"} task={{id: "task2", title: "Task Two", isDone: true}}/>
</>
}