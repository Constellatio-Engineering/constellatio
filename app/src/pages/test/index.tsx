import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import { type NextPageWithLayout } from "@/pages/_app";
import { todo1, todo2, todo3, useTodosStore } from "@/stores/todos.store";

const Page: NextPageWithLayout = () =>
{
  const { todos, toggleTodo } = useTodosStore();

  console.log("todos", todos);

  return (
    <>
      <PageHead pageTitle="Test"/>
      <div style={{ padding: 100 }}>
        <h1>Todos</h1>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button type="button" onClick={() => toggleTodo(todo1)}>Toggle Todo 1</button>
          <button type="button" onClick={() => toggleTodo(todo2)}>Toggle Todo 2</button>
          <button type="button" onClick={() => toggleTodo(todo3)}>Toggle Todo 3</button>
        </div>
        {todos.map(todo => (
          <div key={todo.id} style={{ border: "1px solid black", marginTop: 10, padding: 10 }}>
            <h2>{todo.title}</h2>
            <button type="button" onClick={() => toggleTodo(todo)}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
};

Page.getLayout = Layout;

export default Page;
