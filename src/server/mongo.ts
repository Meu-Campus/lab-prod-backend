import { SchemaDefinition, Schema, model, Model } from "mongoose";
import { v6 } from "uuid"

export type SchemaDef = SchemaDefinition;

export class BaseModel {
  id!: string;
  active!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export function createModel<T extends BaseModel>(
  name: string,
  schemaDef: SchemaDefinition,
  collection: string
): Model<T> {
  const schema = new Schema({
    _id: {
      type: String,
      default: () => v6(),
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true
    },
    ...schemaDef
  }, {
    versionKey: false,
    timestamps: true
  });

  return model<T>(
    name,
    schema,
    collection
  );
}