
import type { MDXComponents } from "mdx/types";
import CopyCodeButton from "@/components/copy-code-button";

export function useMDXComponents(
  components: MDXComponents,
): MDXComponents {
  return {
    ...components,
    pre: (props) => <CopyCodeButton {...props} />,
  };
}
