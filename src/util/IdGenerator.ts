class IdGenerator {
    private nextId: number = 0;

    public constructor() {
        this.nextId = 0;
    }

    public generateId(): number {
        return this.nextId++;
    }
}
// singleton pattern
export const idGenerator = new IdGenerator();
