import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

export function getCSVTestData<T>(filPath: string): T[] {
  const absolutePath = path.resolve(filPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`CSV file not found: ${absolutePath}`);
  }
  const content = fs.readFileSync(absolutePath, "utf-8");
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as T[];
}
