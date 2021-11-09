import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
  title: string
  callback: (title: string) => void
}
export const EditableSpan: FC<EditableSpanPropsType> = (props) => {

  const [title, setTitle] = useState("")
  const [editMode, setEditMode] = useState(false)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    if (title.trim().length > 0) {
      props.callback(title.trim())
    }
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.charCode === 13) {
      if (title.trim().length > 0) {
        setEditMode(false)
        props.callback(title.trim())
      }
    }
  }
  return (
    editMode
      ? <input onChange={onChangeTitleHandler}
               onKeyPress={onEnterKeyPressHandler}
               onBlur={activateViewMode}
               autoFocus
               type="text"
               value={title}
      />
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}