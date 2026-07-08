export class MDX5Kernel {
  stop() {}
  getQueueSize(): number { return 0; }
}

export const mdx5 = new MDX5Kernel();
