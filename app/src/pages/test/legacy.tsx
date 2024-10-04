import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import { type NextPageWithLayout } from "@/pages/_app";
import { todo1, todo2, todo3, useTodosStore } from "@/stores/todos.store";
import { mapToObject } from "@/utils/object";
import { objectKeys } from "@/utils/utils";

const Page: NextPageWithLayout = () =>
{
  const { todos, toggleTodo } = useTodosStore();
  const todosObject = mapToObject(todos);
  const keys = objectKeys(todosObject);

  return (
    <UseQueryStateWrapper>
      <PageHead pageTitle="Test"/>
      <div style={{ padding: 100 }}>
        <h1>Todos</h1>
        {keys.map(key => (
          <div key={key} style={{ border: "1px solid black", marginTop: 10, padding: 10 }}>
            <h2>{key}</h2>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button type="button" onClick={() => toggleTodo(key, todo1)}>Toggle Todo 1</button>
              <button type="button" onClick={() => toggleTodo(key, todo2)}>Toggle Todo 2</button>
              <button type="button" onClick={() => toggleTodo(key, todo3)}>Toggle Todo 3</button>
            </div>
            {todosObject[key].todos.map(todo => (
              <div key={todo.id} style={{ border: "1px solid black", marginTop: 10, padding: 10 }}>
                <h2>{todo.title}</h2>
                <button type="button" onClick={() => toggleTodo(key, todo)}>Remove</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </UseQueryStateWrapper>
  );
};

Page.getLayout = Layout;

export default Page;
