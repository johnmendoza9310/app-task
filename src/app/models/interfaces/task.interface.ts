export interface ITask {
  taskName: string | null;
  limitDate: string | null;
  taskComplete: boolean;
  person: IPerson[];
}

interface IPerson {
  personName: string;
  age: string;
  skill: string[];
}

interface IGetMetadata {
  id: string;
  private: boolean;
  createdAt: string;
}

interface IPutMetadata {
  id: string;
  private: boolean;
  createdAt: string;
}
export interface ITaskGetResponse {
  metadata: IGetMetadata;
  record: ITask[];
}

export interface ITaskPutResponse {
  metadata: IPutMetadata;
  record: ITask[];
}
