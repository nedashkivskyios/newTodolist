import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
  title: "Add Item Form Component",
  component: AddItemForm,
}

export const AddItemFormBaseExample = () => {
  return <AddItemForm callback={action('add item form called')}/>
}