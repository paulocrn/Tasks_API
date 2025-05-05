export class Task {
    constructor(public id: string, public titulo: string, public descripcion: string, public categoria: string, public userId: string, public completed: boolean, public createdAt?: string) {}
}
  