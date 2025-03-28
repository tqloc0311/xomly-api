import {
  DynamoDBClient,
  PutItemCommand,
  DeleteItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  AWS_REGION,
  DYNAMODB_REFRESH_TOKEN_TABLE_NAME,
} from "../config/env.js";

const client = new DynamoDBClient({ region: AWS_REGION });
const tableName = DYNAMODB_REFRESH_TOKEN_TABLE_NAME;

export const storeRefreshToken = async (userId, refreshToken) => {
  const params = {
    TableName: tableName,
    Item: marshall({
      userId: userId,
      token: refreshToken,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }),
  };
  try {
    await client.send(new PutItemCommand(params));
  } catch (error) {
    console.error("Error storing refresh token:", error);
    throw new Error("Error storing refresh token");
  }
};

export const getRefreshToken = async (token) => {
  const params = {
    TableName: tableName,
    IndexName: "TokenIndex",
    KeyConditionExpression: "#token = :token",
    ExpressionAttributeNames: {
      "#token": "token",
    },
    ExpressionAttributeValues: {
      ":token": { S: token },
    },
  };

  try {
    const command = new QueryCommand(params);
    const result = await client.send(command);

    if (result.Items && result.Items.length > 0) {
      return unmarshall(result.Items[0]);
    }
    return null;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    throw new Error("Error getting refresh token");
  }
};

export const deleteRefreshToken = async (token) => {
  const params = {
    TableName: tableName,
    Key: marshall({
      userId: token.userId,
    }),
  };
  try {
    await client.send(new DeleteItemCommand(params));
  } catch (error) {
    console.error("Error deleting refresh token:", error);
    throw new Error("Error deleting refresh token");
  }
};
