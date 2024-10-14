import { DynamoDBClient, ReturnValue } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"

// 環境変数のバリデーション
const TABLE_NAME = process.env.DYNAMODB_TABLE;
if (!TABLE_NAME) {
  throw new Error("DYNAMODB_TABLE 環境変数が設定されていません。");
}

const client = new DynamoDBClient({})
const dynamodb = DynamoDBDocumentClient.from(client)

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const addTask = async (task: Task): Promise<Task | null> => {
  const params = {
    TableName: TABLE_NAME,
    Item: task,
  }
  const result = await dynamodb.send(new PutCommand(params));
  return result.Attributes as Task | null;
}

export const getTask = async (id: string): Promise<Task | null> => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const result = await dynamodb.send(new GetCommand(params));
  return result.Item as Task | null;
};

export const updateTask = async (task: Task): Promise<Task | null> => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id: task.id },
    UpdateExpression: "set title = :title, description = :description, completed = :completed",
    ExpressionAttributeValues: {
      ":title": task.title,
      ":description": task.description,
      ":completed": task.completed,
    },
    ReturnValues: ReturnValue.ALL_NEW,
  };
  const result = await dynamodb.send(new UpdateCommand(params));
  return result.Attributes as Task | null;
};

export const deleteTask = async (id: string): Promise<Task | null> => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };
  const result = await dynamodb.send(new DeleteCommand(params));
  return result.Attributes as Task | null;
};

export const listTasks = async (): Promise<Task[]> => {
  const params = {
    TableName: TABLE_NAME,
  };
  const result = await dynamodb.send(new ScanCommand(params));
  return result.Items as Task[];
};
