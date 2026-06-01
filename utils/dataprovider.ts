import fs from 'node:fs';

export function getTestData<T>(filePath: string): T[] {
    return JSON.parse(
        fs.readFileSync(filePath, 'utf-8')
    ) as T[];
}