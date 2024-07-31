import LayoutContainer from "../layout";
import AddTodoTask from "../pages/add-task";
import EditTodoTask from "../pages/edit-task";
import TodoList from "../pages/todo-list";

export const routes = [
    {
        path: "/",
        element: <LayoutContainer />,
        children: [
            {
                path: "",
                element: <TodoList />,
            },
            {
                path: "add-task",
                element: <AddTodoTask />,
            },
            {
                path: "edit-task/:id",
                element: <EditTodoTask />,
            },
        ]
    }
]