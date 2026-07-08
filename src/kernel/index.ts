class MDX5Kernel {
  stop() {}
  getQueueSize(): number { return 0; }
}

export { MDX5Kernel };
export const mdx5 = new MDX5Kernel();
