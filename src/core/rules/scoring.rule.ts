export interface ScoreInput {
  state: Record<string, unknown>;
  context: import("@/core/models").ScoringContext;
}

export interface ScoreRule {
  name: string;
  evaluate(input: ScoreInput): number;
}

export class ThresholdRule implements ScoreRule {
  constructor(
    public name: string,
    private score: number,
    private predicate: (input: ScoreInput) => boolean,
  ) {}

  evaluate(input: ScoreInput): number {
    return this.predicate(input) ? this.score : 0;
  }
}
