type CacheEntry<T = unknown> = { value: T; expiresAt: number };

export class Cache {
  private store = new Map<string, CacheEntry>();
  private frequency = new Map<string, number>();

  get<T = unknown>(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() >= entry.expiresAt) {
      this.store.delete(key);
      this.frequency.delete(key);
      return undefined;
    }
    this.frequency.set(key, (this.frequency.get(key) || 0) + 1);
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs: number): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;
    if (Date.now() >= entry.expiresAt) {
      this.store.delete(key);
      return false;
    }
    return true;
  }

  delete(key: string): void {
    this.store.delete(key);
    this.frequency.delete(key);
  }

  clear(): void {
    this.store.clear();
    this.frequency.clear();
  }

  get size(): number {
    this.evictExpired();
    return this.store.size;
  }

  evictExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now >= entry.expiresAt) {
        this.store.delete(key);
        this.frequency.delete(key);
      }
    }
  }

  evictLRU(maxSize: number): void {
    this.evictExpired();
    if (this.store.size <= maxSize) return;
    const sorted = [...this.frequency.entries()].sort((a, b) => a[1] - b[1]);
    const toEvict = this.store.size - maxSize;
    for (let i = 0; i < toEvict && i < sorted.length; i++) {
      this.store.delete(sorted[i][0]);
      this.frequency.delete(sorted[i][0]);
    }
  }
}

let defaultInstance: Cache | null = null;

export function getCache(): Cache {
  if (!defaultInstance) defaultInstance = new Cache();
  return defaultInstance;
}
