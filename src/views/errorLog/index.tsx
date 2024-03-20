import { ErrorBoundary } from "react-error-boundary";
import Test from "./test";

export default function ErrorLogView() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div>
            <div>出错了：{error.message}</div>
          </div>
        );
      }}>
      <Test></Test>
    </ErrorBoundary>
  );
}
